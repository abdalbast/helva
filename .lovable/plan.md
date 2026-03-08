

# Production Readiness Audit -- Plan

## A. Issues Found

### Critical

1. **Toast system is dead code.** The Radix toast (`Toaster`, `use-toast.ts`, `toast.tsx`) and `TooltipProvider` are imported in `App.tsx` but never used anywhere in the app. No component calls `toast()` or `useToast()`. The Sonner toaster is also mounted but never invoked. These add ~15KB of unused JS to the bundle.

2. **`dangerouslySetInnerHTML` without DOMPurify on About.tsx and AI.tsx.** Three instances render translated strings with `dangerouslySetInnerHTML` but do not sanitize via DOMPurify. While these come from translation files (not user input), it is an XSS vector if translation files are ever compromised or CMS-driven.

3. **Contact form on Abdalbast pages uses different input styling than the main Contact page.** The Abdalbast forms use `border border-border bg-background px-3 py-2 focus:ring-2 focus:ring-ring` while the main Contact page uses `bg-transparent border border-border/30 px-4 py-3 focus:border-primary`. This is a design inconsistency and makes the Abdalbast pages feel off-brand.

4. **Newsletter tracks PII (email) in analytics.** `NewsletterSection.tsx` line 33: `trackEvent('newsletter_signup', { email })`. Sending raw email to PostHog violates GDPR principles and is a privacy risk.

### Important

5. **Duplicate contact forms across 3 files.** `AboutAbdalbast.tsx` and `PortfolioAbdalbast.tsx` each contain ~25 lines of identical contact form JSX. This should be a shared component.

6. **`PILL_CLASS` constant is duplicated** in `AboutAbdalbast.tsx`, `PortfolioAbdalbast.tsx`, and `ProjectsAbdalbast.tsx`.

7. **`BulletList` component is defined inside `AboutAbdalbast.tsx`** but could be reused by `PortfolioAbdalbast.tsx` (which manually re-implements the same list pattern at lines 96-103).

8. **Missing `PageMeta` on all three Abdalbast SEO pages.** They use raw `<Helmet>` with hardcoded metadata instead of the shared `PageMeta` component. This means they miss hreflang tags and consistent OG formatting.

9. **Footer social links point to `#`.** LinkedIn, X, and Instagram links in `Footer.tsx` are placeholder anchors. On a production site these are dead clicks.

10. **Language switcher dropdown has no click-outside-to-close behavior** in Navigation. It stays open until you click another language or navigate.

11. **Abdalbast project links all point to `#`.** Every "View project" and "GitHub" link in `ProjectsAbdalbast.tsx` and `AboutAbdalbast.tsx` is a dead link.

12. **`useContactForm` hook does not check the API response body for `success`.** It only checks `res.ok`, but the Contact API returns `{ success: true/false }`. A 200 response with `{ success: false }` would incorrectly show "sent".

### Optional

13. **Stagger animation classes (`stagger-1` through `stagger-4`) use `opacity: 0`** which means content is invisible until the animation fires. If animation is disabled (reduced motion preference), content stays invisible forever. Need a `prefers-reduced-motion` media query.

14. **`Resources.tsx` is missing `LlmSummary`** unlike every other main page.

15. **The `About.tsx` page does not sanitize the `dangerouslySetInnerHTML` translations.** Should use DOMPurify like `ArticleDetail.tsx` does, or use the `<Trans>` component pattern.

16. **`useContactForm` errors state typed as `Record<string, string>` but `updateField` sets values to `undefined`**, causing a type mismatch (string vs undefined).

---

## B. Refactoring Plan

### 1. Remove dead toast system and unused TooltipProvider
- Delete `src/hooks/use-toast.ts`, `src/components/ui/toaster.tsx`, `src/components/ui/toast.tsx`, `src/components/ui/tooltip.tsx`
- Remove their imports and `<Toaster />`, `<TooltipProvider>` from `App.tsx`
- Keep Sonner (it is the modern alternative), but it is also unused -- keep it as a lightweight util for future use
- Remove unused Radix packages from `package.json`: `@radix-ui/react-toast`, `@radix-ui/react-tooltip`

