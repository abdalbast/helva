# Helva Product Context

## Register
product

## Product Purpose
Helva Ltd. is the parent brand website for the Helva ecosystem, an umbrella brand for products, services, and case studies that help founders and teams build and ship modern digital products with AI.

## Audience
- Founders evaluating product strategy or execution help
- Teams looking for design systems, engineering support, and AI-enabled delivery
- Visitors researching Helva Ltd., its products, and its founder

## Core Surfaces
- `/:lang` homepage
- `/:lang/about`
- `/:lang/projects`
- `/:lang/projects/:slug`
- `/:lang/solutions`
- `/:lang/ai`
- `/:lang/resources`
- `/:lang/resources/:slug`
- `/:lang/contact`
- `/:lang/privacy`
- `/:lang/terms`
- `/about-abdalbast-khdhir`
- `/abdalbast-khdhir-portfolio`
- `/abdalbast-khdhir-projects`

## Product Principles
- Keep the site clear, credible, and low-friction
- Prioritise strong information architecture over decorative complexity
- Keep SEO landing pages distinct from the main multilingual product site
- Preserve British English in content
- Support English, Swedish, Kurdish, and Arabic with correct directionality

## Content Model
- Static content from local data files for projects, articles, and resources
- Newsletter subscription and contact form are handled by Vercel serverless functions
- No database-backed product system in the current architecture

## Constraints
- Avoid introducing a backend database unless the architecture explicitly changes
- Keep translation keys and routes aligned
- Preserve existing analytics, cookie consent, and SEO metadata behavior
