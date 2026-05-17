# Release Runbook

## Pre-release
1. Confirm scope and version bump (`VERSION.md`).
2. Update `CHANGELOG.md` (Added / Changed / Fixed / Security / Deprecated / Removed / Internal / Documentation).
3. Update `ROADMAP.md` and `PROJECT_STATUS.md` if scope shifted.
4. Open the release PR; ensure CI is green.
5. Run pre-deployment checklist from `DEPLOYMENT.md`.

## Cut
1. Merge PR to `main`.
2. Tag: `git tag vX.Y.Z -m "vX.Y.Z" && git push origin vX.Y.Z`.
3. Create release notes file: `docs/releases/vX.Y.Z.md`.

## Deploy
1. Frontend first (Vercel/Netlify/Cloudflare Pages).
2. APIs next; coordinate when contracts change (feature-flag breaking changes).
3. Run smoke tests on staging mirror first, then production.

## Post-release
1. Run post-deployment checklist (`DEPLOYMENT.md`).
2. Watch error tracker and uptime for 60 minutes.
3. Announce in the team channel.

## Rollback
See `DEPLOYMENT.md` "Rollback Plan". Rollback is a normal operation, not a failure mode.
