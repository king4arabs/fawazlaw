# Fawazlaw.sa

Fawazlaw.sa is a Saudi-first LegalTech and law firm website for شركة فواز للمحاماة والاستشارات القانونية. The repository contains a React web experience, a Node/Express API, and a Laravel API backend.

## Business Context
The platform positions the firm as a premium Saudi legal services provider for individuals and companies, with digital client journeys, legal content, service pages, booking/contact CTAs, and a planned/active client platform at `app.fawazlaw.sa`.

## Current Features
- Arabic-first public website with RTL layout priority.
- Home, about, services, individual service pages, FAQ, blog/news, contact, privacy, and terms pages.
- Digital platform positioning page.
- SEO metadata, Open Graph/Twitter metadata, canonical URLs, sitemap, robots, and manifest.
- Node API models/routes for services, articles, admin auth, payment, and customers.
- Laravel API with service/article/contact/payment related resources.

## Planned Features
- Production-grade app portal hardening and role-based client document workflows.
- Automated article-to-service internal linking.
- Lighthouse/Core Web Vitals monitoring.
- CI fixes for monorepo working directories.
- Full Arabic/English/Urdu/Hindi localization if business content is approved.

## Tech Stack Detected
- Frontend: React 18, Create React App, Tailwind CSS, DaisyUI, react-router, react-helmet, i18next.
- Node API: Express, MongoDB/Mongoose, JWT, bcrypt, Multer, MyFatoorah toolkit.
- Laravel API: Laravel 10, Sanctum, Swagger, MyFatoorah package.
- CI: GitHub Actions Node workflow currently configured at repository root.

## Repository Structure
- `UI-WEB/frontend/` — React website.
- `API-Node/` — Node/Express API.
- `API-BACKEND/api/` — Laravel API.
- `.github/workflows/` — CI configuration.
- `SKILLS/` — operating guidance by discipline.

## Setup
Frontend:
```bash
cd UI-WEB/frontend
npm install
npm start
```

Node API:
```bash
cd API-Node
npm install
npm start
```

Laravel API:
```bash
cd API-BACKEND/api
composer install
cp .env.example .env
php artisan key:generate
php artisan serve
```

## Available Scripts
Frontend (`UI-WEB/frontend`):
- `npm start` — local dev server.
- `npm run build` — production build (use `CI=false` until CRA lint warnings are remediated; see `TODO.md`).
- `npm test` — Jest test runner.

Node API (`API-Node`):
- `node index.js` — start the API (no `npm start` script defined yet).

Laravel API (`API-BACKEND/api`):
- `php artisan serve` — start the API.
- `php artisan migrate` — run database migrations.
- `php artisan test` — run the test suite (once added).

## Environment Variables
Review `.env.example` files before deployment. Expected categories include API URLs, database connection strings, JWT/secrets, mail settings, and payment gateway configuration. Do not commit real secrets.

## Testing and Validation
Recommended checks:
```bash
cd UI-WEB/frontend
npm install
CI=false npm run build
CI=true npm test -- --watchAll=false
npm audit --audit-level=high
```

## Deployment
Build the frontend from `UI-WEB/frontend` and serve the static output with SPA fallback. Deploy APIs separately with hardened environment variables, HTTPS, logs, and backups.

## Security
- Keep AI legal assistant copy clearly labeled as support, not legal advice replacement.
- Protect client documents and secrets.
- Use HTTPS, security headers, CORS allowlists, and dependency audits before production.

## SEO
The frontend includes page metadata, structured data, local Saudi targeting, sitemap, robots, and manifest. Keep service pages and legal insights internally linked.

## Documentation Index
See `ARCHITECTURE.md`, `DEPLOYMENT.md`, `TESTING.md`, `SECURITY.md`, `OPERATIONS.md`, `BUSINESS_CONTEXT.md`, `MARKETING_GROWTH.md`, `ROADMAP.md`, `PROJECT_STATUS.md`, `DECISIONS.md`, `TODO.md`, `BENCHMARK.md`, and `SKILLS/`.

## Versioning
Current release: `v0.2.0`. Use semantic versioning (MAJOR.MINOR.PATCH). See `VERSION.md` and `CHANGELOG.md`.

## Benchmarks
Repository quality is benchmarked against Vercel, Stripe, Linear, GitHub, OpenAI, and Supabase-grade standards. See `BENCHMARK.md` for current scores and improvement targets.

## Repository Operating System
This repo follows a documented operating system: every standard concern (architecture, security, testing, deployment, operations, business, marketing, compliance) has a dedicated root document and a matching SKILLS playbook. Deep guides live in `docs/`. See `docs/wiki/README.md` for the index.

## Contribution Workflow
1. Create a feature branch off `main`.
2. Make focused, logically grouped commits with professional messages (`docs:`, `feat:`, `fix:`, `chore:`, `security:`, `ci:`, `test:`).
3. Run available validation (see Testing and Validation).
4. Update `CHANGELOG.md` and, if applicable, `DECISIONS.md`, `ROADMAP.md`, `TODO.md`, and `VERSION.md`.
5. Open a pull request, request review, and only deploy after approval.

## Maintainer Notes
- Primary maintainer: Fawazlaw.sa engineering team.
- Treat all client data, legal documents, and case context as confidential by default.
- Do not add unverified licenses, awards, certifications, or regulatory claims to public copy.
- Keep Arabic primary; expand languages only after approved translations.
