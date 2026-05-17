# Security Playbook

## Purpose
Operate Fawazlaw.sa with secure-by-default engineering practices appropriate to a Saudi LegalTech property handling confidential client data.

## Standards
- HTTPS only; HSTS preload enabled.
- Strict CSP, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options: DENY`.
- Secrets only via the host's secret manager. `.env.example` is the contract.
- All admin auth uses MFA before client portal launch.
- All admin actions are written to an immutable audit log.
- Dependency advisories: `npm audit` and `composer audit` run in CI; high/critical block release once remediated.

## Checklist
- [ ] No secret in code, in tests, or in logs.
- [ ] All new endpoints have validation, authorization, and a rate limit policy.
- [ ] No new high/critical dependency advisories introduced.
- [ ] Response headers reviewed on touched routes.
- [ ] PII added/removed reflected in the PDPL ROPA.
- [ ] Threat model reviewed for new feature (`SECURITY.md`).

## Best Practices
- Default-deny in CORS, auth, and authorization.
- Use parameterised queries / ORM — never string-interpolated SQL.
- Sanitise rich-text on both write and render with an allowlist sanitiser.
- Use httpOnly + Secure + SameSite cookies for session/refresh tokens.
- Short-lived JWT access tokens (≤ 15 minutes); rotate refresh tokens on use.
- Lock down `.git`, `.env`, backups, and any `.bak` from public web serving.

## Common Mistakes to Avoid
- "Just for now" wildcards in CORS or in CSP.
- Storing secrets in repo variables marked public.
- Logging full request bodies (PII / tokens leak).
- Hand-rolling crypto or password hashing.
- IDOR by trusting client-provided resource IDs without an object-level check.

## Project-Specific Implementation Guidance
- AI assistant endpoints: aggressive per-user and per-IP rate limits; redact PII before sending to model providers; never persist raw prompts/responses containing client data without explicit consent.
- Payment endpoints: verify MyFatoorah webhook signatures; treat webhook as source of truth; use idempotency keys.
- Admin routes: Sanctum/JWT + policy check + audit log entry.

## Recommended Tools
- Gitleaks, Dependabot, Renovate, OWASP ZAP (DAST), Snyk/Trivy (deps + containers).
- Sentry (errors), centralised log host (Datadog/Loki/CloudWatch).
- Cloudflare WAF + rate-limiting rules.

## Validation Steps
```bash
# Frontend deps
cd UI-WEB/frontend && npm audit --audit-level=high
# Node API deps
cd API-Node && npm audit --audit-level=moderate
# Laravel deps
cd API-BACKEND/api && composer audit
```
- Verify response headers with `curl -I`.
- Manual IDOR/authorization smoke test on touched admin endpoints.

## Definition of Done
- All checklist items pass.
- Threat model section updated in `SECURITY.md` if the surface changed.
- Incident response runbook still applies; updated if not.
