# Project Overview: helva.group

## What It Is
helva.group is the parent brand website for Helva Group — an umbrella brand for products, services, and case studies that help founders and teams build and ship modern digital products with AI.

## Domain & Hosting
- **Domain**: helva.group
- **Hosting**: Vercel (configured via `vercel.json`)
- **Published URL**: https://helva.lovable.app (Lovable), https://helva.group (production)
- **Framework**: React + Vite + TypeScript + Tailwind CSS
- **No backend database** — static data with serverless API routes on Vercel

## Core Stack
- React 18 with react-router-dom v6 (SPA with client-side routing)
- Vite with SWC plugin for fast builds
- Tailwind CSS with shadcn/ui component library
- Framer Motion for page transitions and animations
- i18next for internationalisation (4 languages: en, sv, ku, ar)
- react-helmet-async for SEO meta tags
- PostHog for analytics (consent-gated via cookie banner)
- web-vitals for performance monitoring
- Zod for form validation

## Site Architecture
Root `/` redirects to `/en`. All content pages are under `/:lang/` prefix.

### Language-Prefixed Pages
| Route | Component | Purpose |
|---|---|---|
| `/:lang` | Index.tsx | Homepage with hero, building facade, newsletter |
| `/:lang/about` | About.tsx | Brand story and positioning |
| `/:lang/projects` | Projects.tsx | Product directory (Forma, Pulse, Lingua, Nexus) |
| `/:lang/projects/:slug` | ProjectDetail.tsx | Individual product case study |
| `/:lang/solutions` | Solutions.tsx | Services for startups, enterprises, agencies |
| `/:lang/ai` | AI.tsx | AI capabilities and philosophy |
| `/:lang/resources` | Resources.tsx | Articles and templates |
| `/:lang/resources/:slug` | ArticleDetail.tsx | Individual article |
| `/:lang/contact` | Contact.tsx | Contact form |
| `/:lang/privacy` | Privacy.tsx | Privacy policy |
| `/:lang/terms` | Terms.tsx | Terms of service |

### SEO Landing Pages (no language prefix)
| Route | Component | Purpose |
|---|---|---|
| `/about-abdalbast-khdhir` | AboutAbdalbast.tsx | Founder identity page |
| `/abdalbast-khdhir-portfolio` | PortfolioAbdalbast.tsx | Founder portfolio |
| `/abdalbast-khdhir-projects` | ProjectsAbdalbast.tsx | Founder project directory |

These SEO pages use a distinct "minimal Nordic" aesthetic (white bg, system fonts, no animations) separate from the main site design.

## Products (from `src/data/projects.ts`)
1. **Forma** — Design system (Active)
2. **Pulse** — Adaptive fitness tracking (In Development)
3. **Lingua** — Contextual language learning (Coming Soon)
4. **Nexus** — Digital operations infrastructure (Planning)

## Content Data
- **Articles**: 5 articles in `src/data/articles.ts` (Design Systems, Product Strategy, Engineering, Design, Culture)
- **Resources**: 3 resources in `src/data/resources.ts` (Template, Guide, Checklist)
- **Projects**: 4 products in `src/data/projects.ts`

## Serverless API Routes (Vercel)
- `api/subscribe.ts` — Newsletter subscription (stores to GitHub CSV)
- `api/contact.ts` — Contact form submission (stores to GitHub CSV)
Both use GitHub API to append rows to CSV files, with rate limiting, honeypot spam protection, CORS allowlisting, and CSRF origin checks.

## Key Decisions
- **No Supabase/Cloud backend** — deliberately static with serverless API handlers
- **Phase 4 (Supabase backend) deferred** in favour of current architecture
- **British English** throughout all content
- **RTL support** for Kurdish (ku) and Arabic (ar) languages
