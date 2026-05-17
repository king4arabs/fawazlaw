# Changelog

All notable changes to this project are documented in this file. Format follows Keep a Changelog categories.

## [v0.1.0] - 2026-05-17
### Added
- Established repository operating system documentation across README, architecture, deployment, testing, security, operations, business, growth, roadmap, status, TODO, benchmark, and decisions files.
- Added practical SKILLS playbooks for frontend, backend, database, DevOps, security, QA, AI, product, business, marketing, operations, compliance, integrations, and Saudi/GCC readiness.
- Added wiki, API, and SDK documentation scaffolds with planning guidance.
- Added Node API `.env.example` and `.gitignore`.

### Changed
- Upgraded GitHub Actions workflow to target actual subprojects instead of assuming a root npm project.
- Improved frontend base metadata for Saudi legal services SEO.
- Hardened Node API defaults for CORS, request body limits, security headers, MongoDB strict query behavior, and graceful startup validation.

### Fixed
- Removed tracked runtime `.env` files from Git to prevent secret leakage.
- Removed tracked Node dependency artifacts from source control.
- Reduced sensitive logging in Node admin/payment flows.

### Security
- Upgraded frontend `swiper` from vulnerable 11.x resolution to patched `12.1.2` for prototype pollution remediation.
- Documented threat model, PDPL considerations, incident response, secrets handling, and dependency scanning expectations.
- Added baseline dependency audit findings to project status.

### Deprecated
- Deprecated tracking generated dependency folders in Git.

### Removed
- Removed committed `API-Node/node_modules` and runtime `.env` files because dependencies and secrets should be generated locally or in CI.

### Internal
- Documented current validation failures and next remediation priorities.

### Documentation
- Created/updated repository operating system, SKILLS, benchmark, wiki, API, SDK, runbook, compliance, security, testing, deployment, product, business, and growth documentation.
