# Architecture

The repository is a multi-application codebase:

- `UI-WEB/frontend`: React SPA for the public website.
- `API-Node`: Express API for admin, articles, services, payments, and customer-related models.
- `API-BACKEND/api`: Laravel API with service, article, contact, payment, and Swagger-related resources.

The frontend currently consumes service/article APIs in legacy components and now also includes static SEO service pages for reliable public indexing.
