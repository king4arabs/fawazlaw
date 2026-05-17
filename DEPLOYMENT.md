# Deployment

## Environments
| Environment | Purpose                            | URL pattern                  | Data           |
|-------------|------------------------------------|------------------------------|----------------|
| Local       | Developer machines                 | `localhost:3000` / `:8000`   | Disposable     |
| Staging     | Pre-production validation          | `staging.fawazlaw.sa` (TBD)  | Anonymised     |
| Production  | Live customer-facing               | `fawazlaw.sa`, `app.fawazlaw.sa` | Real, regulated |

## Local Development
```bash
# Frontend
cd UI-WEB/frontend
npm install
npm start                    # http://localhost:3000

# Node API
cd API-Node
npm install
node index.js                # or `npm start` if defined

# Laravel API
cd API-BACKEND/api
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve            # http://localhost:8000
```

## Staging
- Deploy from `main` after PR merge.
- Use a separate database, separate MyFatoorah test credentials, and `noindex` headers on all routes.
- Smoke-test pre-deployment checklist below.

## Production
- Deploy only from a tagged release (`vMAJOR.MINOR.PATCH`).
- Require approving review on the PR that bumps `VERSION.md`.
- Run the pre-deployment checklist; deploy frontend first, then APIs (or coordinate when contracts change).

## CI/CD Process
- GitHub Actions workflow `node.js.yml` runs on every push and PR to `main`.
- Frontend job: install → test (`--passWithNoTests`) → build (`CI=false`) → non-blocking `npm audit`.
- API-Node job: install → non-blocking `npm audit`.
- Laravel CI (PHP) is not yet configured — tracked in `TODO.md`.
- Recommended additions: Lighthouse CI, link checker, Trivy/Snyk, Playwright E2E.

## Secrets Handling
- **Never** commit `.env` or any secret. `.env.example` files are the contract.
- Production secrets live in the hosting provider's secret manager (Vercel/Netlify env vars, AWS Secrets Manager, Forge environment).
- Rotate JWT signing keys, payment API keys, and DB credentials at least every 12 months and immediately after any suspected exposure.
- See `SKILLS/security.md` and `docs/security/secrets.md`.

## Rollback Plan
1. **Frontend:** redeploy the previous successful build from the host's deployment history (Vercel/Netlify keep immutable history).
2. **Laravel API:** redeploy the previous Git tag; run `php artisan migrate:rollback` only if the failed release added migrations and you have a tested down-migration. Otherwise restore the most recent DB backup.
3. **Node API:** redeploy the previous Git tag; revert MongoDB schema by restoring backup if the failed release performed destructive writes.
4. Communicate status in the incident channel; update `docs/runbooks/incident-response.md` with the postmortem.

## Domain / DNS / SSL
- DNS managed via the registrar; recommend Cloudflare as the DNS + WAF + CDN layer.
- Apex `fawazlaw.sa` → frontend host.
- `app.fawazlaw.sa` → client portal host.
- `api.fawazlaw.sa` → Laravel API.
- All hostnames must serve over HTTPS with HSTS preload and TLS 1.2+ only.

## Hosting Recommendations
| Component   | Recommended                        | Alternative                  |
|-------------|------------------------------------|------------------------------|
| Frontend    | Vercel or Netlify                  | Cloudflare Pages             |
| Laravel API | Laravel Forge on a Saudi-region VPS (e.g., AWS me-central-1) | Render, Railway   |
| Node API    | Render or Railway                  | AWS App Runner               |
| Database    | AWS RDS me-central-1 / MongoDB Atlas Bahrain | Managed by hosting provider |
| Cache/Queue | Redis (Upstash / Elasticache)      | Self-hosted Redis            |
| CDN/WAF     | Cloudflare                         | AWS CloudFront + WAF         |

## Pre-Deployment Checklist
- [ ] CI green on the deploying commit.
- [ ] `CHANGELOG.md` updated with user-facing changes.
- [ ] `VERSION.md` bumped if scope warrants.
- [ ] No new high/critical vulnerabilities introduced (`npm audit`, `composer audit`).
- [ ] Environment variables updated in the hosting provider.
- [ ] Database migrations reviewed and reversible.
- [ ] Backups verified within the last 24 hours.
- [ ] Smoke test of contact form, WhatsApp link, service pages, app portal link.

## Post-Deployment Checklist
- [ ] Frontend loads with HTTPS, correct canonical URLs, and valid `sitemap.xml`.
- [ ] Lighthouse mobile performance/accessibility checked against the previous baseline.
- [ ] API health endpoints return 200.
- [ ] Payment sandbox transaction succeeds on staging; production sandbox key not in use.
- [ ] Error monitoring (Sentry/log host) shows no new spike.
- [ ] Update `docs/releases/` with the release note.
