# DevOps Playbook

## Purpose
Keep build, test, and deployment safe, fast, reproducible, and observable across the frontend and both APIs.

## Standards
- CI runs on every push and PR to `main`. A red build blocks merge.
- All deploys are tied to a Git tag (`vX.Y.Z`). No "deploy from branch" to production.
- Environments are strictly separated (local / staging / production). Secrets never cross environments.
- Infrastructure changes are reviewed; production access is least-privilege and logged.
- Rollback path is documented and rehearsed (see `DEPLOYMENT.md`).

## Checklist
- [ ] CI green on the deploying commit.
- [ ] Pre-deployment checklist (`DEPLOYMENT.md`) executed.
- [ ] Backups verified within 24 hours.
- [ ] Feature flag in place for risky changes.
- [ ] Post-deployment checklist executed and recorded.

## Best Practices
- Use `npm ci` (not `npm install`) in CI for reproducibility.
- Cache dependencies in CI keyed on lockfiles.
- Run jobs in parallel where independent (frontend / API jobs).
- Pin GitHub Actions to major version (e.g., `@v4`) and review release notes.
- Prefer managed platforms (Vercel, Forge, Render) over hand-rolled infra until volume demands it.
- Use blue/green or rolling deploys for APIs.

## Common Mistakes to Avoid
- Running `npm install` in CI (lockfile drift).
- Storing secrets in workflow files or repo variables marked "public".
- Long-running CI jobs that nobody reads — keep feedback under 10 minutes for the hot loop.
- Skipping the rollback drill ("we've never needed it").
- Deploying on Fridays without a rollback owner on call.

## Project-Specific Implementation Guidance
- Frontend job runs inside `UI-WEB/frontend` via `defaults.run.working-directory`.
- API-Node job runs inside `API-Node`; install + `npm audit` only until a test suite exists.
- PHP CI is missing (tracked in `TODO.md`); when added, run `composer install`, `composer audit`, `php artisan test`.
- Use `CI=false` for the frontend build until CRA lint warnings are remediated (tracked).

## Recommended Tools
- GitHub Actions, Dependabot, Renovate, Gitleaks, lychee (link checker).
- Vercel / Netlify (frontend), Laravel Forge (Laravel API), Render / Railway (Node API).
- Cloudflare (DNS, CDN, WAF), Sentry, UptimeRobot / BetterStack.
- Terraform (when infra grows), Docker for reproducible builds.

## Validation Steps
- Trigger CI on a throwaway branch and confirm both jobs pass.
- Deploy to staging, run the pre/post deployment checklists.
- Periodically rehearse rollback on staging.

## Definition of Done
- CI green, deploy tag created, release notes added under `docs/releases/`.
- `CHANGELOG.md` and `VERSION.md` updated.
- Monitoring shows no new error or performance regression after 60 minutes.
