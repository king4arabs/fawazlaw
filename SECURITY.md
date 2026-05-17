# Security

## Security Posture
Fawazlaw.sa is a Saudi LegalTech property handling potentially confidential client communications and (in future) regulated documents. Our posture is **secure-by-default, least-privilege, audited**. Any deviation must be justified in `DECISIONS.md`.

## Threat Model
| Asset                       | Threat                                       | Primary control                                  |
|-----------------------------|----------------------------------------------|--------------------------------------------------|
| Client legal documents      | Unauthorised disclosure, modification        | Encryption at rest + in transit, RBAC, audit log |
| Admin accounts              | Credential theft, session hijack             | MFA, short-lived JWT, IP/device anomaly review   |
| Public website              | Defacement, SEO poisoning, XSS               | Static deploy, CSP, sanitised user content       |
| Payment flows               | Fraud, data exfiltration                     | MyFatoorah-hosted pages, signed webhooks, TLS    |
| AI legal assistant          | Hallucination, jailbreak, PII leakage        | RAG over curated corpus, human review, redaction |
| Build pipeline              | Supply-chain compromise                      | Pinned deps, lockfiles, `npm ci`, audit, SBOM    |

## Access Control
- Principle of least privilege for all admin roles.
- Production secrets accessible only to designated maintainers; logged on access.
- Public endpoints exposed via API gateway with documented allowlists.
- Future client portal: RBAC with `client`, `lawyer`, `paralegal`, `admin` roles, scoped by case/matter.

## Input Validation
- Validate **all** external input on the server: type, length, character set, business rules.
- Laravel: use Form Requests with explicit rules; never trust client payloads.
- Node/Express: validate with `zod` / `joi`; reject extra fields.
- Frontend validation is a UX layer, never a security boundary.
- Sanitise rich-text/HTML on write *and* on render; prefer allowlist sanitisers (e.g., DOMPurify, HTMLPurifier).

## Secrets Management
- Never commit secrets. `.env.example` is the contract; real values live in the host's secret manager.
- Rotate JWT signing keys, DB credentials, payment keys at least annually and on any suspected exposure.
- Use distinct secrets per environment (local/staging/production).
- Add `git-secrets` or `gitleaks` to CI to block accidental commits (tracked in `TODO.md`).

## API Security
- HTTPS only; reject plain HTTP at the edge.
- Strict CORS allowlist per environment — no wildcard origins in production.
- Rate limit auth (`/login`, `/register`), payment intents, and contact form: e.g., 5/min/IP for auth, 20/min/IP for general write endpoints.
- Disable verbose error responses in production; log full traces server-side only.

## Authentication Security
- Passwords: bcrypt with cost ≥ 12 (Node) / Laravel default Argon2id.
- JWT: short access TTL (≤ 15 min), refresh tokens stored httpOnly + Secure cookies, rotated on use.
- Sanctum tokens: scoped abilities; revocable from admin.
- Plan MFA (TOTP) for all admin accounts before production client portal launch.

## Authorization Security
- Enforce on every server route — never rely on hidden UI alone.
- Use policy classes (Laravel) and explicit middleware (Express) for resource-level checks.
- Add object-level checks (matter belongs to user, document belongs to case) — defeat IDOR.

## Rate Limiting
- Edge (Cloudflare WAF) for blanket abuse protection.
- Application-layer (Laravel `throttle`, `express-rate-limit`) for per-route policy.
- Aggressive limits on AI assistant endpoints (cost + abuse control).

## Headers and SSL
Recommended response headers (set at host/edge):
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://api.fawazlaw.sa; frame-ancestors 'none'`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: geolocation=(), microphone=(), camera=()`
- `X-Frame-Options: DENY` (compatibility with older browsers)
- TLS 1.2+ only; prefer 1.3.

## Dependency Security
- `npm audit` in CI (currently non-blocking; will block on `--audit-level=high` once remediated).
- `composer audit` for Laravel.
- Dependabot enabled at org level (recommended).
- Pin major versions; review minor/patch bumps in PRs.
- Track an SBOM (CycloneDX) for production artifacts.

## Logging and Audit
- Application logs: structured JSON (pino/Monolog), no PII, redact tokens.
- Audit log: every admin action (create/update/delete on services, articles, users, payments) with actor, IP, before/after diff.
- Retain access logs ≥ 90 days; audit logs ≥ 2 years (legal/regulatory baseline).
- Centralise logs (CloudWatch, Datadog, or self-hosted Grafana Loki).

## Incident Response
See `docs/runbooks/incident-response.md`. Summary:
1. **Detect** — alert from monitoring, user report, or audit anomaly.
2. **Contain** — disable affected integration, rotate secrets, isolate hosts.
3. **Eradicate** — patch root cause, validate via tests.
4. **Recover** — restore service from clean state, verify backups.
5. **Learn** — postmortem within 5 business days, record in `DECISIONS.md`.

## Saudi PDPL Considerations
- Saudi Arabia's Personal Data Protection Law (PDPL, in force) applies to personal data of residents.
- Lawful basis: capture explicit consent for marketing comms; service operations rely on contractual necessity.
- Data subject rights: provide access, correction, deletion, and objection workflows (planned in client portal).
- Data residency: prefer in-Kingdom or GCC-region hosting for production data (AWS me-central-1, STC Cloud, NEOM/Oracle KSA regions); document any cross-border transfer.
- Breach notification: SDAIA notification window obligations apply — incident runbook must trigger legal review within 24 hours of detection.
- Maintain a Record of Processing Activities (ROPA) — see `docs/compliance/pdpl.md`.

## Reporting a Vulnerability
Email `security@fawazlaw.sa` (to be configured). Do not file public issues for security reports. We will acknowledge within 2 business days.
