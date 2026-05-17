# Security Guide (Wiki)

See `SECURITY.md` and `SKILLS/security.md` for full detail. Highlights:

- HTTPS only; HSTS preload.
- Strict CSP and security headers (see `SECURITY.md`).
- MFA required for all admin accounts (target before client portal launch).
- All secrets in the host secret manager; rotation policy documented.
- `npm audit` / `composer audit` reviewed in CI.
- Incident response within 24 hours of detection; SDAIA notification per PDPL where applicable.

## Reporting a Vulnerability
Email `security@fawazlaw.sa` (to be configured). Do not file public issues for security reports.
