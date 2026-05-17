# Version

## Current
- **Version:** v0.3.0
- **Release Date:** 2026-05-17
- **Release Name:** Production Build & Deployment
- **Stability:** Beta — production website is live; release tooling, build verification, and deployment runbooks are hardened for fawazlaw.sa.

## Semantic Versioning Policy
This repository follows [Semantic Versioning 2.0.0](https://semver.org/):
- **MAJOR** — breaking changes to public APIs, deployment topology, or contractually exposed interfaces.
- **MINOR** — backward-compatible new features, content surfaces, or meaningful structural/standards upgrades.
- **PATCH** — bug fixes, documentation-only updates, and small non-breaking improvements.

## Version History
| Version | Date       | Highlights |
|---------|------------|------------|
| v0.3.0  | 2026-05-17 | Production build & deployment readiness for fawazlaw.sa: frontend `package.json` aligned to release version, verified production build, release notes, deployment posture confirmed across frontend + Node API + Laravel API. |
| v0.2.0  | 2026-05-17 | Repository operating system: full root docs, SKILLS playbooks, `docs/` tree, BENCHMARK, CI fix to `UI-WEB/frontend`. |
| v0.1.0  | 2026-05-17 | Initial audited baseline; Arabic-first homepage, SEO service pages, sitemap/robots/manifest, AI assistant safeguards. |

## Upgrade Notes (v0.2.0 → v0.3.0)
- No runtime/code breaking changes. No production routes, components, or content removed.
- `UI-WEB/frontend/package.json` `version` is now `0.3.0` to track the repository release. If you depend on the previous `0.1.0` value programmatically, update your reference.
- Production builds remain `CI=false npm run build` from `UI-WEB/frontend`; CRA lint warnings are still tolerated and tracked in `TODO.md`.
- Laravel API (`API-BACKEND/api`) and Node API (`API-Node`) are unchanged at the source level; deploy them only when their respective contracts change.
- Follow `docs/runbooks/release.md` and `DEPLOYMENT.md` for cut + deploy of this release.

## Upgrade Notes (v0.1.0 → v0.2.0)
- No runtime/code breaking changes.
- CI workflow now targets `UI-WEB/frontend`; if you had local forks of `node.js.yml`, re-pull.
- All `SKILLS/*.md` files have been replaced with full playbooks; downstream consumers should re-read.
- New documentation tree under `docs/` is the source of truth for deep guides.
