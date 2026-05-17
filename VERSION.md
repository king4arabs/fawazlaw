# Version

## Current
- **Version:** v0.2.0
- **Release Date:** 2026-05-17
- **Release Name:** Repository Operating System
- **Stability:** Beta — production website is live; supporting docs, CI, and standards are being hardened.

## Semantic Versioning Policy
This repository follows [Semantic Versioning 2.0.0](https://semver.org/):
- **MAJOR** — breaking changes to public APIs, deployment topology, or contractually exposed interfaces.
- **MINOR** — backward-compatible new features, content surfaces, or meaningful structural/standards upgrades.
- **PATCH** — bug fixes, documentation-only updates, and small non-breaking improvements.

## Version History
| Version | Date       | Highlights |
|---------|------------|------------|
| v0.2.0  | 2026-05-17 | Repository operating system: full root docs, SKILLS playbooks, `docs/` tree, BENCHMARK, CI fix to `UI-WEB/frontend`. |
| v0.1.0  | 2026-05-17 | Initial audited baseline; Arabic-first homepage, SEO service pages, sitemap/robots/manifest, AI assistant safeguards. |

## Upgrade Notes (v0.1.0 → v0.2.0)
- No runtime/code breaking changes.
- CI workflow now targets `UI-WEB/frontend`; if you had local forks of `node.js.yml`, re-pull.
- All `SKILLS/*.md` files have been replaced with full playbooks; downstream consumers should re-read.
- New documentation tree under `docs/` is the source of truth for deep guides.
