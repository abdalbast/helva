# Component Architecture

## Shared Layout Components
Every i18n page follows this structure:
```tsx
<AnimatedPage>
  <PageMeta ... />
  <LlmSummary ... />
  <a href="#main-content" className="sr-only ...">Skip to content</a>
  <GrainOverlay />
  <main id="main-content" className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
    <Navigation />
    {/* Page content */}
    <Footer />
  </main>
</AnimatedPage>
```

## Key Components

### Navigation (`src/components/Navigation.tsx`)
- Desktop: horizontal nav links + language switcher + theme toggle + rotating city name
- Mobile: hamburger menu with slide-down animation
- Links: Projects, Solutions, AI, Resources, About, Contact
- Language switcher dropdown with all 4 languages
- Theme toggle (dark/light)
- City hub: cycles through Edinburgh, Stockholm, Columbus, Portland, Sulaimani, Erbil every 3s

### AnimatedPage (`src/components/AnimatedPage.tsx`)
- Framer Motion wrapper for page transitions
- Fade + slide up on enter, fade + slide up on exit
- Used with `<AnimatePresence mode="wait">` in App.tsx

### FacadeContainer + BuildingSegment
- Interactive building facade on homepage
- 4 coloured segments (sage, coral, ochre, yellow) representing brand values
- Parallax effect tracking mouse X position
- Each segment has lit windows and hover expand effect

### HeroSection (`src/components/HeroSection.tsx`)
- H1 headline with i18n support
- Newsletter signup form with inline validation
- States: idle, loading, success, already subscribed, error
- Honeypot spam protection

### Footer (`src/components/Footer.tsx`)
- Brand logo link, social links (placeholder URLs)
- Navigation links to all main pages
- Copyright, privacy, terms links
- Email: updates@helva.group

### GrainOverlay (`src/components/GrainOverlay.tsx`)
- Fixed full-screen SVG noise texture at 4% opacity
- Purely decorative (`aria-hidden="true"`)

### CookieConsent (`src/components/CookieConsent.tsx`)
- Bottom-fixed banner with accept/decline buttons
- Delays appearance by 1s to avoid flash
- Gates PostHog analytics initialisation

### ScrollToTop (`src/components/ScrollToTop.tsx`)
- Scrolls to top on route change

## Data Flow
- All product/article data is static (imported from `src/data/`)
- No global state management (no Redux, Zustand, etc.)
- React Query installed but primarily for future use
- Forms use local useState for form state
