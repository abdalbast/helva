---
description: Run the development server on localhost:3000
---

# Development Server Workflow

This workflow ensures the development server always runs on `localhost:3000` and opens the browser to that URL.

## Steps

### 1. Kill any existing processes on port 3000

Before starting the dev server, terminate any processes already using port 3000:

```bash
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
```
// turbo

### 2. Start the development server

Run the Vite dev server (configured for port 3000 with strictPort):

```bash
npm run dev
```

### 3. Open the browser

After the server starts, open the website in your default browser:

```bash
open http://localhost:3000
```
// turbo

---

## Configuration Reference

The project is configured to always use port 3000:

**`vite.config.ts`:**
- `port: 3000` - Forces the dev server to use port 3000
- `strictPort: true` - Fails if port 3000 is occupied (instead of auto-incrementing)

---

## Quick One-Liner

To do everything in one command:

```bash
lsof -ti:3000 | xargs kill -9 2>/dev/null; npm run dev & sleep 3 && open http://localhost:3000
```

---

## Troubleshooting

If the server fails to start on port 3000:
1. Ensure no other services are using the port: `lsof -i:3000`
2. Kill the conflicting process: `kill -9 <PID>`
3. Retry starting the dev server
