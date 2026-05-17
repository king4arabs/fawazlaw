# Design System

> **Status:** Drafted. Tokens and components live in `UI-WEB/frontend` (Tailwind + DaisyUI). This page is the contract for what we standardise.

## Principles
- **Premium**, **calm**, **trustworthy**, **professional**.
- **Arabic-first**: type and spacing tuned for Arabic line lengths first.
- **RTL-native**: use logical CSS properties; do not hard-code `left`/`right`.
- **Accessible**: WCAG 2.1 AA contrast; visible focus; semantic HTML.

## Tokens (target)
- Brand palette: deep navy primary, warm gold accent, soft off-white surface — exact values defined in `tailwind.config.js`.
- Typography: Arabic display + body pair (e.g., `IBM Plex Sans Arabic`), English display + body pair, with consistent vertical rhythm.
- Spacing scale: Tailwind defaults; custom additions documented.
- Radius and shadows: small set of values; never one-off.

## Components (target)
- Buttons (primary / secondary / ghost / destructive).
- Form fields with Arabic and English variants.
- Card, dialog, alert, tabs, accordion.
- Sticky mobile CTA.
- Service-page block kit (intro, who-it's-for, included, process, FAQ, CTA).

## Direction Patterns
- Use `start`/`end` (`margin-inline-start`, `text-end`) rather than `left`/`right`.
- Direction-aware icons: chevrons flip via CSS; never bake direction into asset.
- Mixed-direction content uses `<bdi>` for proper isolation.

## Validation
- Native Arabic reviewer sign-off on copy in new components.
- Axe a11y scan on every component story (planned with Storybook).
- Visual regression on a small golden set (planned).
