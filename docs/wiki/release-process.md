# Release Process (Wiki)

The full runbook is `docs/runbooks/release.md`. Summary:

1. Open a release PR that bumps `VERSION.md`, updates `CHANGELOG.md`, and (if needed) `ROADMAP.md` / `PROJECT_STATUS.md`.
2. Ensure CI is green on the PR.
3. Run the **pre-deployment checklist** (`DEPLOYMENT.md`).
4. Merge to `main`.
5. Tag the release: `git tag vX.Y.Z && git push origin vX.Y.Z`.
6. Deploy frontend, then APIs (or coordinate when contracts change).
7. Run the **post-deployment checklist**.
8. Add release notes under `docs/releases/vX.Y.Z.md`.
9. Announce in the team channel.

## Versioning
- **MAJOR** — breaking change.
- **MINOR** — backward-compatible features or meaningful upgrades.
- **PATCH** — fixes and docs.
