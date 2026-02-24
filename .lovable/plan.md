

# LLM Optimisation for helva.group

Optimise helva.group for LLM agents by creating a `/llm.txt` file, adding an `LlmSummary` component for key pages, improving page headings and structure for intent-based retrieval, and adding Organisation JSON-LD to the homepage.

---

## A. Proposed Site Architecture

The existing pages and their recommended optimisations:

| Route | Purpose | Primary audience | Primary intent | Suggested H1 | Key sections |
|---|---|---|---|---|---|
| `/en` (Home) | Introduce Helva Group and its ecosystem | Founders, teams, agents | What is Helva Group? | Built to be Whole | Quick answer block, product family, newsletter |
| `/en/about` | Brand story and positioning | Anyone researching Helva | Who is behind Helva? | About Helva Group | Challenge, name origin, what we build, obsessions |
| `/en/projects` | Product directory | Founders, investors, agents | What products does Helva make? | Helva Products | Forma, Pulse, Lingua, Nexus with filters |
| `/en/solutions` | Services and engagement models | Buyers, founders | How can Helva help me? | Solutions | Startups, Enterprises, Agencies, approach |
| `/en/ai` | AI capabilities and philosophy | Technical buyers, agents | How does Helva use AI? | AI at Helva | Capabilities, philosophy, principles |
| `/en/resources` | Articles and templates | Community, learners | What can I learn from Helva? | Resources | Articles, templates, newsletter |
| `/en/contact` | Get in touch | Buyers, partners | How do I contact Helva? | Contact Helva | Form, email |
| `/about-abdalbast-khdhir` | Founder identity page | Recruiters, agents | Who is Abdalbast Khdhir? | Abdalbast Khdhir | Already built |
| `/abdalbast-khdhir-portfolio` | Founder portfolio | Recruiters, agents | What has Abdalbast built? | Portfolio | Already built |
| `/abdalbast-khdhir-projects` | Founder project directory | Recruiters, agents | What projects exist? | Projects | Already built |

Internal linking improvements:
- Home should link to About, Products, Solutions, AI, Contact
- About should link to Products, Solutions, Founder pages
- Products should link to Solutions, AI
- Solutions should link to Products, Contact
- AI should link to Products, Solutions

---

## B. Deliverables

### 1. Create `public/llm.txt`

A plain text file served at `/llm.txt` (already handled by Vercel's static serving from `public/`). Contains structured, parsable sections:

```text
SITE
Helva Group

DOMAIN
helva.group

PURPOSE
Helva Group is the umbrella brand for products, services, and case studies
that help founders and teams build and ship modern digital products with AI.

AUDIENCE
- Founders building digital products
- Small teams scaling operations
- Agencies seeking technical partnerships
- Recruiters and collaborators evaluating Abdalbast Khdhir

WHAT_HELVA_GROUP_IS
Helva Group builds a family of products designed to feel like they belong
together. The focus is on reducing friction and increasing momentum across
fitness, language learning, design systems, and digital operations.

PRODUCTS
- Forma: Design system with shared tokens, components, and patterns. Status: Active.
- Pulse: Adaptive fitness tracking. Status: In Development.
- Lingua: Contextual language learning. Status: Coming Soon.
- Nexus: Digital operations infrastructure. Status: Planning.

SERVICES
- Startup foundations: design systems, brand identity, product strategy, technical architecture
- Enterprise modernisation: system migration, design unification, process automation, training
- Agency partnerships: white-label products, technical partnership, resource augmentation

USE_CASES
- Founders who need a fast path from prototype to production
- Teams drowning in tooling fragmentation
- Agencies extending capability with a technical partner
- Language learners seeking contextual immersion
- Individuals wanting adaptive fitness programmes

CASE_STUDIES
- Forma: unified design system powering all Helva products
- Pulse: adaptive fitness app with strong beta retention
- Lingua: contextual language learning in closed alpha
- Nexus: operations platform in planning phase

FOUNDER
Abdalbast Khdhir
Based in Edinburgh. MSc with distinction in data science and business analytics.
Builds and ships AI powered product features end to end.
LinkedIn: https://www.linkedin.com/in/abdalbast/
GitHub: https://github.com/abdalbast

CONTACT
hello@helva.group
https://helva.group/en/contact

CANONICAL_PAGES
- Home: https://helva.group/en
- About: https://helva.group/en/about
- Products: https://helva.group/en/projects
- Solutions: https://helva.group/en/solutions
- AI: https://helva.group/en/ai
- Resources: https://helva.group/en/resources
- Contact: https://helva.group/en/contact
- Founder About: https://helva.group/about-abdalbast-khdhir
- Founder Portfolio: https://helva.group/abdalbast-khdhir-portfolio
- Founder Projects: https://helva.group/abdalbast-khdhir-projects

LAST_UPDATED
2026-02-24

VERSION
1.0
```

### 2. Create `src/components/LlmSummary.tsx`

A reusable component that renders a visually hidden (`sr-only`) block near the top of each page. This block is invisible to users but fully parsable by LLMs and crawlers. It contains:

- **Quick answer**: One sentence summary of the page
- **Who this is for**: Bulleted audience list
- **What you can do here**: Bulleted actions
- **Related pages**: Links with descriptive anchor text
- **Last updated**: Date string

The component accepts props for all of these fields and renders semantic HTML (`section`, `h2`, `ul`, `a`) inside a `div` with `className="sr-only"`.

### 3. Add `LlmSummary` to key pages

Add the component to 6 pages with page-specific content:

- **Index.tsx**: "Helva Group builds products for founders and teams..." links to About, Products, Solutions
- **About.tsx**: "Helva Group is an umbrella brand..." links to Products, Solutions, Founder
- **Projects.tsx** (via the existing page component): "Directory of Helva products..." links to Solutions, AI
- **Solutions.tsx**: "Helva offers services for startups, enterprises, and agencies..." links to Products, Contact
- **AI.tsx**: "How Helva integrates AI across its products..." links to Products, Solutions
- **Contact.tsx**: "Contact Helva Group for projects and collaboration..." links to About, Solutions

### 4. Add Organisation JSON-LD to homepage

Add a `<script type="application/ld+json">` block to `Index.tsx` via Helmet containing:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Helva Group",
  "url": "https://helva.group",
  "description": "Products, services, and case studies that help founders and teams build and ship modern digital products with AI.",
  "founder": {
    "@type": "Person",
    "name": "Abdalbast Khdhir",
    "url": "https://helva.group/about-abdalbast-khdhir"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Edinburgh",
    "addressCountry": "GB"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@helva.group",
    "contactType": "sales"
  }
}
```

### 5. Update `public/robots.txt`

Add explicit allowance for common LLM crawlers and a reference to `llm.txt`:

```text
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

