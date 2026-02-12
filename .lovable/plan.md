

# Helva Group -- Production PRD & Roadmap

## Current State Summary

The site is a React + Vite + Tailwind frontend deployed on Vercel with:
- 6 pages: Home, Projects, Solutions, AI, Resources, About (+ 404)
- Newsletter API (Vercel serverless function storing to GitHub CSV)
- Light/dark theme toggle
- Responsive mobile navigation
- Gamla Stan building facade as visual centerpiece
- SEO basics (meta tags, JSON-LD, sitemap with only 2 URLs)

**What's missing:** No database, no CMS, no analytics, no contact forms, no blog engine, no proper SEO for new pages, no page transitions, placeholder content on several pages, no real social links, and the 404 page is unstyled.

---

## Phase 1 -- Polish & Complete (Frontend)

**Goal:** Make every existing page production-ready.

| Task | Details |
|------|---------|
| Fix copyright year | Footer says 2024, should say 2026 |
| Update social links | Replace placeholder `https://linkedin.com` etc. with real Helva social URLs |
| Style the 404 page | Match site aesthetic with Navigation, GrainOverlay, and Footer |
| Add page transition animations | Fade/slide between routes using CSS transitions or `framer-motion` |
| Scroll-to-top on navigation | Add `useEffect` to scroll to top on route change |
| Accessibility audit | Add proper `aria-labels`, focus states, skip-to-content link, semantic landmarks |
| Responsive QA | Test and fix layout issues on mobile for all 6 pages |
| Loading states | Add skeleton/loading UI for the newsletter form and any future async content |
| Vite port fix | Change server port from 3000 to 8080 in `vite.config.ts` |

---

## Phase 2 -- SEO & Performance

**Goal:** Make the site discoverable and fast.

| Task | Details |
|------|---------|
| Expand sitemap | Add `/projects`, `/solutions`, `/ai`, `/resources` to `sitemap.xml` |
| Per-page meta tags | Add unique `<title>` and `<meta description>` for each route using `react-helmet-async` |
| Canonical URLs | Add `<link rel="canonical">` per page |
| Open Graph per page | Unique OG title/description/image per route |
| Pre-render / SSG consideration | Evaluate `vite-plugin-ssr` or `react-snap` for static pre-rendering for SEO crawlers |
| Image optimization | Add WebP versions of images, lazy loading, proper `alt` text |
| Performance budget | Lighthouse audit targeting 90+ on all scores |
| `robots.txt` update | Already good, but verify all new routes are crawlable |
| JSON-LD per page | Add `ProfessionalService`, `Article` (Resources), `Product` (Projects) structured data |

---

## Phase 3 -- Contact & Lead Generation

**Goal:** Enable real business conversations and capture leads.

| Task | Details |
|------|---------|
| Contact page | New `/contact` route with form (name, email, company, message, budget range) |
| Contact form backend | Vercel serverless function or Lovable Cloud edge function to send emails (e.g., via Resend API) and store submissions |
| CTA improvements | Add "Book a call" or "Get in touch" CTAs to Solutions and Projects pages, linking to Calendly or the contact form |
| Newsletter improvements | Add double opt-in confirmation via email |
| Cookie consent banner | GDPR-compliant cookie notice (if adding analytics) |

---

## Phase 4 -- Backend & Database

**Goal:** Move from static content to a manageable, dynamic system.

| Task | Details |
|------|---------|
| Enable Lovable Cloud | Set up Supabase-backed database |
| Content tables | `projects`, `articles`, `resources`, `case_studies` tables |
| Admin dashboard | Protected `/admin` route for managing content (CRUD for projects, articles) |
| Authentication | Supabase Auth for admin access |
| Newsletter migration | Move subscriber storage from GitHub CSV to Supabase `subscribers` table |
| File storage | Supabase Storage for project images, resource downloads (PDFs, templates) |
| RLS policies | Row-level security so only authenticated admins can write |

---

## Phase 5 -- Blog / Resources Engine

**Goal:** Turn Resources into a real content engine for SEO and thought leadership.

