# QA Playbook

## Purpose
Protect content accuracy, conversion paths, payment flows, accessibility, and Arabic/RTL rendering with appropriate automated and manual testing.

## Standards
- Test pyramid: many unit, fewer integration, few-but-critical E2E.
- Every bug fix ships with a regression test.
- Accessibility is a release gate, not a nice-to-have.
- Manual QA is documented; never tribal.

## Checklist (per PR)
- [ ] New code is covered by unit/integration tests when a suite exists for that area.
- [ ] Manual QA performed for visible/UX changes.
- [ ] Automated CI checks green.
- [ ] No console errors/warnings introduced in the browser.
- [ ] Accessibility quick-check (keyboard nav + axe) on touched UI.

## Best Practices
- Write tests for behaviour, not implementation details.
- Prefer integration tests for API contracts.
- Stabilise E2E by waiting on real conditions (not arbitrary timeouts).
- Use data-* attributes for stable test selectors on the frontend.
- Keep test data factories near the code they test.

## Common Mistakes to Avoid
- Snapshotting whole HTML trees (high churn, low signal).
- Asserting on CSS classes instead of behaviour.
- Leaving flaky tests in CI ("rerun if red").
- Skipping tests for "small" fixes.
- Manual QA on production instead of staging.

## Project-Specific Implementation Guidance
- E2E (Playwright, planned) must cover: contact form, WhatsApp link, service page CTA, app portal link, admin login, sandbox payment.
- Accessibility checks must run on the Arabic (RTL) version of every public route.
- Regression suite re-runs the previous month's bug fixes before each release.

## Recommended Tools
- Jest, React Testing Library, MSW (frontend).
- Pest/PHPUnit (Laravel), Jest/Vitest + Supertest (Node), mongodb-memory-server.
- Playwright (E2E), axe-core (a11y), Lighthouse CI (perf/SEO).

## Validation Steps
```bash
cd UI-WEB/frontend
CI=true npm test -- --watchAll=false --passWithNoTests
CI=false npm run build
```

## Definition of Done
- All automated tests green.
- Manual QA log attached to the PR for UX changes.
- Accessibility regressions on touched UI fixed or explicitly waived in the PR.
