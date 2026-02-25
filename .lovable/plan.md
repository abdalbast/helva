

# Add "Founder" Navigation Tab

Add a "Founder" link to the main navigation that points to `/about-abdalbast-khdhir`, making the Abdalbast SEO pages accessible from the site navigation.

---

## Changes

### 1. `src/components/Navigation.tsx`
Add a new entry to the `navItems` array:
```js
{ label: t('nav.founder'), to: '/about-abdalbast-khdhir' }
```
Place it after "About" and before "Contact".

### 2. Translation files (`en.json`, `sv.json`, `ku.json`, `ar.json`)
Add `"founder": "Founder"` to the `nav` object in each locale file (using the appropriate translation for each language).

### 3. Active-state matching in Navigation
The current active-state check uses exact path match (`location.pathname === item.to`). Update it to use `startsWith` for the founder link so that `/abdalbast-khdhir-portfolio` and `/abdalbast-khdhir-projects` also highlight the Founder tab:
```js
location.pathname === item.to || 
(item.to === '/about-abdalbast-khdhir' && location.pathname.includes('abdalbast'))
```

---

## Files to modify
- `src/components/Navigation.tsx` — add nav item + active-state logic
- `src/i18n/locales/en.json` — add `nav.founder`
- `src/i18n/locales/sv.json` — add `nav.founder`
- `src/i18n/locales/ku.json` — add `nav.founder`
- `src/i18n/locales/ar.json` — add `nav.founder`

No new files. No new dependencies. No visual layout changes beyond the additional tab.

