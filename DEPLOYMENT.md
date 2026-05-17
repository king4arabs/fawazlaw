# Deployment

## Frontend
Build from `UI-WEB/frontend` using `npm run build`. Serve the output with HTTPS, compression, caching, and SPA fallback to `index.html`.

## APIs
Deploy Node and Laravel APIs independently. Configure environment variables through the hosting provider secret manager.

## Required Production Controls
- HTTPS only.
- Security headers.
- CORS allowlist.
- Backups for databases and uploaded documents.
- Error monitoring and access logs.
