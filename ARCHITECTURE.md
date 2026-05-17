# Architecture

## System overview
Fawazlaw.sa currently contains a React frontend, a Laravel API, and a Node/Express API prototype. The repository is evolving toward a production-grade bilingual Saudi LegalTech platform.

## Current detected architecture
- SPA frontend served from `UI-WEB/frontend`.
- Laravel API in `API-BACKEND/api` with Sanctum and MyFatoorah package.
- Node API prototype in `API-Node` with MongoDB/Mongoose and JWT.
- CI in GitHub Actions.

## Frontend architecture
React routes map to public pages, admin dashboard screens, services, blog, checkout, terms, and privacy. i18next exists for Arabic/English and should drive RTL/LTR direction consistently.

## Backend architecture
Two backend paths exist. Laravel appears more complete for relational API patterns, contact handling, and Sanctum auth. Node appears to be a MongoDB/payment prototype. A source-of-truth decision is required before scaling.

## Data architecture
Laravel likely uses relational migrations and Eloquent models. Node uses MongoDB models for admin, articles, services, and customers. Data ownership boundaries are not yet standardized.

## Auth architecture
Laravel uses Sanctum for API auth. Node uses JWT for admin login. Future architecture should standardize token lifetime, refresh flows, RBAC, audit logs, and admin session revocation.

## API architecture
REST-style endpoints exist for content, services, contact, auth, and payments. API docs were initialized in `docs/api` and need schemas/examples generated from implementation.

## AI architecture
No production AI integration detected. AI should be introduced only with retrieval grounding, legal disclaimers, human review, logging, and safety controls.

## Integration architecture
MyFatoorah payment integration is present. Future integrations may include email, CRM, analytics, monitoring, automation, and Saudi/GCC payment methods.

## Deployment architecture
Deployment target is not confirmed. Recommended: frontend on Vercel/Netlify or Cloudflare Pages, API on managed Laravel/Node hosting, database on managed regional service, secrets in provider vaults.

## Security architecture
Secrets must be environment-managed. Add WAF, HTTPS, secure headers, CORS restrictions, rate limiting, input validation, audit logs, dependency scans, and least-privilege access.

## Scalability notes
Separate frontend, API, database, and storage concerns. Use CDN caching for public pages/assets, queue long-running jobs, and add observability before traffic growth.

## Architecture risks
- Duplicate backend stacks.
- Tracked secrets/dependencies existed before this release.
- Weak test coverage.
- Dependency vulnerabilities.
- Build instability due lint warnings.

## Recommended future architecture
Choose one primary API platform, document API contracts, centralize auth, formalize data model, containerize deployment, add CI gates, and define observability/security baselines.
