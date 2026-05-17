# Backend Playbook

## Purpose
Build and operate the Laravel and Node APIs that power Fawazlaw.sa's content, admin, payments, and (future) client portal. Backends must be correct, safe, observable, and PDPL-aware.

## Standards
- REST over HTTPS, JSON in/out. New endpoints live under `/api/v1/`.
- Validate every external input on the server (Laravel Form Requests; Node `zod`/`joi`). Reject extra fields.
- Use repository/service layers — controllers stay thin (routing + validation + delegation).
- Every error returns a consistent envelope: `{ "error": { "code": "string", "message": "string", "details": [] } }` with a stable HTTP status.
- All write endpoints are idempotent where possible (use idempotency keys for payments and webhooks).
- All admin actions are written to an audit log (actor, action, resource, before/after, IP, timestamp).
- Secrets via env only; never logged.

## Checklist (before opening a PR)
- [ ] New endpoint has request validation, authorization, and tests (when test suite exists).
- [ ] No PII in logs or error responses.
- [ ] Response envelope matches the standard.
- [ ] Rate limits applied to write/auth endpoints.
- [ ] OpenAPI spec updated (or planning doc updated until OpenAPI lands).
- [ ] Migrations are reversible.

## Best Practices
- Prefer Laravel for new feature work until ADR formally chooses a single API stack.
- Use database transactions for multi-write operations.
- Use queues (Laravel queues, BullMQ) for slow or external-network work (email, webhooks, AI calls).
- Cache hot read paths (services, articles) in Redis with explicit TTLs.
- Use feature flags to dark-launch risky changes.

## Common Mistakes to Avoid
- Trusting client-side validation as a security boundary.
- Returning raw model dumps — always use a resource/serializer.
- Catching and silently swallowing exceptions.
- Hand-rolling auth — use Sanctum (Laravel) or a vetted JWT lib (Node).
- Storing files locally on the application server in production.
- Performing destructive operations without a backup verified within 24 hours.

## Project-Specific Implementation Guidance
- Payments integrate via MyFatoorah; verify webhook signatures and treat the webhook as the source of truth.
- Article and service endpoints must include `lang` and respect `dir`.
- Admin endpoints require Sanctum (Laravel) or a JWT verified middleware (Node) plus an authorization policy check.
- Any AI-call-issuing endpoint must have per-user and per-IP rate limits.

## Recommended Tools
- Laravel: Pint (formatter), Larastan, Pest/PHPUnit, Telescope (dev), Horizon (queues).
- Node: ESLint, Prettier, Zod, Jest/Vitest, Supertest, pino.

## Validation Steps
```bash
# Laravel
cd API-BACKEND/api
composer install
composer audit
php artisan test            # once a suite exists

# Node
cd API-Node
npm install
npm audit --audit-level=moderate
# Syntax-only check on changed files:
node -c path/to/file.js
```

## Definition of Done
- All checklist items pass.
- Endpoint documented in `docs/api/endpoints.md` (and OpenAPI once available).
- `CHANGELOG.md` updated.
- No new high/critical advisories.
