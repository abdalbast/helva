# API Routes & Form Handling

## Architecture
No database. Both API routes are Vercel serverless functions that store data by appending rows to CSV files in a private GitHub repository via the GitHub API.

## Environment Variables Required (Vercel)
- `GITHUB_TOKEN` — GitHub personal access token
- `GITHUB_OWNER` — GitHub repository owner
- `GITHUB_REPO` — GitHub repository name
- `GITHUB_BRANCH` — Branch name (default: `main`)
- `GITHUB_CSV_PATH` — Path for newsletter subscribers CSV (default: `subscribers.csv`)
- `GITHUB_CONTACTS_PATH` — Path for contact form CSV (default: `contacts.csv`)

## Newsletter Subscription (`api/subscribe.ts`)
- **Endpoint**: POST `/api/subscribe`
- **Body**: `{ email, source, hp }`
- **Features**: Email normalisation, duplicate detection, honeypot spam filter, rate limiting (5/min per IP), CORS origin check, CSRF protection
- **CSV columns**: `email, source, timestamp_iso`
- **Used by**: HeroSection.tsx (hero newsletter form), NewsletterSection.tsx

## Contact Form (`api/contact.ts`)
- **Endpoint**: POST `/api/contact`
- **Body**: `{ name, email, company, message, hp }`
- **Features**: Input validation, honeypot spam filter, rate limiting (3/min per IP), CORS origin check, CSRF protection
- **CSV columns**: `name, email, company, message, timestamp_iso`
- **Used by**: Contact.tsx, AboutAbdalbast.tsx

## Allowed Origins
Both endpoints only accept requests from:
- `https://helva.group`
- `https://www.helva.group`
- `http://localhost:3000`, `:3001`, `:5173`

## Security Measures
- Honeypot field (`hp`) — if filled, silently succeeds (bot trap)
- In-memory rate limiting per IP per serverless instance
- Origin header validation (CSRF protection)
- Input length limits and sanitisation
- CSV field escaping for special characters

## Client-Side Form Patterns
- Zod schema validation before submission
- States: `idle` → `loading/sending` → `success/sent` or `error`
- Honeypot field rendered as invisible off-screen input with `aria-hidden`
- DOMPurify available for HTML sanitisation (installed but usage varies)