### 2. Extract shared `ContactForm` component
- Create `src/components/ContactForm.tsx` that encapsulates the form JSX, honeypot, validation display, and success/error states
- Uses the existing `useContactForm` hook internally
- Uses the main site's input styling (transparent bg, border-border/30, focus:border-primary) for design consistency
- Replace the duplicated forms in `AboutAbdalbast.tsx` and `PortfolioAbdalbast.tsx`

### 3. Extract shared constants
- Move `PILL_CLASS` and `BulletList` to shared locations (inline in the ContactForm or a small shared file)

### 4. Fix privacy violation in newsletter analytics
- Change `trackEvent('newsletter_signup', { email })` to `trackEvent('newsletter_signup', { source: 'newsletter-section' })` -- remove raw email

### 5. Sanitize all `dangerouslySetInnerHTML` usage
- Import DOMPurify in `About.tsx` and `AI.tsx` and wrap the translated HTML strings

### 6. Fix `useContactForm` to check response body
- Parse `res.json()` and check `data.success` before marking as sent

### 7. Add `prefers-reduced-motion` safety
- In `index.css`, add a media query that disables stagger opacity:0 when reduced motion is preferred

### 8. Add click-outside handler for language dropdown
- Add a `useEffect` in Navigation that listens for clicks outside the dropdown to close it

### 9. Clean up Footer social placeholders
- Remove or comment out the placeholder `#` social links until real URLs are provided. Dead links are worse than no links.

### 10. Add `LlmSummary` to Resources page
- Add the missing machine-readable summary for consistency

---

## C. Files to Change

| File | Action |
|------|--------|
| `src/hooks/use-toast.ts` | Delete |
| `src/components/ui/toaster.tsx` | Delete |
| `src/components/ui/toast.tsx` | Delete |
| `src/components/ui/tooltip.tsx` | Delete |
| `src/App.tsx` | Remove dead imports, Toaster, TooltipProvider |
| `src/components/ContactForm.tsx` | Create -- shared form component |
| `src/pages/AboutAbdalbast.tsx` | Use ContactForm, remove inline form, move BulletList out |
| `src/pages/PortfolioAbdalbast.tsx` | Use ContactForm, remove inline form and duplicate list |
| `src/pages/ProjectsAbdalbast.tsx` | Import shared PILL_CLASS |
| `src/components/NewsletterSection.tsx` | Remove email from analytics event |
| `src/pages/About.tsx` | Add DOMPurify sanitization |
| `src/pages/AI.tsx` | Add DOMPurify sanitization |
| `src/hooks/useContactForm.ts` | Fix response body check, fix error type |
| `src/index.css` | Add prefers-reduced-motion query |
| `src/components/Navigation.tsx` | Add click-outside close for lang dropdown |
| `src/components/Footer.tsx` | Remove placeholder social links |
| `src/pages/Resources.tsx` | Add LlmSummary |

## D. What Gets Removed

- `src/hooks/use-toast.ts` -- 186 lines, zero usage
- `src/components/ui/toaster.tsx` -- 24 lines, only consumer of use-toast
- `src/components/ui/toast.tsx` -- 110 lines, only consumer is toaster
- `src/components/ui/tooltip.tsx` -- 27 lines, only wrapped in App.tsx with no tooltips in the app
- ~50 lines of duplicated contact form JSX across two Abdalbast pages
- 3 duplicate PILL_CLASS constants
- PII (email) from analytics tracking

## E. Remaining Risks

- **Sonner toaster** is still mounted in App.tsx but never used. Kept because it is lightweight and useful for future error/success toasts. Flag for removal if bundle size is critical.
- **Radix packages still in package.json** for toast/tooltip -- these should be removed from `package.json` and `bun.lock` regenerated. This requires a dependency update that I will handle.
- **Footer social links removed** -- if real URLs exist, they should be re-added with actual values.
- **`dangerouslySetInnerHTML` in translations** -- the DOMPurify fix handles current risk, but long-term the `<Trans>` component pattern from react-i18next is the better approach for HTML in translations.
- **Project links (`#`) on Abdalbast pages** -- these are content gaps, not code bugs. Flagged but not changed since they represent real content that doesn't exist yet.

