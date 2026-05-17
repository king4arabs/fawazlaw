# Frontend Playbook

## Purpose
Build and maintain a fast, accessible, premium Arabic-first website (React 18 + CRA + Tailwind + DaisyUI) that converts legal-services intent into qualified consultations.

## Standards
- Arabic is the default language and direction (`<html lang="ar" dir="rtl">`). English is supported per route or component with explicit `lang` and `dir` toggling.
- Use semantic HTML (`<header>`, `<main>`, `<nav>`, `<article>`, `<section>`, `<footer>`); never an empty `<div>` where a landmark exists.
- Tailwind utility-first; use `@apply` only inside `components` layer of a single CSS file when truly shared.
- DaisyUI components must be themed to the Fawazlaw palette — never ship default DaisyUI cosmetics.
- All routes have unique `<title>`, meta description, canonical URL, and OG/Twitter cards via `react-helmet`.
- Every public route has structured data appropriate to its content (`Organization`, `LegalService`, `FAQPage`, `Article`, `BreadcrumbList`).
- All images have `alt` text (Arabic where the page is Arabic); decorative images use `alt=""`; specify `width`/`height` to prevent CLS.
- All interactive elements are reachable by keyboard with a visible focus indicator.
- No `console.log` in production code; remove or convert to a logger before merging.

## Checklist (before opening a PR)
- [ ] Page renders correctly in `dir="rtl"` and `dir="ltr"` at 375 / 768 / 1280 widths.
- [ ] No new ESLint warnings.
- [ ] No new console errors or warnings in the browser.
- [ ] Lighthouse mobile run shows no regression on the touched page.
- [ ] All new strings are translatable (no hard-coded English in Arabic surfaces).
- [ ] All CTAs reach a real destination.
- [ ] Updated `CHANGELOG.md` if user-visible.

## Best Practices
- Prefer static SEO pages over dynamic-fetched content for top legal queries.
- Lazy-load below-the-fold images and large libraries (Tiptap, Quill, Draft.js).
- Co-locate component, styles, and tests under the same folder.
- Treat props as immutable; never mutate arrays/objects passed in.
- Use `React.memo`, `useMemo`, `useCallback` only when profiling shows a need.
- Centralise API calls in a thin client wrapper; never `fetch` inline in components.

## Common Mistakes to Avoid
- Pasting machine-translated Arabic into legal content.
- Removing semantic landmarks because Tailwind makes a `<div>` look the same.
- Relying on CRA's default lint config to catch a11y issues — it doesn't.
- Adding new heavy editors (Tiptap/Quill/Draft) to the public bundle.
- Inline styles or arbitrary colour hex values instead of the design tokens.
- Mixing `react-router` `<Link>` with raw `<a>` for internal navigation.

## Project-Specific Implementation Guidance
- Service landing pages must follow the structure in `MARKETING_GROWTH.md`.
- Booking and WhatsApp CTAs always link to the canonical numbers from one constants file — never hard-code per page.
- The AI assistant surface must always render the "support tool, not legal advice" disclaimer above the input.
- App portal links point to `https://app.fawazlaw.sa`; never duplicate to other subdomains.

## Recommended Tools
- React DevTools, Tailwind IntelliSense, axe DevTools, Lighthouse, Wave, Schema Markup Validator.

## Validation Steps
```bash
cd UI-WEB/frontend
npm install
CI=true npm test -- --watchAll=false --passWithNoTests
CI=false npm run build
npm audit --audit-level=high   # review, not blocking yet
```

## Definition of Done
- All checklist items pass.
- Reviewer signs off on Arabic copy if it's substantive.
- Documentation updated (`CHANGELOG.md`, and `ROADMAP.md`/`TODO.md` if it shifts scope).