# LLM-readable site summary
# https://helva.group/llm.txt
```

### 6. Update `public/sitemap.xml`

Add an entry for `/llm.txt` so crawlers discover it.

---

## C. LlmSummary Component Template

The `LlmSummary` component interface:

```typescript
interface LlmSummaryProps {
  quickAnswer: string;
  audience: string[];
  actions: string[];
  relatedPages: { label: string; href: string }[];
  lastUpdated: string;
}
```

Rendered as a `sr-only` section with semantic headings. Invisible to sighted users, fully readable by screen readers and LLM crawlers that parse rendered HTML.

---

## D. Rewrite Guidance for Key Pages

No full page rewrites are needed. The `LlmSummary` hidden block handles LLM readability without changing the existing visual design. The existing pages already have good semantic structure with clear H1s and sections.

Minor heading improvements to consider (delivered via the LlmSummary content, not visual changes):
- Home: implicit H2s like "What is Helva Group?" and "What products does Helva offer?" are covered by the summary block
- About: the LlmSummary answers "Who is behind Helva Group?" directly
- Solutions: the LlmSummary answers "How can Helva help me?" directly

---

## E. Priority Implementation Order

1. **`public/llm.txt`** -- Highest impact. Immediate LLM discoverability. No code dependencies.
2. **`src/components/LlmSummary.tsx`** -- Reusable component needed by all subsequent page edits.
3. **`Index.tsx`** -- Homepage with Organisation JSON-LD and LlmSummary. Most crawled page.
4. **`About.tsx`** -- Brand story page with LlmSummary.
5. **`Solutions.tsx`** -- Services page with LlmSummary.
6. **`AI.tsx`** -- AI capabilities page with LlmSummary.
7. **`Projects.tsx`** (the i18n version) -- Product directory with LlmSummary.
8. **`Contact.tsx`** -- Contact page with LlmSummary.
9. **`public/robots.txt`** -- Add LLM bot rules.
10. **`public/sitemap.xml`** -- Add llm.txt entry.

---

## Technical Summary

Files to create:
- `public/llm.txt` -- plain text LLM summary
- `src/components/LlmSummary.tsx` -- reusable hidden summary component

Files to modify:
- `src/pages/Index.tsx` -- add LlmSummary + Organisation JSON-LD
- `src/pages/About.tsx` -- add LlmSummary
- `src/pages/Solutions.tsx` -- add LlmSummary
- `src/pages/AI.tsx` -- add LlmSummary
- `src/pages/Projects.tsx` -- add LlmSummary
- `src/pages/Contact.tsx` -- add LlmSummary
- `public/robots.txt` -- add LLM bot rules
- `public/sitemap.xml` -- add llm.txt entry

No new dependencies. No database changes. No visual changes to existing pages.

