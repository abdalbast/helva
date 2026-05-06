# Helva Design Context

## Visual Direction
The main site uses a warm architectural aesthetic inspired by Gamla Stan in Stockholm, with colourful building facades, layered texture, and subtle motion.

The founder SEO pages use a separate minimal Nordic aesthetic: white backgrounds, system fonts, and no animation.

## Typography
- Display font: Inter
- Mono font: JetBrains Mono
- Navigation and meta labels use uppercase mono styling with wide tracking
- Headings rely on strong weight and scale contrast

## Colour System
Use semantic CSS tokens from `index.css` rather than raw colour values.

### Semantic Tokens
- `--background`
- `--foreground`
- `--primary`
- `--secondary`
- `--muted`
- `--card`
- `--border`

### Custom Helva Palette
- `--ochre-500`
- `--ochre-600`
- `--terracotta`
- `--umber-900`
- `--cobblestone`
- `--stone-wash`

### Gamla Stan Facade Palette
- `--gamla-sage`
- `--gamla-coral`
- `--gamla-ochre`
- `--gamla-yellow`

## Layout
- 12-column grid with `p-5 lg:p-10 gap-5`
- Navigation spans the full width
- Hero and facade share the top grid on the main homepage
- Footer spans the full width

## Motion
- Use staggered reveal animations on the main site
- Prefer subtle page transitions over heavy effects
- Avoid animation on the founder SEO pages

## Shared Components
- Grain overlay for texture
- Facade container and building segments for the hero metaphor
- Navigation with rotating city names
- PageMeta for titles, descriptions, canonical links, and hreflang

## Do
- Keep colors on semantic tokens
- Keep line lengths and hierarchy readable
- Preserve the architectural, grounded tone
- Treat SEO pages as intentionally different from the main product site

## Do Not
- Use raw colour literals in components
- Flatten the whole site into generic SaaS styling
- Add decorative glassmorphism by default
- Make the SEO pages visually noisy or animated

