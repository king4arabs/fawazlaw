# API Authentication

> Status: dual today (Sanctum for Laravel, JWT for Node). Will consolidate when the primary API stack is chosen.

## Token Issuance
- `POST /api/v1/auth/login` with `{ "email", "password" }` returns `{ "access_token", "refresh_token", "expires_in" }`.
- Access tokens are short-lived (≤ 15 minutes).
- Refresh tokens are long-lived and rotated on use (one-time-use semantics).

## Token Usage
Send the access token in the `Authorization` header:
```
Authorization: Bearer <access_token>
```

## Scopes / Abilities
- `admin:services:read|write`
- `admin:articles:read|write`
- `admin:contacts:read`
- `admin:payments:read`
- `client:portal` (planned, for the client portal launch)

## Rotation and Revocation
- Tokens are revocable from the admin dashboard.
- Refresh tokens are stored httpOnly + Secure + SameSite=strict cookies (for browser clients).
- All admin tokens are rotated annually and on suspected exposure.

## MFA
MFA (TOTP) is required for all admin accounts before the client portal launches.

## Errors
| HTTP | Code                     | Meaning                                  |
|------|--------------------------|------------------------------------------|
| 401  | `auth.invalid_credentials` | Email/password incorrect.              |
| 401  | `auth.token_expired`     | Access token has expired.                |
| 401  | `auth.token_invalid`     | Access token is malformed or revoked.    |
| 403  | `auth.scope_denied`      | Token does not carry the required scope. |
| 429  | `auth.rate_limited`      | Too many attempts; back off.             |
