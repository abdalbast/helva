

# Build Three SEO Pages for Abdalbast Khdhir

Three standalone pages outside the language-prefixed routing structure, each with distinct layout, copy, and SEO markup.

---

## Architecture Decision

These pages sit at root-level routes (`/about-abdalbast-khdhir`, `/abdalbast-khdhir-portfolio`, `/abdalbast-khdhir-projects`) rather than under `/:lang/`. They are English-only SEO landing pages and do not use the i18n system or the existing Navigation/Footer/GrainOverlay components. Each page has its own minimal footer as specified.

Routes will be added to `App.tsx` above the `/:lang` block.

---

## Files to Create

### 1. `src/pages/AboutAbdalbast.tsx`
- Route: `/about-abdalbast-khdhir`
- Max width 760px, white background, single column
- Sections: Hero (H1, two paragraphs, 3 buttons), Proof of Work (5 project cards with soft borders), Background (4 bullets), How I Work (5 bullets), Collaboration (3 bullets), Contact (email + form posting to `/api/contact`)
- Internal links to Portfolio and Projects pages
- Helmet: unique title, meta description, canonical, OG tags, Person JSON-LD, breadcrumb JSON-LD

### 2. `src/pages/PortfolioAbdalbast.tsx`
- Route: `/abdalbast-khdhir-portfolio`
- Max width 900px, white background
- Sections: Hero (H1, paragraph), 5 case study cards (Problem/Approach/Outcome/Stack/Status grid on desktop), What You Can Expect (paragraph + 6 bullets), Links (4 buttons), Contact (email + form)
- Internal links to About and Projects pages
- Helmet: unique title, meta description, canonical, OG tags, WebPage JSON-LD, breadcrumb JSON-LD

### 3. `src/pages/ProjectsAbdalbast.tsx`
- Route: `/abdalbast-khdhir-projects`
- Max width 1000px, white background
- Sections: Hero (H1, intro), search input, filter pills (category + status), 8 project cards in 2-col grid on desktop, footer with links
- Client-side filtering by title/summary text and by category/status pills
- Internal links to About and Portfolio pages
- Helmet: unique title, meta description, canonical, OG tags, CollectionPage JSON-LD, breadcrumb JSON-LD

---

## File to Modify

### `src/App.tsx`
- Import the three new page components
- Add three `<Route>` entries before the `/:lang` block:
  - `path="about-abdalbast-khdhir"` renders `AboutAbdalbast`
  - `path="abdalbast-khdhir-portfolio"` renders `PortfolioAbdalbast`
  - `path="abdalbast-khdhir-projects"` renders `ProjectsAbdalbast`

---

## Shared Patterns Across All Three Pages

- **Footer**: Simple `<footer>` with copyright line and links to Home (`/en`) and Privacy (`/en/privacy`), plus internal cluster links
- **Form**: Reuse the existing `/api/contact` endpoint; each form has Name, Email, Message fields with Zod validation
- **Styling**: Tailwind utility classes; white bg (`bg-white`), system font stack via a `font-sans` override on the page wrapper, soft bordered cards (`border border-gray-200 rounded-lg`), generous padding/margin
- **SEO**: `react-helmet-async` for meta tags; JSON-LD injected via `<script>` tags in Helmet
- **No animations**: Pages will not use the `AnimatedPage` wrapper
- **No i18n**: Hardcoded British English copy as specified

---

## Technical Details

- No new dependencies required
- No database changes
- Contact form posts to existing `/api/contact` serverless function
- All copy is taken verbatim from the specification above
- Project card links use `"#"` as placeholder hrefs where specified

