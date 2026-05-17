# Fawazlaw.sa

Fawazlaw.sa is a Saudi-first LegalTech and law firm digital ecosystem for presenting legal services, publishing legal content, handling client inquiries, and preparing secure digital service and payment workflows.

## Business purpose
Fawazlaw.sa supports client acquisition, legal service education, consultation intake, and operational readiness for a Saudi law practice. The repository should grow into a bilingual Arabic/English platform with strong confidentiality, compliance, trust, and conversion standards.

## Saudi/GCC LegalTech positioning
- Arabic-first legal services experience with English support.
- Saudi market focus with GCC expansion readiness.
- LegalTech trust priorities: confidentiality, clear service descriptions, reliable payments, auditability, and PDPL-aware data handling.

## Core features detected
- React client website with Arabic/English i18n scaffolding.
- Public pages for home, services, blog, FAQ, contact, terms, and privacy.
- Admin dashboard routes for articles and services.
- Laravel API backend with Sanctum, service/article/contact/payment endpoints, and MyFatoorah integration.
- Node/Express API prototype with MongoDB, JWT admin auth, service/article/payment routes, and MyFatoorah payment session calls.

## Tech stack detected
- Frontend: React 18, Create React App, React Router, TailwindCSS, DaisyUI, i18next/react-i18next, react-helmet.
- Backend: Laravel 10/PHP 8.1, Sanctum, Swagger package, MyFatoorah Laravel package.
- Backend prototype: Node.js, Express 4, MongoDB/Mongoose, JWT, bcryptjs, multer, MyFatoorah toolkit.
- CI/CD: GitHub Actions Node workflow, upgraded to run subproject checks.
- Package managers: npm and Composer. Yarn lock files also exist and should be consolidated later.

## Folder structure
```text
API-BACKEND/api/      Laravel API application
API-Node/             Node/Express API prototype
UI-WEB/frontend/      React frontend application
docs/                 Repository operating documentation
SKILLS/               Cross-functional execution playbooks
.github/workflows/    CI automation
```

## Local setup
### Frontend
```bash
cd UI-WEB/frontend
npm ci
npm start
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

### Node API prototype
```bash
cd API-Node
npm ci
cp .env.example .env
npm start
```

## Environment variables template
See `API-Node/.env.example` and `API-BACKEND/api/.env.example`. Keep real `.env` files out of Git. Minimum Node API values:

```text
PORT=3001
MONGODB_URI=mongodb://localhost:27017/fawazlaw
JWT_SECRET=change-me-with-a-long-random-secret
MYFATOORAH_API_KEY=change-me
FRONTEND_ORIGIN=http://localhost:3000
NODE_ENV=development
```

## Development commands
- Frontend: `npm start` from `UI-WEB/frontend`.
- Frontend build: `npm run build` from `UI-WEB/frontend`.
- Frontend tests: `CI=true npm test -- --watchAll=false` from `UI-WEB/frontend`.
- Node API: `npm start` from `API-Node`.
- Node API audit: `npm audit --audit-level=moderate` from `API-Node`.
- Laravel validation: `composer validate --no-check-publish` from `API-BACKEND/api`.
- Laravel tests: `vendor/bin/phpunit` after Composer dependencies are installed.

## Testing commands
Run available checks per subproject. Current baseline has frontend lint warnings that fail production builds under CI and missing Laravel vendor dependencies in this checkout; see `PROJECT_STATUS.md`.

## Build/deployment commands
- Frontend production build: `cd UI-WEB/frontend && npm run build`.
- Laravel production preparation: `composer install --no-dev --optimize-autoloader`, configure `.env`, run migrations, cache config/routes.
- Node API production start: `node app.js` behind a process manager or container.

## Security notes
- Real `.env` files must not be committed.
- Use strong JWT secrets, restricted CORS origins, HTTPS, secure headers, rate limiting, dependency audits, and production logging without sensitive payloads.
- Payment and legal inquiry flows must be reviewed for Saudi PDPL and confidentiality obligations before production use.

## Contribution workflow
1. Audit current behavior before changing code.
2. Make small, documented changes.
3. Update relevant docs, changelog, status, roadmap, and decisions.
4. Run available validation.
5. Commit with conventional, professional messages.

## Documentation index
- `ARCHITECTURE.md` — architecture overview and risks.
- `DEPLOYMENT.md` — deployment environments and checklists.
- `TESTING.md` — QA strategy and validation standards.
- `SECURITY.md` — security posture and threat model.
- `OPERATIONS.md` — operational runbooks and ownership.
- `BUSINESS_CONTEXT.md` — market, positioning, and strategic context.
- `MARKETING_GROWTH.md` — SEO, content, analytics, and growth.
- `DECISIONS.md` — architecture decision records.
- `SKILLS/README.md` — cross-functional playbook index.
- `docs/wiki/README.md`, `docs/api/README.md`, `docs/sdk/README.md` — expandable knowledge base.

## Current version
v0.1.1 — Dependency Maintenance Patch, 2026-05-17 (foundation release v0.1.0 also dated 2026-05-17).

## Maintainer notes
Prioritize build stability, dependency hygiene, bilingual UX quality, Saudi/GCC compliance readiness, and high-trust legal service content before adding large new features.
