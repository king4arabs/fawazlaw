# TODO

Living backlog. Items move between sections as priorities change.

## Critical
- [ ] Resolve CRA lint warnings so the frontend builds cleanly with `CI=true`.
- [ ] Remediate high/critical `npm audit` advisories on the frontend.
- [ ] Add MFA for all admin accounts before opening the client portal.
- [ ] Add Sentry + uptime monitoring on all production domains.

## High
- [ ] Add Gitleaks (or `git-secrets`) scan to CI.
- [ ] Enable Dependabot at the org level for this repo.
- [ ] Add PHP CI workflow (`composer install`, `composer audit`, `php artisan test`).
- [ ] Add Playwright E2E for the top 5 user journeys.
- [ ] Add axe-core accessibility checks in CI.
- [ ] Add Lighthouse CI with mobile budgets.
- [ ] Decide primary API stack (Laravel vs Node) and document in `DECISIONS.md`.
- [ ] Publish OpenAPI spec for the primary API under `docs/api/`.
- [ ] Add `.github/PULL_REQUEST_TEMPLATE.md`, `.github/ISSUE_TEMPLATE/`, `.github/dependabot.yml`.
- [ ] Decide and add `LICENSE`, `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`.

## Medium
- [ ] Add structured logging (pino / Monolog) with PII redaction.
- [ ] Add audit logging table for admin actions on services/articles/payments.
- [ ] Add image dimensions to all `<img>` tags; convert hero images to AVIF/WebP.
- [ ] Add link checker (lychee) to CI for the marketing site.
- [ ] Add a `/health` endpoint to both APIs.
- [ ] Document Saudi-region hosting decision in `DECISIONS.md`.
- [ ] Finalise PDPL ROPA in `docs/compliance/pdpl.md`.

## Low
- [ ] Add `hreflang` once English content is complete.
- [ ] Add `LocalBusiness` schema for city-specific landing pages.
- [ ] Add an Arabic legal terminology glossary under `docs/compliance/`.
- [ ] Standardise component naming and folder structure in the frontend.
- [ ] Add a contributor environment bootstrap script.

## Backlog
- [ ] Migrate frontend from CRA to Next.js (App Router).
- [ ] Containerise the APIs and add Terraform for infra-as-code.
- [ ] Client portal MVP (auth, encrypted upload, secure messaging, matter timeline).
- [ ] Apple Pay + STC Pay enablement via MyFatoorah.
- [ ] AI legal assistant v1 (RAG + human-in-the-loop review).
- [ ] GCC content variants.

## Nice-to-have
- [ ] Storybook for the design system.
- [ ] Internal `release-notes` generator from Conventional Commits.
- [ ] Anonymised case-study generator (lawyer-reviewed).
- [ ] PostHog or Mixpanel for product analytics in the client portal.

## Done (recent)
- [x] Establish repository operating system (root docs + SKILLS + `docs/`).
- [x] Fix CI workflow scope to `UI-WEB/frontend` and add `API-Node` job.
- [x] Add `BENCHMARK.md` with scoring framework.
- [x] Add new SKILLS playbooks: `ai.md`, `database.md`, `integrations.md`.
- [x] Arabic-first homepage, SEO service pages, sitemap, robots, manifest (v0.1.0).
- [x] AI assistant safeguards copy (v0.1.0).
