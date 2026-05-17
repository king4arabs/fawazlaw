# Security

## Security posture
Security is improved from baseline but not production-complete. Secrets and generated dependencies were removed from source control and Node API defaults were hardened.

## Threat model
Primary risks: data leakage from legal inquiries, payment misuse, admin account compromise, dependency vulnerabilities, insecure CORS, injection attacks, XSS, broken access control, and insufficient auditability.

## Access control
Use least privilege, strong admin auth, MFA where supported, role-based permissions, short-lived sessions, and audit logs for content/payment/admin actions.

## Input validation
Validate and sanitize all contact, auth, article, service, payment, and upload inputs server-side. Enforce request size limits.

## Secrets management
Use provider secrets. Never commit `.env`, API keys, JWT secrets, database credentials, or payment credentials. Rotate any exposed secret.

## API security
Use HTTPS, strict CORS, rate limiting, JSON limits, schema validation, auth middleware, consistent errors, and request IDs.

## Authentication security
Hash passwords, avoid logging credentials, use strong JWT/Sanctum settings, rotate secrets, and add MFA for admins.

## Authorization security
Protect all admin mutations. Verify ownership/role before reads and writes. Avoid trusting client-provided IDs for sensitive actions.

## Rate limiting
Add rate limits to login, contact, payment, upload, and webhook endpoints.

## Headers and SSL
Use HTTPS, HSTS after validation, CSP, X-Content-Type-Options, frame protections, referrer policy, and strict transport settings.

## Dependency security
Run npm/composer audits. Upgrade vulnerable packages promptly and document exceptions.

## Logging and audit
Log security-relevant events without sensitive payloads. Keep immutable audit logs for admin, payment, and client inquiry events.

## Incident response
Triage severity, contain issue, rotate secrets, patch, validate, notify stakeholders where required, document timeline, and add prevention tasks.

## Saudi PDPL considerations
Collect minimum personal data, disclose purpose, protect confidentiality, define retention/deletion, restrict access, document processors, and prepare breach response evidence.
