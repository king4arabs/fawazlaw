# Architecture

## System Overview
Fawazlaw.sa is a Saudi-first LegalTech platform combining a public marketing/legal-content website with API services that power admin tooling, articles, services, payments, and future client portal capabilities. The repository is a polyglot monorepo composed of three independently deployable applications.

## Detected Architecture
| Layer    | Application        | Tech                                                     | Status |
|----------|--------------------|----------------------------------------------------------|--------|
| Frontend | `UI-WEB/frontend`  | React 18, Create React App, Tailwind CSS, DaisyUI, react-router, react-helmet, i18next | Active |
| API      | `API-Node`         | Node 18+, Express, MongoDB/Mongoose, JWT, bcrypt, Multer, MyFatoorah toolkit | Prototype |
| API      | `API-BACKEND/api`  | Laravel 10, Sanctum, Swagger (l5-swagger), MyFatoorah package | Active |
| CI       | `.github/workflows`| GitHub Actions                                            | Hardening |

## Frontend Architecture
- Single-page application bootstrapped by Create React App.
- Routing via `react-router-dom`; static SEO pages preferred for top legal service queries.
- Styling via Tailwind CSS + DaisyUI; Arabic-first RTL with LTR support where needed.
- SEO via `react-helmet` (title, meta, OG/Twitter, canonical) and global `sitemap.xml`, `robots.txt`, `manifest.json` in `public/`.
- i18n scaffolding via `i18next` / `react-i18next`; default language Arabic.
- Rich text editing via Tiptap, Quill, Draft.js (admin/back-office paths only).

## Backend Architecture (Laravel — primary)
- Laravel 10 REST API with Sanctum-based token auth.
- Domain modules detected: services, articles, contact, payments (MyFatoorah).
- Swagger / OpenAPI generation via `l5-swagger`.
- MyFatoorah for Saudi-region payment processing.

## Backend Architecture (Node — prototype)
- Express API focused on admin auth, articles, services, payment intents, and customer records.
- MongoDB persistence via Mongoose.
- JWT auth + bcrypt password hashing.
- Multer for upload handling.

## Data Architecture
- Laravel API: relational DB (MySQL/PostgreSQL) via Eloquent migrations.
- Node API: MongoDB document store.
- Static content (pages, structured data) lives in the frontend.
- No client document storage is yet implemented; planned via encrypted object storage with access control.

## Auth Architecture
- Laravel: Sanctum personal access tokens for admin/internal flows.
- Node: JWT bearer tokens with bcrypt-hashed credentials.
- Public website: anonymous; CTAs route to WhatsApp/contact, app portal redirects to `app.fawazlaw.sa`.

## API Architecture
- REST over HTTPS, JSON request/response.
- Versioning convention to be added: prefix routes with `/api/v1/`.
- Public consumer surface is currently small; most endpoints are admin/internal.
- See `docs/api/` for endpoint inventory and planning.

## AI Architecture (Planned / Partial)
- Public site references an AI legal assistant as a *support* tool, not legal advice.
- Recommended pattern: RAG over a curated Arabic Saudi legal knowledge base, with human review for any client-facing output. See `SKILLS/ai.md`.

## Integration Architecture
- Payments: MyFatoorah (Saudi/GCC).
- Email: provider TBD (Resend / SES recommended).
- Analytics/monitoring: provider TBD (GA4 + Sentry recommended).
- Government APIs (Nafath, ZATCA, Absher, Najiz): planned only.

## Deployment Architecture
- Frontend: static build, served via CDN-backed host (Vercel/Netlify/Cloudflare Pages) with SPA fallback to `index.html`.
- Laravel API: PHP-FPM behind Nginx, or managed platform (Forge/Render); MySQL or PostgreSQL with daily backups.
- Node API: Node 18/20 runtime on Render/Railway/AWS; MongoDB Atlas for managed persistence.

## Security Architecture
See `SECURITY.md`. Highlights: HTTPS only, strict security headers, CORS allowlist per environment, secrets via host secret manager, dependency audits in CI, rate limiting on auth/payment endpoints, audit logs for admin actions.

## Scalability Notes
- Frontend scales horizontally via CDN — practically unlimited for static assets.
- Laravel API scales vertically/horizontally behind a load balancer; cache hot reads (services, articles) in Redis.
- Node API is prototype-class; treat MongoDB indexes and connection pooling as the first scalability work.
- AI workloads must be gated by per-user/per-IP rate limits.

## Architecture Risks
1. Two parallel API stacks (Node + Laravel) create duplication; choose primary and deprecate the other.
2. CRA is in maintenance mode; future migration to Vite or Next.js (with SSR/ISR) would unlock real Lighthouse and SEO gains.
3. No formal OpenAPI contract published; client and server can drift.
4. Dependency audit shows pre-existing high/critical advisories that need remediation tracking.
5. No formal observability layer yet (Sentry, structured logs, uptime).

## Recommended Future Architecture
- Single primary API (Laravel) with the Node service either retired or repurposed as a dedicated microservice (e.g., AI assistant).
- Migrate frontend to Next.js (App Router) for SSR/ISR, native i18n routing (`/ar`, `/en`), per-route metadata, and edge caching.
- Introduce Redis cache for services/articles and rate limiting.
- Adopt OpenAPI as the API source of truth; generate TypeScript and PHP SDKs.
- Add Sentry, structured logs (pino/Monolog), and an uptime monitor.
- Adopt a feature-flag service for safe rollouts of client portal modules.
