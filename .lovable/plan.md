
## Helva Website Enhancements

This plan covers three major enhancements: updating building colors to match Gamla Stan, adding a comprehensive footer, and redesigning the navigation with animated city hubs.

---

### 1. Building Segment Color Update

The four building segments will be updated to match the pastel colors of the iconic Gamla Stan buildings from the reference photo:

| Segment | Current | New Color | Hex Value |
|---------|---------|-----------|-----------|
| Completeness | Dark ochre | Sage Green | #8B9A7B |
| Warmth | Terracotta | Coral Orange | #D4725A |
| Systems | Golden ochre | Golden Ochre | #E8A93E |
| Longevity | Cobblestone | Warm Yellow | #E8C547 |

**Files to modify:**
- `src/index.css` - Add new CSS custom properties for the Gamla Stan palette
- `tailwind.config.ts` - Register new color tokens
- `src/components/FacadeContainer.tsx` - Update segment color classes

---

### 2. Footer Section

A new footer component will be created with brand information and social links, maintaining the architectural aesthetic:

**Layout structure:**
```text
┌─────────────────────────────────────────────────────────────────┐
│ HELVA                                    LinkedIn  Twitter  IG  │
│ Digital architecture for the modern world                      │
├─────────────────────────────────────────────────────────────────┤
│ Products    Solutions    Resources    Contact                   │
├─────────────────────────────────────────────────────────────────┤
│ © 2024 Helva Group                    updates@helva.group       │
└─────────────────────────────────────────────────────────────────┘
```

**Features:**
- Brand logo and tagline
- Navigation links (Products, Solutions, AI, Resources, About)
- Social links (LinkedIn, Twitter/X, Instagram)
- Copyright and contact information
- Subtle border treatments matching the site aesthetic

**File to create:**
- `src/components/Footer.tsx`

**File to modify:**
- `src/pages/Index.tsx` - Import and add Footer component

---

### 3. Navigation Redesign

**Current navigation:**
```text
HELVA                Stockholm // Digital Architecture // About
```

**New navigation:**
```text
HELVA    Projects  Solutions  AI  Resources  About       [Edinburgh]
```

**Key changes:**

**A. Main navigation tabs:**
- Replace "Stockholm // Digital Architecture" with clickable navigation items
- Items: Projects, Solutions, AI, Resources, About
- Styled as minimal, spaced tabs with hover underline effects
- Mobile-responsive with hamburger menu consideration

**B. Animated City Hub display:**
- Positioned in the right corner of the navigation
- Cycles through: Edinburgh, Stockholm, Columbus, Portland, Sulaimani, Erbil
- Smooth vertical slide transition (text slides up and fades out, new city slides in from below)
- Cycle interval: 3 seconds
- Font: JetBrains Mono, small caps, muted color
- Subtle fade and translate animation for a sleek, minimalistic effect

**Animation approach:**
```text
[Stockholm] ──(3s)──> slides up & fades
                      [Columbus] slides up from below
```

**Files to modify:**
- `src/components/Navigation.tsx` - Complete redesign with tabs and animated hub

---

### Technical Implementation Details

**New CSS Variables (src/index.css):**
```css
--gamla-sage: 93 30% 54%;      /* Sage green */
--gamla-coral: 13 58% 59%;     /* Coral orange */
--gamla-ochre: 38 78% 58%;     /* Golden ochre */
--gamla-yellow: 48 75% 59%;    /* Warm yellow */
```

**Animation Keyframes for City Hub:**
```css
@keyframes slideUpOut {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(-100%); opacity: 0; }
}

@keyframes slideUpIn {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

**City Hub Component Logic:**
- Uses React state to track current city index
- `useEffect` with `setInterval` for automatic cycling
- CSS transitions for smooth animations
- Pause on hover (optional enhancement)

---

### File Change Summary

| File | Action | Description |
|------|--------|-------------|
| `src/index.css` | Modify | Add Gamla Stan color palette and city animation keyframes |
| `tailwind.config.ts` | Modify | Add new color tokens |
| `src/components/FacadeContainer.tsx` | Modify | Update segment colors |
| `src/components/Navigation.tsx` | Modify | Add nav tabs and animated city hub |
| `src/components/Footer.tsx` | Create | New footer with brand info and social links |
| `src/pages/Index.tsx` | Modify | Add Footer component |
| `src/pages/About.tsx` | Modify | Update footer to use shared Footer component |

---

### Responsive Considerations

**Navigation on mobile:**
- Stack nav items vertically or use a hamburger menu
- City hub displayed below or hidden on very small screens

**Footer on mobile:**
- Stack sections vertically
- Full-width social links
- Centered text alignment
