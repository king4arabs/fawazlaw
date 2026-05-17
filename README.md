# Fawazlaw.sa

[![Version](https://img.shields.io/badge/version-v0.2.0-blue.svg)](./VERSION.md)
[![Stability](https://img.shields.io/badge/stability-beta-yellow.svg)](./VERSION.md)
[![Benchmark](https://img.shields.io/badge/benchmark-5.9%2F10-orange.svg)](./BENCHMARK.md)
[![License](https://img.shields.io/badge/license-Proprietary-lightgrey.svg)](#license)
[![Arabic First](https://img.shields.io/badge/locale-ar--SA%20%7C%20RTL-success.svg)](#localization)
[![CI](https://github.com/king4arabs/fawazlaw/actions/workflows/node.js.yml/badge.svg)](./.github/workflows/node.js.yml)

> **Fawazlaw.sa** is a Saudi-first LegalTech platform and law firm website for **شركة فواز للمحاماة والاستشارات القانونية**. The repository hosts a React web experience, a Node/Express API, and a Laravel API backend, governed by a documented "repository operating system" of standards, playbooks, and benchmarks.

---

## Table of Contents

- [Overview](#overview)
- [Business Context](#business-context)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Quick Start](#quick-start)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Testing & Validation](#testing--validation)
- [Deployment](#deployment)
- [Security](#security)
- [SEO](#seo)
- [Localization](#localization)
- [Benchmarks](#benchmarks)
- [Documentation Index](#documentation-index)
- [Versioning](#versioning)
- [Contribution Workflow](#contribution-workflow)
- [Maintainer Notes](#maintainer-notes)
- [Keeping This README Updated](#keeping-this-readme-updated)
- [License](#license)

---

## Overview

Fawazlaw.sa positions a premium Saudi legal services brand for individuals and companies with an Arabic-first public website, an AI-assisted legal information experience, and a planned/active client platform at `app.fawazlaw.sa`. The codebase is a **monorepo** with three deployable units:

| Unit | Path | Purpose |
|------|------|---------|
| Frontend | `UI-WEB/frontend/` | Public marketing + content website (React CRA, Tailwind, i18next). |
| Node API | `API-Node/` | Express/MongoDB prototype for services, articles, auth, payments. |
| Laravel API | `API-BACKEND/api/` | Laravel 10 API for services, articles, contact, payments. |

> ⚠️ Two API stacks coexist by design while we finalise the **primary API decision** (tracked in `DECISIONS.md` and `BENCHMARK.md`).

## Business Context

The platform positions the firm as a **premium Saudi legal services provider** with digital client journeys, legal content, service pages, booking/contact CTAs, and a planned/active client portal. Full context lives in [`BUSINESS_CONTEXT.md`](./BUSINESS_CONTEXT.md).

## Features

### Shipped
- Arabic-first public website with RTL layout priority.
- Home, about, services, individual service pages, FAQ, blog/news, contact, privacy, and terms pages.
- Digital platform positioning page.
- SEO metadata, Open Graph/Twitter metadata, canonical URLs, sitemap, robots, and manifest.
- Node API models/routes for services, articles, admin auth, payment, and customers.
- Laravel API with service/article/contact/payment resources.
- Documented "repository operating system" (root standards + `SKILLS/` playbooks + `docs/` deep guides).

### Planned
- Production-grade app portal hardening and role-based client document workflows.
- Automated article-to-service internal linking.
- Lighthouse / Core Web Vitals monitoring + axe accessibility CI.
- Playwright E2E coverage on the top user journeys.
- Full Arabic / English / Urdu / Hindi localization once content is approved.
- PDPL data-subject request workflow and audit log.
- Apple Pay + STC Pay via MyFatoorah; Saudi-region hosting decision.

See [`ROADMAP.md`](./ROADMAP.md) and [`TODO.md`](./TODO.md) for the live backlog.

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 18, Create React App, Tailwind CSS, DaisyUI, react-router, react-helmet, i18next |
| **Node API** | Node.js, Express, MongoDB / Mongoose, JWT, bcrypt, Multer, MyFatoorah toolkit |
| **Laravel API** | PHP 8.x, Laravel 10, Sanctum, Swagger (l5-swagger), MyFatoorah package |
| **CI / CD** | GitHub Actions (`.github/workflows/node.js.yml`) |
| **Tooling** | Composer, npm, ESLint, Prettier (where configured) |

## Repository Structure

```
.
├── UI-WEB/frontend/        # React website (CRA)
├── API-Node/               # Node/Express API prototype
├── API-BACKEND/api/        # Laravel 10 API
├── .github/workflows/      # CI configuration
├── SKILLS/                 # Operating playbooks by discipline
├── docs/                   # Deep guides (api, design-system, runbooks, …)
├── ARCHITECTURE.md         # System architecture
├── BENCHMARK.md            # World-class benchmark scoring
├── BUSINESS_CONTEXT.md     # Product / market context
├── CHANGELOG.md            # Release history
├── DECISIONS.md            # ADRs / key decisions
├── DEPLOYMENT.md           # Deployment guide
├── MARKETING_GROWTH.md     # Growth playbook
├── OPERATIONS.md           # Ops & ownership matrix
├── PROJECT_STATUS.md       # Snapshot of current state
├── ROADMAP.md              # Forward plan
├── SECURITY.md             # Security policy
├── TESTING.md              # Testing strategy
├── TODO.md                 # Active backlog
├── VERSION.md              # Versioning policy
└── README.md               # You are here
```

## Quick Start

**Prerequisites:** Node.js ≥ 18, npm ≥ 9, PHP ≥ 8.1, Composer ≥ 2, MongoDB (for Node API), MySQL/PostgreSQL (for Laravel API).

### Frontend

```bash
cd UI-WEB/frontend
npm install
npm start
```

### Node API

```bash
cd API-Node
npm install
node index.js
```

### Laravel API

```bash
cd API-BACKEND/api
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

## Available Scripts

**Frontend (`UI-WEB/frontend`)**
- `npm start` — local dev server.
- `npm run build` — production build (use `CI=false` until CRA lint warnings are remediated; see [`TODO.md`](./TODO.md)).
- `npm test` — Jest test runner.

**Node API (`API-Node`)**
- `node index.js` — start the API (no `npm start` script defined yet).

**Laravel API (`API-BACKEND/api`)**
- `php artisan serve` — start the API.
- `php artisan migrate` — run database migrations.
- `php artisan test` — run the test suite (once added).

## Environment Variables

Review the `.env.example` file in each unit before deployment. Expected categories:

- API base URLs and CORS allowlists.
- Database connection strings (MongoDB, MySQL/PostgreSQL).
- JWT / Sanctum secrets and token TTLs.
- Mail / SMTP configuration.
- Payment gateway configuration (MyFatoorah keys, webhook secrets).
- Optional: Sentry DSN, analytics IDs, AI provider keys.

> 🚫 **Never commit real secrets.** Use a secrets manager in production and rotate credentials on any suspected exposure.

## Testing & Validation

Run these before opening a PR:

```bash
# Frontend
cd UI-WEB/frontend
npm install
CI=false npm run build
CI=true npm test -- --watchAll=false --passWithNoTests
npm audit --audit-level=high

# Node API
cd ../../API-Node
npm ci
npm audit --audit-level=moderate
node -c index.js   # syntax-check changed JS files

# Laravel API
cd ../API-BACKEND/api
composer install
php artisan test
```

See [`TESTING.md`](./TESTING.md) for the full strategy (unit, integration, E2E, security, accessibility, performance).

## Deployment

Build the frontend from `UI-WEB/frontend` and serve the static output with SPA fallback. Deploy each API independently with hardened environment variables, HTTPS, structured logs, automated backups, and uptime monitoring. Full guidance: [`DEPLOYMENT.md`](./DEPLOYMENT.md) and `docs/deployment/`.

## Security

- Treat all client data, legal documents, and case context as **confidential by default**.
- Clearly label the AI legal assistant as **support, not a replacement for legal advice**.
- Enforce HTTPS, security response headers, CORS allowlists, rate limits, and dependency audits before production.
- Report vulnerabilities per [`SECURITY.md`](./SECURITY.md).

## SEO

The frontend includes page-level metadata, structured data, local Saudi targeting, sitemap, robots, and manifest. Keep service pages and legal insights internally linked. Track regressions with Lighthouse and the SEO checklist in `docs/growth/`.

## Localization

Arabic (RTL) is the **primary locale**. Additional languages (English, Urdu, Hindi) are gated on approved translations and SEO hreflang work. Do not ship machine-translated legal content.

## Benchmarks

The repository is benchmarked against world-class references (Vercel, Stripe, Linear, GitHub, OpenAI, Supabase, Atlassian, Notion, Saudi/GCC market, LegalTech). Latest snapshot (v0.2.0):

| Dimension | Current | Target |
|-----------|--------:|-------:|
| UX / Design polish | 6 / 10 | 9 / 10 |
| Engineering quality | 5 / 10 | 9 / 10 |
| Documentation | 8 / 10 | 9 / 10 |
| Security | 5 / 10 | 9 / 10 |
| SEO | 7 / 10 | 9 / 10 |
| Performance | 5 / 10 | 9 / 10 |
| Accessibility | 5 / 10 | 9 / 10 |
| Saudi / GCC readiness | 7 / 10 | 9 / 10 |
| AI safety | 7 / 10 | 9 / 10 |
| Developer experience | 6 / 10 | 9 / 10 |
| Operational readiness | 4 / 10 | 9 / 10 |
| Compliance (PDPL) | 6 / 10 | 9 / 10 |
| **Overall** | **5.9 / 10** | **9.0 / 10** |

Full methodology, top recommended improvements, and review cadence live in [`BENCHMARK.md`](./BENCHMARK.md).

## Documentation Index

| Topic | File |
|-------|------|
| Architecture | [`ARCHITECTURE.md`](./ARCHITECTURE.md) |
| Deployment | [`DEPLOYMENT.md`](./DEPLOYMENT.md) |
| Testing | [`TESTING.md`](./TESTING.md) |
| Security | [`SECURITY.md`](./SECURITY.md) |
| Operations | [`OPERATIONS.md`](./OPERATIONS.md) |
| Business context | [`BUSINESS_CONTEXT.md`](./BUSINESS_CONTEXT.md) |
| Marketing & growth | [`MARKETING_GROWTH.md`](./MARKETING_GROWTH.md) |
| Roadmap | [`ROADMAP.md`](./ROADMAP.md) |
| Project status | [`PROJECT_STATUS.md`](./PROJECT_STATUS.md) |
| Decisions (ADRs) | [`DECISIONS.md`](./DECISIONS.md) |
| Backlog | [`TODO.md`](./TODO.md) |
| Benchmarks | [`BENCHMARK.md`](./BENCHMARK.md) |
| Skills playbooks | [`SKILLS/`](./SKILLS) |
| Deep guides | [`docs/wiki/README.md`](./docs/wiki/README.md) |
| Changelog | [`CHANGELOG.md`](./CHANGELOG.md) |
| Versioning | [`VERSION.md`](./VERSION.md) |

## Versioning

Current release: **`v0.2.0`** (Beta). This repository follows [Semantic Versioning 2.0.0](https://semver.org/):

- **MAJOR** — breaking changes to public APIs, deployment topology, or contractually exposed interfaces.
- **MINOR** — backward-compatible new features, content surfaces, or meaningful structural/standards upgrades.
- **PATCH** — bug fixes, documentation-only updates, and small non-breaking improvements.

See [`VERSION.md`](./VERSION.md) for release history and upgrade notes, and [`CHANGELOG.md`](./CHANGELOG.md) for every change.

## Contribution Workflow

1. Create a feature branch off `main`.
2. Make focused, logically grouped commits with **Conventional Commit** prefixes: `docs:`, `feat:`, `fix:`, `chore:`, `security:`, `ci:`, `test:`, `refactor:`, `perf:`.
3. Run available validation (see [Testing & Validation](#testing--validation)).
4. Update [`CHANGELOG.md`](./CHANGELOG.md) and, if applicable, [`DECISIONS.md`](./DECISIONS.md), [`ROADMAP.md`](./ROADMAP.md), [`TODO.md`](./TODO.md), and [`VERSION.md`](./VERSION.md).
5. Open a pull request, request review, and only deploy after approval.

## Maintainer Notes

- **Primary maintainer:** Fawazlaw.sa engineering team.
- Treat all client data, legal documents, and case context as confidential by default.
- Do not add unverified licenses, awards, certifications, or regulatory claims to public copy.
- Keep Arabic primary; expand languages only after approved translations.

## Keeping This README Updated

This README is a **living document**. To keep it ready for updates:

- 🔄 **Per release** — bump the version badge, benchmark badge, the Versioning section, and the Benchmarks table to match `VERSION.md` and `BENCHMARK.md`.
- ✨ **On every PR** — if you change stack, scripts, env vars, structure, or deployment, update the matching section here in the same PR.
- 📚 **On new docs** — add new root docs / `docs/` guides to the [Documentation Index](#documentation-index).
- 🧭 **On feature ship/cut** — move items between **Shipped** and **Planned** under [Features](#features).
- 🔗 **Source of truth** — narrative summaries live here; numbers and detail live in `BENCHMARK.md`, `VERSION.md`, `CHANGELOG.md`, `ROADMAP.md`, and `TODO.md`. Keep this file aligned with them, not duplicative.
- ✅ **Review cadence** — re-read this README at the start of each monthly benchmark review (see [`OPERATIONS.md`](./OPERATIONS.md)).

## License

Proprietary — © شركة فواز للمحاماة والاستشارات القانونية (Fawazlaw.sa). All rights reserved. Contact the maintainer team for usage, partnership, or licensing inquiries.
