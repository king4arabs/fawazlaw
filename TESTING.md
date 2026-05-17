# Testing

## Strategy
Fawazlaw.sa handles legal content and (in future) confidential client data. Test coverage must protect: (1) content accuracy and SEO output, (2) auth and payment flows, (3) Arabic/RTL rendering, and (4) accessibility. We follow the standard test pyramid: many unit, fewer integration, few but critical E2E.

## Unit Testing
- **Frontend:** Jest + React Testing Library via `react-scripts test`. Test pure utilities, hooks, and presentational components in isolation. Mock network calls.
- **Node API:** Jest or Vitest (not yet configured). Target controllers and middleware in isolation, mocking Mongoose models.
- **Laravel API:** PHPUnit feature tests for controllers, unit tests for services. Use database transactions for isolation.

## Integration Testing
- **Frontend ↔ API:** test API client wrappers against a mocked HTTP layer (`msw`).
- **Laravel:** route-level feature tests with a SQLite or test MySQL database; validate auth + payment webhooks against MyFatoorah's sandbox.
- **Node:** spin up an in-memory MongoDB (`mongodb-memory-server`) and exercise route handlers end-to-end inside the process.

## E2E Testing
- Recommended tool: **Playwright** (cross-browser, supports Arabic/RTL viewports, easy CI integration).
- Critical user journeys:
  1. Visit homepage, switch language (when enabled), submit contact form.
  2. Visit a service page, click the booking CTA, reach the contact path.
  3. Visit the digital platform page and follow the app portal link.
  4. Admin login (Laravel & Node), create/edit a service, log out.
  5. Payment sandbox flow (MyFatoorah test mode).

## Accessibility Testing
- Automated: `axe-core` via `@axe-core/react` in dev and `@axe-core/playwright` in CI.
- Manual: keyboard-only navigation in both `dir="rtl"` and `dir="ltr"` modes, screen reader smoke test (VoiceOver / NVDA), 200% zoom, color contrast against WCAG 2.1 AA.
- Verify focus indicators are visible and not removed by Tailwind/DaisyUI overrides.

## Security Testing
- Dependency audit: `npm audit --audit-level=high`, `composer audit`, GitHub Dependabot.
- Static analysis: ESLint (frontend), `phpstan` or Larastan (Laravel), `npm audit signatures`.
- DAST (planned): OWASP ZAP baseline scan against staging.
- Manual: verify auth boundaries on every admin route; attempt IDOR on services/articles endpoints; check that JWTs expire and refresh as expected.

## Performance Testing
- Frontend: Lighthouse CI for mobile + desktop, budget on LCP < 2.5s, CLS < 0.1, INP < 200ms.
- API: `k6` or `autocannon` smoke load on the 10 hottest endpoints.
- DB: `EXPLAIN` on every new query touching > 1K rows; add indexes as needed.

## Manual QA Checklist
- [ ] All public pages render in Arabic RTL without layout breakage.
- [ ] All public pages render in English LTR (where translations exist).
- [ ] All CTAs reach a working destination (no 404, no `#`).
- [ ] Contact form submits and shows a clear success/error state.
- [ ] WhatsApp link opens the official number.
- [ ] Sitemap, robots, manifest load and validate.
- [ ] Structured data passes Google's Rich Results Test on home, services, and a service detail page.
- [ ] No console errors on first load of any page.
- [ ] Mobile (375px), tablet (768px), desktop (1280px) all pass a visual smoke.

## Automated QA Checklist (CI)
- [ ] `npm ci` succeeds for the frontend.
- [ ] `CI=true npm test -- --watchAll=false --passWithNoTests` succeeds.
- [ ] `CI=false npm run build` succeeds.
- [ ] `npm audit --audit-level=high` is reviewed (currently non-blocking; tracked).
- [ ] (Planned) PHP `composer install && vendor/bin/phpunit` succeeds.
- [ ] (Planned) Playwright E2E smoke succeeds against staging.

## Commands (today)
```bash
cd UI-WEB/frontend
npm install
CI=true npm test -- --watchAll=false --passWithNoTests
CI=false npm run build
npm audit --audit-level=high
```

```bash
cd API-Node
npm install
npm audit --audit-level=moderate
```

```bash
cd API-BACKEND/api
composer install
php artisan test           # once test suite is added
```

## Recommended Tools
- Jest, React Testing Library, MSW (frontend unit/integration).
- Playwright (E2E).
- axe-core (accessibility).
- Lighthouse CI (performance/SEO).
- PHPUnit, Pest, Larastan (Laravel).
- mongodb-memory-server, Supertest (Node).
- k6, autocannon (load).

## Current Notes
- The frontend has pre-existing CRA lint warnings that fail with `CI=true npm run build`; build is run with `CI=false` until the warnings are remediated (tracked in `TODO.md`).
- `npm audit` reports advisories largely from CRA's transitive `react-scripts` chain; remediation plan tracked in `TODO.md` and `PROJECT_STATUS.md`.
