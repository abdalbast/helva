# Design System & Visual Identity

## Design Philosophy
The site uses a warm, architectural aesthetic inspired by Gamla Stan (Stockholm's old town). The visual metaphor is colourful building facades with interactive segments.

## Fonts
- **Display**: Inter (font-display, extrabold for headings)
- **Mono**: JetBrains Mono (navigation, labels, meta text — uppercase with wide tracking)

Font loading via Google Fonts CDN in `index.css`.

## Colour Palette (HSL in CSS variables)

### Semantic Tokens (index.css `:root`)
| Token | Light | Dark | Usage |
|---|---|---|---|
| `--background` | 40 20% 95% | 15 16% 8% | Page background |
| `--foreground` | 15 16% 15% | 40 33% 89% | Body text |
| `--primary` | 40 68% 45% | 40 68% 52% | Brand accent (warm ochre) |
| `--secondary` | 12 45% 42% | 12 60% 34% | Terracotta accent |
| `--muted` | 40 15% 88% | 20 8% 15% | Subdued backgrounds |
| `--card` | 40 15% 90% | 20 8% 15% | Card surfaces |
| `--border` | 40 15% 80% | 40 33% 20% | Borders |

### Custom Helva Palette
| Token | HSL | Usage |
|---|---|---|
| `--ochre-500` | 40 68% 52% | Building highlights |
| `--ochre-600` | 36 63% 43% | Darker ochre |
| `--terracotta` | 12 60% 34% | Warm accent |
| `--umber-900` | 15 16% 8% | Deep dark |
| `--cobblestone` | 20 8% 15% | Dark surface |
| `--stone-wash` | 40 33% 89% | Light wash |

### Gamla Stan Pastel Palette (Building Facades)
| Token | HSL | Segment |
|---|---|---|
| `--gamla-sage` | 93 30% 54% | Completeness / Whole |
| `--gamla-coral` | 13 58% 59% | Warmth / Human |
| `--gamla-ochre` | 38 78% 58% | Systems / Scalable |
| `--gamla-yellow` | 48 75% 59% | Longevity / Enduring |

## Theme System
- Dark/light mode via `useTheme()` hook
- Persisted in localStorage (`helva-theme`)
- Falls back to `prefers-color-scheme`
- Toggle via `.dark` class on `<html>`

## Key Visual Elements
- **Grain overlay**: Fixed SVG noise texture at 4% opacity (`grain-overlay` class)
- **Building facade**: 4 coloured segments with parallax mouse tracking (FacadeContainer + BuildingSegment)
- **Window glow**: Lit windows using `--stone-wash` with box-shadow
- **City hub**: Rotating city name in navigation (Edinburgh, Stockholm, Columbus, Portland, Sulaimani, Erbil)
- **Slide-up animations**: Staggered reveal on page load

## Layout
- 12-column CSS grid with `p-5 lg:p-10 gap-5`
- Navigation spans full width (`col-span-12`)
- Hero section: `col-span-12 lg:col-span-5`
- Facade: `col-span-12 lg:col-span-6 lg:col-start-7`
- Footer spans full width

## Component Patterns
- All colours use semantic tokens via Tailwind classes (`text-primary`, `bg-background`, etc.)
- Never use raw colour values in components
- shadcn/ui components are available but many pages use custom markup
- Navigation uses mono font with uppercase tracking for all links
- Page transitions via AnimatedPage (framer-motion fade + slide)
