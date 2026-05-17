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
Frontend:
- `npm start`
- `npm run build`
- `npm test`

Root Vite package:
- `npm run dev`
- `npm run build`

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
Current release: `v0.1.0`. Use semantic versioning.

## Contribution Workflow
Create a branch, make focused commits, run available validation, document user-facing changes in `CHANGELOG.md`, and request review before production deployment.
