# Technical Overview

Summary of how Fawazlaw.sa is built. The source of truth is `ARCHITECTURE.md`.

## Repository Layout
- `UI-WEB/frontend/` — React 18 (CRA) + Tailwind + DaisyUI public website.
- `API-Node/` — Express + MongoDB API (prototype, admin-focused).
- `API-BACKEND/api/` — Laravel 10 + Sanctum + Swagger API (primary candidate).
- `.github/workflows/` — GitHub Actions CI.
- `SKILLS/` — discipline playbooks.
- `docs/` — deep documentation and wiki.

## Key Choices
- **Arabic-first, RTL-first** UX; English added per-route where translated.
- **Static SEO pages** for top legal queries (reliable indexing and performance).
- **Two API stacks today**, primary stack to be ratified in `DECISIONS.md`.
- **MyFatoorah** for Saudi-region payments.
- **AI as support**, never as a substitute for licensed legal advice.

## Build, Test, Deploy
See `DEPLOYMENT.md` and `TESTING.md`.

## Observability
Planned: Sentry + uptime + structured logs. See `OPERATIONS.md` and `ROADMAP.md`.
