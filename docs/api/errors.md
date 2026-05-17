# API Errors

All errors use a consistent envelope:

```json
{
  "error": {
    "code": "resource.not_found",
    "message": "Service not found.",
    "details": []
  }
}
```

## Standard Codes
| HTTP | Code                          | Meaning                                       |
|------|-------------------------------|-----------------------------------------------|
| 400  | `request.invalid`             | Malformed request (bad JSON, missing fields). |
| 401  | `auth.unauthenticated`        | No / invalid token.                           |
| 403  | `auth.forbidden`              | Authenticated but lacks scope or policy.      |
| 404  | `resource.not_found`          | Resource does not exist or is hidden.         |
| 409  | `resource.conflict`           | State conflict (e.g., duplicate slug).        |
| 422  | `validation.failed`           | Field-level validation failed; `details` lists field errors. |
| 429  | `rate.limited`                | Rate limit exceeded; `Retry-After` header set. |
| 500  | `server.error`                | Unexpected server error; logged with a request id. |
| 503  | `server.unavailable`          | Dependency down; retry later.                 |

## Validation Errors
`422 validation.failed` includes `details`:
```json
{
  "error": {
    "code": "validation.failed",
    "message": "The request is invalid.",
    "details": [
      { "field": "email", "message": "Email must be a valid address." }
    ]
  }
}
```

## Request IDs
Every response includes `X-Request-Id`. Include it when reporting issues.

## What Errors Never Contain
- Stack traces.
- Database identifiers that leak schema (use opaque ids in client-facing errors).
- PII or secrets.
