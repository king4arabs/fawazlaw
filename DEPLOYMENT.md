# Deployment

## Environments
- Local: developer machines with `.env` files from examples.
- Staging: production-like test environment with non-production secrets and test payment keys.
- Production: locked-down environment with HTTPS, WAF/CDN, monitoring, backups, and restricted admin access.

## Local development
Install dependencies per subproject, copy `.env.example`, run migrations where needed, and use local/test payment credentials only.

## Staging
Deploy every release candidate to staging. Validate routing, content, forms, payments, auth, logs, backups, analytics, SEO metadata, Arabic/English, and responsive behavior.

## Production
Use provider-managed secrets, HTTPS, region-aware hosting, database backups, error tracking, uptime checks, and rollback-ready artifacts.

## CI/CD process
GitHub Actions should install and validate frontend, Node API, and Laravel metadata. Add future jobs for tests, security audits, and deployment previews.

## Secrets handling
Never commit `.env`. Rotate any secret previously committed. Use GitHub/environment secrets and provider vaults.

## Rollback plan
Keep last known-good frontend artifact/API deployment. Roll back application first, then database migrations only when a tested down migration exists.

## Domain/DNS/SSL notes
Use `fawazlaw.sa` with HTTPS, HSTS after validation, DNS managed through a trusted provider, and separate staging subdomain.

## Hosting recommendations
Vercel/Cloudflare Pages for frontend, managed Laravel/Node hosting for API, managed database, regional backups, and WAF/CDN in front.

## Pre-deployment checklist
- Dependencies installed from locks.
- Tests/build pass.
- Environment variables verified.
- Payment keys in correct mode.
- Security headers and CORS checked.
- Monitoring and backups enabled.

## Post-deployment checklist
- Smoke test main routes, contact, auth, payments, admin, logs, analytics, uptime, SEO metadata, and mobile/RTL views.
