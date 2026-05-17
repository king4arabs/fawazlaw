# Project Status

## Current repository health
Baseline application structure exists, but production readiness is partial. Documentation was minimal before this release; CI was pointed at the wrong project root; runtime `.env` and generated dependencies were tracked.

## Current feature maturity
- Frontend website: functional scaffold with public pages, routing, i18n, Tailwind styling, and admin views.
- Laravel API: structured API with auth, content, contact, service, payment, and category endpoints.
- Node API: prototype/service API with MongoDB and payment flow support.
- AI/SDK: not implemented; planning documentation added.

## Technical debt summary
- Multiple backend implementations need a clear source-of-truth decision.
- Mixed npm/yarn locks should be consolidated.
- Frontend build fails in CI because CRA treats many lint warnings as errors.
- Dependency vulnerabilities exist in Node API baseline.
- Tests are minimal or unavailable in this checkout.

## Missing files
Previously missing standard repository files: CHANGELOG, VERSION, PROJECT_STATUS, ROADMAP, ARCHITECTURE, DEPLOYMENT, TESTING, SECURITY, OPERATIONS, BUSINESS_CONTEXT, MARKETING_GROWTH, DECISIONS, TODO, BENCHMARK, SKILLS, wiki/API/SDK docs. They are now initialized.

## Missing tests
- Frontend lacks meaningful automated tests for pages, routes, language switching, checkout, and admin flows.
- Node API lacks unit/integration tests for auth, services, articles, and payments.
- Laravel tests were not runnable because vendor dependencies are absent in this checkout.

## Missing documentation
Detailed endpoint schemas, deployment provider-specific guides, data model diagrams, user journeys, and compliance evidence logs remain next-stage work.

## Deployment readiness
Not production-ready until secrets, domains, HTTPS, dependency vulnerabilities, CI, build warnings, backups, logging, and rollback are verified.

## Security readiness
Improved but not complete. Runtime secrets were removed from tracking, Node defaults hardened, and security docs added. Remaining work: dependency upgrades, rate limiting, centralized logging, audit trails, WAF, and PDPL evidence.

## Performance readiness
Unknown. Frontend bundle should be analyzed after lint/build cleanup. Images, fonts, code splitting, caching, and API latency require measurement.

## SEO readiness
Improved base metadata. Needs Arabic/English page-level metadata, sitemap, robots.txt, schema.org LegalService markup, canonical URLs, and content strategy execution.

## Accessibility readiness
Partial. Needs keyboard navigation checks, semantic landmarks, contrast testing, form labels, focus states, RTL/LTR review, and automated axe/Playwright coverage.

## Saudi/GCC readiness
Conceptually aligned. Needs legal terminology review, Arabic-first UX QA, PDPL controls, Saudi payment options, local hosting/regional cloud review, and GCC content expansion.

## Next recommended actions
1. Fix frontend lint/build warnings.
2. Upgrade vulnerable Node/frontend dependencies safely.
3. Select primary backend strategy and document migration/retirement path for the other implementation.

## Validation results for v0.1.0
- Root `npm ci`: failed because the repository has no root `package-lock.json`; CI was updated to run subproject checks instead.
- Frontend `npm ci`: passed.
- Frontend `npm run build`: failed because Create React App treats existing lint warnings as errors in CI. Remaining warnings include unused imports/state, `==` comparisons, missing React hook dependencies, and target blank rel issues outside the small navbar fix.
- Frontend `CI=true npm test -- --watchAll=false`: not reached in the combined command because the build failed first.
- Frontend `npm audit --audit-level=moderate`: initially failed with 34 remaining vulnerabilities, including a critical `swiper` prototype pollution advisory. `swiper` was upgraded to patched `12.1.2`, reducing the frontend audit to 33 remaining non-swiper vulnerabilities that require breaking upgrades or replacement.
- Node API `npm ci`: passed.
- Node API `npm audit --audit-level=moderate`: passed after package-lock remediation; 0 vulnerabilities reported.
- Node API syntax checks for changed files: passed.
- Laravel `composer validate --no-check-publish`: passed.
- Laravel `vendor/bin/phpunit`: not runnable in this checkout because `vendor/bin/phpunit` is missing until Composer dependencies are installed.
