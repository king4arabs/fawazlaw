# Project Status

_Last updated: 2026-05-17 (v0.2.0)_

## Repository Health
| Area                  | Status        | Notes |
|-----------------------|---------------|-------|
| Documentation         | 🟢 Strong     | Full root + SKILLS + `docs/` tree as of v0.2.0. |
| CI / CD               | 🟡 Improving  | Workflow now scoped to `UI-WEB/frontend` + `API-Node`; PHP CI still missing. |
| Frontend build        | 🟡 Tolerated  | Builds with `CI=false` (CRA lint warnings); needs cleanup. |
| Frontend tests        | 🟡 Stub       | Default CRA tests; needs real coverage. |
| Node API              | 🟡 Prototype  | Routes/models exist; no tests, no validation layer. |
| Laravel API           | 🟢 Active     | Sanctum + Swagger present; needs CI and audit. |
| Security posture      | 🟡 Improving  | Documented; headers, rate limits, audit logs to be enforced in infra. |
| SEO                   | 🟢 Strong     | Sitemap, robots, metadata, structured data present. |
| Accessibility         | 🟡 Unverified | No automated a11y checks yet. |
| Performance           | 🟡 Unverified | No Lighthouse CI yet. |
| Observability         | 🔴 Missing    | No Sentry / uptime / log aggregation yet. |
| PDPL compliance docs  | 🟢 Drafted    | See `docs/compliance/pdpl.md`. |

## Feature Maturity
| Feature                                | Maturity      |
|----------------------------------------|---------------|
| Public Arabic homepage                 | 🟢 Production |
| Service landing pages (10+)            | 🟢 Production |
| Digital platform positioning page      | 🟢 Production |
| Sitemap / robots / manifest            | 🟢 Production |
| AI assistant copy + safeguards         | 🟢 Production |
| Admin Node API (services/articles)     | 🟡 Prototype  |
| Laravel API (services/articles/payments) | 🟢 Active    |
| Client portal / document workflows     | 🔴 Planned    |
| Booking & payments end-to-end          | 🟡 Sandbox    |
| Bilingual (Arabic/English) content     | 🟡 Partial    |

## Technical Debt Summary
- Dual API stack (Node + Laravel) — pick a primary.
- CRA in maintenance mode — plan migration to Next.js.
- CRA lint warnings forcing `CI=false` on build.
- No formal OpenAPI contract.
- No automated accessibility/performance gates.
- Dependency advisories from CRA's transitive chain.

## Missing Files (now resolved at v0.2.0)
- ✅ Full ARCHITECTURE, DEPLOYMENT, TESTING, SECURITY, OPERATIONS, BUSINESS_CONTEXT, MARKETING_GROWTH, BENCHMARK, ROADMAP, DECISIONS, TODO, VERSION, CHANGELOG.
- ✅ SKILLS playbooks (all + new `ai.md`, `database.md`, `integrations.md`).
- ✅ `docs/wiki`, `docs/api`, `docs/sdk`, `docs/runbooks`, `docs/compliance`.

## Missing Files (still open)
- `LICENSE` (decision required).
- `CODE_OF_CONDUCT.md` and `CONTRIBUTING.md`.
- `.github/PULL_REQUEST_TEMPLATE.md`, `ISSUE_TEMPLATE/`, `dependabot.yml`.
- `SECURITY.md` GitHub-recognised security policy in `.github/` (currently at repo root, which GitHub also recognises).

## Missing Tests
- Frontend: real component/integration tests.
- Node API: any test at all.
- Laravel API: feature/unit tests.
- E2E (Playwright): not yet scaffolded.
- Accessibility (axe): not yet scaffolded.

## Missing Documentation
- Practitioner-level service write-ups for each landing page (content review).
- Internal HR onboarding doc for new developers.

## Deployment Readiness
- Frontend: ✅ static deploy ready.
- Laravel API: 🟡 needs production env hardening checklist run-through.
- Node API: 🟡 prototype; do not expose publicly until tests + validation added.

## Security Readiness
- 🟢 Documented posture.
- 🟡 Enforcement (headers, rate limits, audit logs) depends on infra setup.
- 🔴 MFA for admin not yet implemented.

## Performance Readiness
- 🟡 No Lighthouse baseline captured in CI.
- 🟡 Image optimisation coverage incomplete.

## SEO Readiness
- 🟢 Metadata, structured data, sitemap, robots, canonical URLs in place.
- 🟡 hreflang awaits English completion.

## Accessibility Readiness
- 🟡 RTL layout in place but unverified by automated tools or audit.

## Saudi / GCC Readiness
- 🟢 Arabic-first.
- 🟡 In-Kingdom hosting decision pending.
- 🟡 Local payment coverage via MyFatoorah present; Apple Pay/STC Pay enablement pending.

## Next Recommended Actions
1. Clean CRA lint warnings to restore `CI=true` build.
2. Enable Dependabot + Gitleaks; plan CRA → Next.js migration spike.
3. Add Sentry + UptimeRobot to all environments.
4. Scaffold Playwright E2E + axe accessibility CI.
5. Decide primary API stack (Laravel vs Node) and document in `DECISIONS.md`.
