# Newsletter Subscriber System

Zero-cost newsletter subscription system using GitHub CSV storage + Vercel Serverless Functions.

## Architecture

```
User submits form → Vercel serverless function → GitHub API → CSV in private repo
```

## Features

- ✅ Email validation (regex + length check)
- ✅ Case-insensitive deduplication
- ✅ Rate limiting (5 requests/minute per IP)
- ✅ Honeypot field for bot protection
- ✅ CORS allowlist for helva.group domains
- ✅ Source tracking per subscriber
- ✅ ISO timestamp for each subscription

## Setup Instructions

### 1. Create a Private GitHub Repository

1. Create a new **private** repository (e.g., `newsletter-data`)
2. Create `subscribers.csv` with this header:
   ```csv
   email,source,timestamp_iso
   ```
3. Commit the file to the `main` branch

### 2. Generate GitHub Personal Access Token

1. Go to [GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens](https://github.com/settings/tokens?type=beta)
2. Click "Generate new token"
3. Set:
   - **Token name**: `newsletter-api`
   - **Expiration**: Choose appropriately (or no expiration)
   - **Repository access**: Only select repositories → select your `newsletter-data` repo
   - **Permissions**:
     - Contents: **Read and write**
4. Generate & copy the token

### 3. Configure Vercel Environment Variables

In your Vercel project dashboard:

1. Go to **Settings → Environment Variables**
2. Add the following variables (for Production, Preview, and Development):

| Variable | Value | Required |
|----------|-------|----------|
| `GITHUB_TOKEN` | Your GitHub PAT | ✅ |
| `GITHUB_OWNER` | Your GitHub username or org | ✅ |
| `GITHUB_REPO` | Repository name (e.g., `newsletter-data`) | ✅ |
| `GITHUB_BRANCH` | `main` | ❌ (default: main) |
| `GITHUB_CSV_PATH` | `subscribers.csv` | ❌ (default: subscribers.csv) |

### 4. Deploy

```bash
vercel --prod
```

Or push to your connected Git repository for automatic deployment.

## API Usage

### Endpoint

```
POST /api/subscribe
```

### Request Body

```json
{
  "email": "user@example.com",
  "source": "landing-page",
  "hp": ""
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | ✅ | Subscriber email |
| `source` | string | ❌ | Subscription source (default: "helva.group") |
| `hp` | string | ❌ | Honeypot field (must be empty) |

### Response

**Success (new subscriber)**:
```json
{
  "success": true,
  "message": "Successfully subscribed to the newsletter!",
  "alreadySubscribed": false
}
```

**Success (already subscribed)**:
```json
{
  "success": true,
  "message": "You are already subscribed!",
  "alreadySubscribed": true
}
```

**Error**:
```json
{
  "success": false,
  "error": "Invalid email format"
}
```

### Example curl Request

```bash
curl -X POST https://helva.group/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "source": "curl-test"}'
```

## HTML Form Snippet

```html
<form id="newsletter-form" method="POST">
  <label for="email">Email:</label>
  <input 
    type="email" 
    id="email" 
    name="email" 
    required 
    placeholder="your@email.com"
  />
  
  <!-- Hidden source field -->
  <input type="hidden" name="source" value="website-footer" />
  
  <!-- Honeypot field - hidden from users -->
  <input 
    type="text" 
    name="hp" 
    tabindex="-1" 
    autocomplete="off"
    style="position: absolute; left: -9999px; top: -9999px;"
  />
  
  <button type="submit">Subscribe</button>
  <p id="form-message"></p>
</form>

<script>
document.getElementById('newsletter-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const messageEl = document.getElementById('form-message');
  
  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.get('email'),
        source: formData.get('source'),
        hp: formData.get('hp'),
      }),
    });
    
    const data = await response.json();
    
    if (data.success) {
      messageEl.textContent = data.message;
      messageEl.style.color = 'green';
      form.reset();
    } else {
      messageEl.textContent = data.error;
      messageEl.style.color = 'red';
    }
  } catch (error) {
    messageEl.textContent = 'An error occurred. Please try again.';
    messageEl.style.color = 'red';
  }
});
</script>
```

## CSV Data Format

```csv
email,source,timestamp_iso
user1@example.com,helva-hero,2026-01-13T10:30:00.000Z
user2@example.com,landing-page,2026-01-13T11:45:22.123Z
```

## Rate Limits

- **Per IP**: 5 requests per minute
- Rate limiting is in-memory per serverless instance (resets on cold starts)

## Security Notes

- The GitHub token should only have access to the specific newsletter repository
- CORS is configured to only allow requests from helva.group domains
- Honeypot field silently succeeds for bots (no error response)
- All emails are normalized (trimmed, lowercased) for deduplication

## Local Development

```bash
# Set environment variables
export GITHUB_TOKEN="your_token"
export GITHUB_OWNER="your_username"
export GITHUB_REPO="newsletter-data"

# Run Vercel dev server
npx vercel dev
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| 500 error on subscribe | Check environment variables are set correctly in Vercel |
| 404 on CSV file | Ensure `subscribers.csv` exists in the repo with header row |
| CORS errors | Verify request origin matches ALLOWED_ORIGINS in the code |
| Rate limited | Wait 1 minute or deploy to get a new serverless instance |
