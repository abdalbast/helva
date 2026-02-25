# Internationalisation & Routing

## Supported Languages
| Code | Name | Direction |
|---|---|---|
| `en` | English | LTR |
| `sv` | Svenska | LTR |
| `ku` | کوردی (Kurdish Sorani) | RTL |
| `ar` | العربية (Arabic) | RTL |

## Configuration
- **Library**: i18next + react-i18next + i18next-browser-languagedetector
- **Config**: `src/i18n/config.ts`
- **Translation files**: `src/i18n/locales/{en,sv,ku,ar}.json`
- **Detection**: Path-based (`/:lang/...`), first path segment
- **Fallback**: English (`en`)

## How Language Routing Works
1. Root `/` redirects to `/en` via `<Navigate to="/en" replace />`
2. All content routes are nested under `/:lang` in App.tsx
3. `useLanguage()` hook syncs URL `:lang` param with i18next
4. Sets `document.documentElement.lang` and `dir` (rtl/ltr) attributes
5. Language switcher navigates to same path with new lang prefix

## RTL Support
- `isRtl()` helper checks if language is `ku` or `ar`
- `document.documentElement.dir` set to `rtl` or `ltr` automatically
- RTL languages array: `['ku', 'ar']`

## SEO Landing Pages Exception
The Abdalbast SEO pages (`/about-abdalbast-khdhir`, etc.) are NOT under the `/:lang` prefix. They are root-level routes with hardcoded English content and their own metadata.

## PageMeta Component
`src/components/PageMeta.tsx` handles per-page SEO:
- Sets `<title>`, `<meta description>`, `<link canonical>`
- Adds OG and Twitter meta tags
- Generates hreflang alternate links for all 4 languages
- Base URL: `https://helva.group`
