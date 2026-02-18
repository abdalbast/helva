

# Improvement & Feature Plan

This plan batches the audit findings and new features into 4 implementation rounds, grouping similar work to minimize token usage.

---

## Round 1: Navigation, Footer & Sitemap Fixes

**What changes:**
- Add "Contact" link to both desktop and mobile navigation in `Navigation.tsx`
- Add "Contact" link to the footer link list in `Footer.tsx`
- Update social links in Footer from placeholder URLs (`https://linkedin.com`, etc.) to real Helva URLs (or `#` with a TODO comment if real URLs aren't available yet)
- Add a "skip to content" accessibility link at the top of each page layout
- Regenerate `public/sitemap.xml` with all language-prefixed routes (`/en/projects`, `/sv/projects`, `/ar/projects`, `/ku/projects`, etc.) and add `hreflang` annotations

**Files touched:** `Navigation.tsx`, `Footer.tsx`, `public/sitemap.xml`, all page files (add `id="main-content"` to the main element)

---

## Round 2: Legal Pages & Cookie Consent

**What changes:**
- Create `/privacy` and `/terms` pages with placeholder legal content, matching the site's aesthetic (Navigation, GrainOverlay, Footer)
- Add routes for `/:lang/privacy` and `/:lang/terms` in `App.tsx`
- Add Privacy and Terms links to the Footer
- Build a GDPR cookie consent banner component that:
  - Shows on first visit (checks localStorage)
  - Gates PostHog initialization behind consent (modify `analytics.ts` to only init after acceptance)
  - Styled to match the site's minimal mono aesthetic
- Add translation keys for all new strings in all 4 locale files

**Files touched:** New `Privacy.tsx`, `Terms.tsx`, `CookieConsent.tsx`; modified `App.tsx`, `Footer.tsx`, `analytics.ts`, all locale JSON files

---

## Round 3: Localize Project Data & Contact Form Backend

**What changes:**
- Move all hardcoded project strings (title, description, problem, solution, outcome, testimonials, metrics labels) from `src/data/projects.ts` into the 4 translation JSON files under a `projects.items` namespace
- Update `projects.ts` to use translation keys instead of raw English strings, and update `Projects.tsx` / `ProjectDetail.tsx` to resolve them via `t()`
- Replace the `mailto:` fallback in `Contact.tsx` with a proper form submission using an existing Vercel serverless function pattern (similar to `api/subscribe.ts`) -- create `api/contact.ts` that sends an email via Resend or stores the submission

**Files touched:** `src/data/projects.ts`, `Projects.tsx`, `ProjectDetail.tsx`, all locale JSON files, new `api/contact.ts`, `Contact.tsx`

---

## Round 4: Page Transitions & UX Polish

**What changes:**
- Add `framer-motion` and create an `AnimatedPage` wrapper component with fade/slide-up transitions
- Wrap each page's content in `AnimatedPage` using `AnimatePresence` in `App.tsx`
- Improve dark mode contrast ratios for muted text elements (audit `text-muted-foreground/60` and similar low-opacity classes)
- Add focus-visible ring styles to all interactive elements (buttons, links, form inputs) for keyboard navigation

**Files touched:** New `AnimatedPage.tsx`; modified `App.tsx`, `index.css` (focus-visible utilities), all page components (wrap in AnimatedPage)

---

## Technical Notes

- **Token efficiency:** Each round groups related file edits together so locale files and shared components are only touched once per round
- **No backend required:** All changes are frontend-only except the optional `api/contact.ts` Vercel serverless function
- **Dependencies added:** `framer-motion` (Round 4 only)
- **Translation approach:** Project data keys follow the pattern `projects.items.{slug}.title` etc., keeping the data file as a structural skeleton with `t()` lookups

