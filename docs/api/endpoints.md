# API Endpoints

> Inventory of known endpoints. Endpoint shapes will be ratified when the primary API stack is chosen (see `DECISIONS.md`). Until then, treat this list as a living index, not a contract.

## Public (Marketing / Content)
| Method | Path                       | Purpose                              | Auth |
|--------|----------------------------|--------------------------------------|------|
| GET    | `/api/v1/services`         | List public services                 | None |
| GET    | `/api/v1/services/{slug}`  | Get a service by slug                | None |
| GET    | `/api/v1/articles`         | List published articles              | None |
| GET    | `/api/v1/articles/{slug}`  | Get an article by slug               | None |
| POST   | `/api/v1/contact`          | Submit a contact form                | None (rate-limited, captcha) |

## Auth
| Method | Path                       | Purpose                              | Auth |
|--------|----------------------------|--------------------------------------|------|
| POST   | `/api/v1/auth/login`       | Issue session/token                  | None |
| POST   | `/api/v1/auth/logout`      | Revoke current token                 | Token |
| POST   | `/api/v1/auth/refresh`     | Rotate refresh token                 | Refresh token |

## Admin (planned consolidation)
| Method | Path                                       | Purpose                       | Auth        |
|--------|--------------------------------------------|-------------------------------|-------------|
| GET    | `/api/v1/admin/services`                   | List all services             | Admin token |
| POST   | `/api/v1/admin/services`                   | Create a service              | Admin token |
| PUT    | `/api/v1/admin/services/{id}`              | Update a service              | Admin token |
| DELETE | `/api/v1/admin/services/{id}`              | Soft-delete a service         | Admin token |
| GET    | `/api/v1/admin/articles`                   | List all articles             | Admin token |
| POST   | `/api/v1/admin/articles`                   | Create an article             | Admin token |
| PUT    | `/api/v1/admin/articles/{id}`              | Update an article             | Admin token |
| DELETE | `/api/v1/admin/articles/{id}`              | Soft-delete an article        | Admin token |
| GET    | `/api/v1/admin/contacts`                   | List contact submissions      | Admin token |
| GET    | `/api/v1/admin/payments`                   | List payment records          | Admin token |

## Payments
| Method | Path                              | Purpose                              | Auth |
|--------|-----------------------------------|--------------------------------------|------|
| POST   | `/api/v1/payments/initiate`       | Create a MyFatoorah payment session  | Token |
| POST   | `/api/v1/webhooks/myfatoorah`     | Inbound webhook from MyFatoorah      | Signature-verified |

## Health
| Method | Path           | Purpose                | Auth |
|--------|----------------|------------------------|------|
| GET    | `/api/v1/health`| Liveness + readiness   | None |
