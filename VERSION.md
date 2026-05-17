# Version

- Current semantic version: v0.1.0
- Release date: 2026-05-17
- Release name: Foundation Repository Operating System
- Stability status: Alpha / documentation and baseline hardening release

## Upgrade notes
- Real environment values must be recreated from `.env.example` files in local, staging, and production environments.
- Install dependencies using package managers instead of relying on committed dependency folders.
- CI now runs checks from subproject directories.
- Frontend build still requires lint warning cleanup before production-grade CI can be green.
