# Testing

## Testing strategy
Layer tests from fast unit checks to integration, E2E, accessibility, security, and manual legal-service QA.

## Unit testing
Cover reusable components, utility functions, validation, controllers/services, and model logic.

## Integration testing
Cover API endpoints, database persistence, auth middleware, payment request construction, contact submissions, and content CRUD.

## E2E testing
Cover home, services, blog, contact, cart/payment start, admin login, article/service management, and language switching.

## Accessibility testing
Run axe/Playwright checks, keyboard-only navigation, contrast, labels, focus order, semantic landmarks, Arabic RTL and English LTR validation.

## Security testing
Run dependency audits, secret scans, auth/authorization tests, input validation tests, CORS/header checks, and payment callback validation tests.

## Performance testing
Measure Lighthouse, bundle size, image/font loading, API latency, cache headers, and Core Web Vitals.

## Manual QA checklist
- Arabic and English content quality.
- Mobile/tablet/desktop layouts.
- Legal service clarity and trust signals.
- Forms validate and show clear errors.
- Payment flow uses test mode in staging.
- Admin protected routes are not public.

## Automated QA checklist
- Frontend build/test.
- API tests.
- Composer validate/PHPUnit.
- npm audit/security checks.
- E2E smoke suite.

## Recommended tools
Jest/React Testing Library, Playwright, axe-core, PHPUnit, Laravel Pint, npm audit, Composer audit, Lighthouse CI, Sentry.
