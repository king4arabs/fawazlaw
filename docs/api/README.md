# API Documentation

> **Status:** Planning + partial. Fawazlaw.sa exposes admin/internal APIs via two stacks today (Laravel and Node). A consolidated public API surface and OpenAPI specification are planned. This documentation describes what exists and what is intended; it does **not** invent endpoints.

## Stacks
| Stack       | Path              | Status      | Auth                   |
|-------------|-------------------|-------------|------------------------|
| Laravel API | `API-BACKEND/api` | Active      | Sanctum (token)        |
| Node API    | `API-Node`        | Prototype   | JWT bearer             |

## Conventions (target)
- Base URL: `https://api.fawazlaw.sa/api/v1`
- Transport: HTTPS only.
- Content type: `application/json; charset=utf-8`.
- Authentication: `Authorization: Bearer <token>` (Sanctum or JWT depending on stack).
- Error envelope: `{ "error": { "code": "string", "message": "string", "details": [] } }`.
- Pagination: `?page=1&per_page=20`; response includes `meta.pagination`.
- Localisation: `?lang=ar|en` (default `ar`).

## Files
- `endpoints.md` — inventory of endpoints (current + planned).
- `authentication.md` — token issuance, scopes, rotation.
- `errors.md` — error codes and meanings.
- `webhooks.md` — inbound webhook handling (MyFatoorah today; more later).
- `examples.md` — copy-pasteable cURL examples.

## Future
- OpenAPI 3.1 specification under `docs/api/openapi.yaml`.
- Versioned reference site published at `https://docs.fawazlaw.sa`.
