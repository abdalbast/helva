import type { VercelRequest, VercelResponse } from '@vercel/node';

// ============================================================================
// Configuration from environment variables
// ============================================================================
const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const GITHUB_OWNER = process.env.GITHUB_OWNER!;
const GITHUB_REPO = process.env.GITHUB_REPO!;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';
const GITHUB_CSV_PATH = process.env.GITHUB_CSV_PATH || 'subscribers.csv';

// CORS allowlist
const ALLOWED_ORIGINS = [
    'https://helva.io',
    'https://www.helva.io',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5173',
];

// Rate limiting (in-memory per instance)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // max requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window

// ============================================================================
// Helper Functions
// ============================================================================

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    if (record.count >= RATE_LIMIT_MAX) {
        return true;
    }

    record.count++;
    return false;
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
}

function normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
}

function escapeCsvField(field: string): string {
    // Prevent CSV formula injection by prefixing dangerous first characters
    if (/^[=+\-@]/.test(field)) field = "'" + field;
    if (field.includes(',') || field.includes('"') || field.includes('\n')) {
        return `"${field.replace(/"/g, '""')}"`;
    }
    return field;
}

function parseCsv(content: string): string[] {
    const lines = content.split('\n');
    const emails: string[] = [];

    // Skip header row
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Extract email (first column)
        const match = line.match(/^"?([^",\n]+)"?/);
        if (match) {
            emails.push(normalizeEmail(match[1]));
        }
    }

    return emails;
}

async function getFileFromGitHub(): Promise<{ content: string; sha: string } | null> {
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_CSV_PATH}?ref=${GITHUB_BRANCH}`;

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
            'X-GitHub-Api-Version': '2022-11-28',
        },
    });

    if (response.status === 404) {
        return null; // File doesn't exist yet
    }

    if (!response.ok) {
        throw new Error('GitHub API request failed');
    }

    const data = await response.json();
    const content = Buffer.from(data.content, 'base64').toString('utf-8');

    return { content, sha: data.sha };
}

async function updateFileOnGitHub(newContent: string, sha?: string): Promise<void> {
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_CSV_PATH}`;

    const body: Record<string, string> = {
        message: `Add subscriber - ${new Date().toISOString()}`,
        content: Buffer.from(newContent).toString('base64'),
        branch: GITHUB_BRANCH,
    };

    if (sha) {
        body.sha = sha;
    }

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
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

    // Set CORS headers for all responses
    setCorsHeaders(res, origin);

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: 'Method not allowed'
        });
    }

    // CSRF: Reject requests without a valid origin
    if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
        return res.status(403).json({ success: false, error: 'Forbidden' });
    }

    // Check required env vars
    if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
        console.error('Missing required environment variables');
        return res.status(500).json({
            success: false,
            error: 'Server configuration error'
        });
    }

    // Rate limiting
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim()
        || req.socket?.remoteAddress
        || 'unknown';

    if (isRateLimited(clientIp)) {
        return res.status(429).json({
            success: false,
            error: 'Too many requests. Please try again later.'
        });
    }

    // Parse body
    const { email, source, hp } = req.body || {};

    // Honeypot check - if filled, silently succeed (likely bot)
    if (hp) {
        console.log(`Honeypot triggered from IP: ${clientIp}`);
        return res.status(200).json({
            success: true,
            message: 'Successfully subscribed!'
        });
    }

    // Validate email
    if (!email || typeof email !== 'string') {
        return res.status(400).json({
            success: false,
            error: 'Email is required'
        });
    }

    const normalizedEmail = normalizeEmail(email);

    if (!isValidEmail(normalizedEmail)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid email format'
        });
    }

    // Determine source
    const subscriberSource = (typeof source === 'string' && source.trim())
        ? source.trim().slice(0, 100)
        : 'helva.io';

    try {
        // Get current CSV from GitHub
        const file = await getFileFromGitHub();

        let csvContent: string;
        let sha: string | undefined;
        let existingEmails: string[] = [];

        if (file) {
            csvContent = file.content;
            sha = file.sha;
            existingEmails = parseCsv(csvContent);
        } else {
            // Create new file with header
            csvContent = 'email,source,timestamp_iso\n';
        }

        // Check for duplicate (case-insensitive)
        if (existingEmails.includes(normalizedEmail)) {
            return res.status(200).json({
                success: true,
                message: 'You are already subscribed!',
                alreadySubscribed: true
            });
        }

        // Append new subscriber
        const timestamp = new Date().toISOString();
        const newRow = `${escapeCsvField(normalizedEmail)},${escapeCsvField(subscriberSource)},${timestamp}\n`;
        const updatedContent = csvContent.endsWith('\n')
            ? csvContent + newRow
            : csvContent + '\n' + newRow;

        // Update file on GitHub
        await updateFileOnGitHub(updatedContent, sha);

        console.log(`New subscriber: ${normalizedEmail} from ${subscriberSource} at ${timestamp}`);

        return res.status(200).json({
            success: true,
            message: 'Successfully subscribed to the newsletter!',
            alreadySubscribed: false
        });

    } catch (error) {
        console.error('Subscription error:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to process subscription. Please try again.'
        });
    }
}
