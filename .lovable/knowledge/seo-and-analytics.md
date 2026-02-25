# SEO, Analytics & LLM Readability

## SEO Implementation

### Meta Tags
- `PageMeta` component on every i18n page (title, description, canonical, OG, Twitter, hreflang)
- SEO landing pages (Abdalbast cluster) have custom Helmet blocks with unique metadata
- Homepage has Organization JSON-LD schema

### Structured Data (JSON-LD)
- **Homepage**: Organization schema (name, url, description, founder, address, contactPoint)
- **AboutAbdalbast**: Person schema + BreadcrumbList schema
- Other SEO pages have WebPage and CollectionPage schemas

### Sitemap
- `public/sitemap.xml` — manual XML sitemap
- Includes all main pages with hreflang alternates
- Includes Abdalbast SEO pages
- Includes `/llm.txt`

### robots.txt
- Allows all user agents including GPTBot, ClaudeBot, PerplexityBot
- References `llm.txt` in comments

## LLM Readability Optimisation

### `/llm.txt` (public/llm.txt)
Plain text file with structured sections: SITE, DOMAIN, PURPOSE, AUDIENCE, PRODUCTS, SERVICES, USE_CASES, CASE_STUDIES, FOUNDER, CONTACT, CANONICAL_PAGES, LAST_UPDATED, VERSION.

### LlmSummary Component (`src/components/LlmSummary.tsx`)
Visually hidden (`sr-only`) semantic HTML block placed on key pages. Contains:
- Quick Answer (one-sentence page summary)
- Who This Is For (audience list)
- What You Can Do Here (actions list)
- Related Pages (links with descriptive anchor text)
- Last updated date

Present on: Index, About, Projects, Solutions, AI, Contact pages.

## Analytics

### PostHog
- **Library**: posthog-js
- **Initialisation**: Consent-gated via CookieConsent component
- **Config**: `VITE_POSTHOG_KEY` and `VITE_POSTHOG_HOST` env vars
- **Features**: Page view tracking (manual, not auto), custom events, page leave capture
- **Persistence**: localStorage
- **Page tracking**: `usePageTracking()` hook fires on every route change

### Web Vitals
- `src/lib/web-vitals.ts` reports CLS, INP, LCP, FCP, TTFB to PostHog as custom events
- Metric name, value, rating, delta, and ID tracked per vital

### Cookie Consent
- `CookieConsent` component with accept/decline
- Consent stored in localStorage (`helva_cookie_consent`)
- Analytics only initialised after explicit consent
- Links to privacy policy