| Task | Details |
|------|---------|
| Blog listing page | Paginated article list at `/resources` with category filters |
| Article detail pages | `/resources/:slug` with full article rendering (Markdown or rich text) |
| Resource downloads | Gated or open download links for templates and guides |
| RSS feed | Auto-generated RSS at `/feed.xml` |
| Reading time calculation | Dynamic based on article word count |
| Related articles | Show 2-3 related posts at the bottom of each article |
| Social sharing | Share buttons for LinkedIn, X, and copy-link |

---

## Phase 6 -- Case Studies & Portfolio

**Goal:** Showcase real work with depth.

| Task | Details |
|------|---------|
| Case study template | `/projects/:slug` with hero image, problem/solution/outcome sections, metrics, and testimonials |
| Project filtering | Filter by status (Active, In Development, Coming Soon) and category |
| Image galleries | Lightbox or carousel for project screenshots |
| Client logos section | "Trusted by" strip on the home page or Solutions page |
| Testimonials component | Rotating or grid display of client quotes |

---

## Phase 7 -- Analytics & Monitoring

**Goal:** Understand user behavior and site health.

| Task | Details |
|------|---------|
| Analytics integration | Plausible, Fathom, or PostHog (privacy-friendly, no cookie banner needed) |
| Event tracking | Track CTA clicks, newsletter signups, contact form submissions, page views |
| Error monitoring | Sentry integration for runtime error tracking |
| Uptime monitoring | External service (e.g., BetterStack) for uptime alerts |
| Performance monitoring | Web Vitals tracking (LCP, CLS, FID) |

---

## Phase 8 -- Internationalization & Expansion

**Goal:** Support Helva's multi-hub, global presence.

| Task | Details |
|------|---------|
| Hub pages | `/hubs/edinburgh`, `/hubs/stockholm`, etc. with local team info, office details, and local case studies |
| Language support | `i18next` integration for English, Swedish, Kurdish (Sorani), and Arabic |
| RTL support | Right-to-left layout support for Kurdish and Arabic content |
| Currency/locale | Locale-aware date and number formatting |
| Localized SEO | `hreflang` tags and per-language meta descriptions |

---

## Phase 9 -- Advanced Features

**Goal:** Differentiate and delight.

| Task | Details |
|------|---------|
| AI chatbot | Embedded chat assistant using Lovable AI for site visitors to ask about services |
| Dark mode refinements | Per-page color adjustments, improved contrast ratios |
| Micro-interactions | Scroll-triggered animations, parallax on the building facade, hover effects on cards |
| Careers page | `/careers` with open positions pulled from database |
| Legal pages | `/privacy`, `/terms` -- essential for GDPR compliance |
| Accessibility statement | `/accessibility` page |

---

## Suggested Priority Order

```text
Phase 1  -->  Phase 2  -->  Phase 3
   |              |             |
   v              v             v
 Polish         SEO        Leads & CTA
                               |
                               v
                          Phase 4 (Backend)
                               |
                    +----------+----------+
                    v                     v
              Phase 5 (Blog)     Phase 6 (Portfolio)
                    |                     |
                    +----------+----------+
                               |
                               v
                       Phase 7 (Analytics)
                               |
                               v
                       Phase 8 (i18n)
                               |
                               v
                       Phase 9 (Advanced)
```

Phases 1-3 can be done entirely within Lovable without a backend. Phase 4 introduces the database layer that unlocks Phases 5-6. Phases 7-9 are growth and expansion features.

---

## Technical Notes

- **Framework:** React 18 + Vite + Tailwind CSS + TypeScript (no migration needed)
- **Hosting:** Vercel (current) -- supports serverless functions for contact forms, API routes
- **Backend (future):** Lovable Cloud (Supabase) for database, auth, storage, and edge functions
- **SEO library:** `react-helmet-async` for per-page meta tags
- **Animation:** CSS transitions preferred; `framer-motion` for complex page transitions
- **i18n:** `react-i18next` when internationalization begins
- **Analytics:** Privacy-friendly (Plausible or PostHog) to avoid cookie consent complexity

