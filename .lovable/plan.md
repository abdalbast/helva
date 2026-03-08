

## Premium Homepage Refinement — Apple-Inspired Polish

### Current State
The homepage has a solid architectural aesthetic with the building facade visualization and newsletter CTA. However, spacing is tight, typography lacks hierarchy depth, and the CTA area feels utilitarian rather than premium.

### Changes

**1. HeroSection.tsx — Typography and spacing overhaul**
- Increase headline size from `clamp(3rem,8vw,6rem)` to `clamp(3.5rem,9vw,7rem)` with tighter leading
- Increase subheadline from `text-lg` to `text-xl` with more generous `max-w-[440px]` and `leading-[1.6]`
- Add more vertical breathing room: `mb-8` on headline, `mb-14` on subheadline
- Refine CTA button: add `rounded-full` pill shape, increase padding to `px-8 py-3.5`, add subtle backdrop blur hover effect
- Style the email input with a cleaner bottom border and larger text
- Add a subtle trust line below the form (e.g., "Join 500+ founders and operators" in mono micro text)
- Increase overall section top margin on mobile

**2. FacadeContainer.tsx — More breathing room**
- Increase gap from `gap-3` to `gap-4`
- Increase height from `h-[400px]` to `h-[450px]` on mobile, `lg:h-[75vh]` on desktop
- Slightly more dramatic parallax depth multiplier

**3. PageLayout.tsx — Wider spacing**
- Increase padding from `p-5 lg:p-10` to `p-6 lg:p-12`
- Increase grid gap from `gap-5` to `gap-6`

**4. Navigation.tsx — Lighter touch**
- Increase bottom margin from `mb-10` to `mb-16` for more hero breathing room
- Slightly larger logo text `text-[1.65rem]`

**5. index.css — Subtle refinements**
- Add `letter-spacing: -0.025em` to body for tighter, more modern feel
- Smooth the reveal animation to be slightly slower (1.4s) for more elegance

**6. BuildingSegment.tsx — Refined hover**
- Soften hover brightness from `1.1` to `1.05`
- Add `transition-shadow` with a soft glow on hover matching segment color

### What stays the same
- All colors, palette, fonts, dark mode
- All functional behavior (newsletter form, language switcher, routing)
- Building facade concept and parallax
- All i18n strings

