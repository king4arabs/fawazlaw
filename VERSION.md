# Version

- Current semantic version: v0.1.1
- Release date: 2026-05-17
- Release name: Dependency Maintenance Patch
- Stability status: Alpha / dependency security and maintenance patch on top of v0.1.0

## Upgrade notes
- Run `npm ci` in `API-Node` and `UI-WEB/frontend` to pick up refreshed lockfiles.
- `multer` was upgraded to `^2.0.2`; existing usage in `controllers/servicesController.js` (`multer.diskStorage` + `multer({ storage })`) remains API-compatible.
- Real environment values must still be recreated from `.env.example` files.
- Frontend build still requires lint warning cleanup before production-grade CI can be green.
