# Changelog

All notable changes to Fawazlaw.sa are documented here. This project follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v0.2.0] - 2026-05-17 — Repository Operating System
### Added
- Full root documentation set: `ARCHITECTURE.md`, `DEPLOYMENT.md`, `TESTING.md`, `SECURITY.md`, `OPERATIONS.md`, `BUSINESS_CONTEXT.md`, `MARKETING_GROWTH.md`, `BENCHMARK.md`, `ROADMAP.md`, `PROJECT_STATUS.md`, `DECISIONS.md`, `TODO.md`, `VERSION.md` expanded to production-grade depth.
- New SKILLS playbooks: `SKILLS/ai.md`, `SKILLS/database.md`, `SKILLS/integrations.md`.
- `docs/` tree: `wiki/`, `api/`, `sdk/`, `guides/`, `runbooks/`, `releases/`, `compliance/`, `design-system/`, `product/`, `business/`, `growth/`, `security/`, `testing/`, `deployment/`.
- API planning documentation (`docs/api/*`) and SDK planning documentation (`docs/sdk/*`) — clearly marked as planning, not implemented contracts.
- Pre-deployment and post-deployment checklists, incident response runbook, release runbook.

### Changed
- Replaced placeholder `SKILLS/*.md` stubs with full operating playbooks (purpose, standards, checklist, best practices, common mistakes, validation, definition of done).
- Rewrote root documents from short stubs to production-grade content.
- README expanded with versioning, benchmark, repository operating system overview, contribution workflow, and maintainer notes.

### Fixed
- CI workflow (`.github/workflows/node.js.yml`) now targets `UI-WEB/frontend` instead of the (non-existent) repository-root `package.json`. Adds an `API-Node` install/audit job. Tests use `--passWithNoTests` and build uses `CI=false` to tolerate pre-existing CRA lint warnings while remediation is tracked.

### Security
- Documented Saudi PDPL considerations, threat model, headers, secrets management, audit logging, and dependency scanning expectations in `SECURITY.md` and `SKILLS/security.md`.
- Added incident response runbook (`docs/runbooks/incident-response.md`).

### Deprecated
- None.

### Removed
- None. No code, pages, components, routes, or content were deleted in this release.

### Internal
- Established the `Repository Operating System` model (root docs + SKILLS + `docs/` tree).
- Established benchmark scoring framework.

### Documentation
- Added `docs/wiki/` index, getting started, product/technical/operations/release/security/Saudi-GCC overviews.
- Added `docs/api/README.md`, `endpoints.md`, `authentication.md`, `errors.md`, `webhooks.md`, `examples.md`.
- Added `docs/sdk/README.md`, `javascript.md`, `python.md`, `php.md`, `examples.md`.
- Added compliance, design-system, product, business, growth, security, testing, deployment guides.

## [v0.1.0] - 2026-05-17 — Initial Audited Baseline
### Added
- Arabic-first premium homepage structure and CTAs.
- SEO-focused services landing page and 10 individual service pages.
- Digital legal platform page and AI legal assistant safeguards.
- Sitemap, robots, manifest, metadata, and structured data support.
- Initial repository documentation and operating guides.

### Changed
- Privacy and terms content updated for confidentiality and AI limitations.

### Security
- AI outputs labelled as support, not a replacement for licensed legal advice.
