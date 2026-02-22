import type { VercelRequest, VercelResponse } from '@vercel/node';

// ============================================================================
// Configuration
// ============================================================================
const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const GITHUB_OWNER = process.env.GITHUB_OWNER!;
const GITHUB_REPO = process.env.GITHUB_REPO!;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';
const GITHUB_CONTACTS_PATH = process.env.GITHUB_CONTACTS_PATH || 'contacts.csv';

const ALLOWED_ORIGINS = [
  'https://helva.group',
  'https://www.helva.group',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
];

// Rate limiting (in-memory per instance)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

// ============================================================================
// Helpers
// ============================================================================

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (record.count >= RATE_LIMIT_MAX) return true;
  record.count++;
  return false;
}

function escapeCsvField(field: string): string {
  if (field.includes(',') || field.includes('"') || field.includes('\n')) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

async function getFileFromGitHub(): Promise<{ content: string; sha: string } | null> {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_CONTACTS_PATH}?ref=${GITHUB_BRANCH}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('GitHub API request failed');
  const data = await response.json();
  return { content: Buffer.from(data.content, 'base64').toString('utf-8'), sha: data.sha };
}

async function updateFileOnGitHub(newContent: string, sha?: string): Promise<void> {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_CONTACTS_PATH}`;
  const body: Record<string, string> = {
    message: `New contact submission - ${new Date().toISOString()}`,
    content: Buffer.from(newContent).toString('base64'),
    branch: GITHUB_BRANCH,
  };
  if (sha) body.sha = sha;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error('GitHub API request failed');
  }
}

function setCorsHeaders(res: VercelResponse, origin: string | undefined): void {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
}

// ============================================================================
// Main Handler
// ============================================================================

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin as string | undefined;
  setCorsHeaders(res, origin);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

  // CSRF: Reject requests without a valid origin
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return res.status(403).json({ success: false, error: 'Forbidden' });
  }

  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    console.error('Missing required environment variables');
    return res.status(500).json({ success: false, error: 'Server configuration error' });
  }

  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ success: false, error: 'Too many requests. Please try again later.' });
  }

  const { name, email, company, message, hp } = req.body || {};

  // Honeypot
  if (hp) {
    console.log(`Contact honeypot triggered from IP: ${clientIp}`);
    return res.status(200).json({ success: true, message: 'Message sent!' });
  }

  // Validate
  if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
    return res.status(400).json({ success: false, error: 'Valid name is required' });
  }
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || email.length > 255) {
    return res.status(400).json({ success: false, error: 'Valid email is required' });
  }
  if (!message || typeof message !== 'string' || message.trim().length === 0 || message.length > 2000) {
    return res.status(400).json({ success: false, error: 'Valid message is required' });
  }
  const safeCompany = typeof company === 'string' ? company.trim().slice(0, 100) : '';

  try {
    const file = await getFileFromGitHub();
    let csvContent: string;
    let sha: string | undefined;

    if (file) {
      csvContent = file.content;
      sha = file.sha;
    } else {
      csvContent = 'name,email,company,message,timestamp_iso\n';
    }

    const timestamp = new Date().toISOString();
    const newRow = `${escapeCsvField(name.trim())},${escapeCsvField(email.trim())},${escapeCsvField(safeCompany)},${escapeCsvField(message.trim())},${timestamp}\n`;
    const updatedContent = csvContent.endsWith('\n') ? csvContent + newRow : csvContent + '\n' + newRow;

    await updateFileOnGitHub(updatedContent, sha);
    console.log(`New contact: ${email.trim()} at ${timestamp}`);

    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ success: false, error: 'Failed to send message. Please try again.' });
  }
}
