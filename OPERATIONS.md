# Operations

## Ownership Matrix
| Area                      | Owner (role)                          | Backup                |
|---------------------------|---------------------------------------|-----------------------|
| Frontend                  | Senior Full-Stack Developer           | UI/UX Director        |
| Laravel API               | Senior Full-Stack Developer           | Software Architect    |
| Node API                  | Senior Full-Stack Developer           | Software Architect    |
| Infrastructure / CI       | DevOps Engineer                       | Senior Developer      |
| Security & PDPL           | Security Engineer                     | Compliance Advisor    |
| Content / SEO             | Marketing + Compliance Advisor        | Product Manager       |
| Client support            | Operations Lead                       | Product Manager       |
| AI assistant              | AI Engineer                           | Compliance Advisor    |

## Daily Operations
- Check uptime monitor and error tracker (Sentry/UptimeRobot).
- Review CI status on `main`; investigate any failed runs.
- Triage new issues and customer support messages within 1 business day.
- Verify the contact form, WhatsApp link, and booking CTA work end-to-end.

## Weekly Operations
- Review dependency advisories (`npm audit`, `composer audit`, Dependabot).
- Review analytics: top pages, search terms, conversion events.
- Walk the Lighthouse mobile report on home + 1 service page; track regressions.
- Review backlog and reprioritise `TODO.md`.

## Monthly Operations
- Full backup-restore drill on staging.
- Review access lists (admin users, secrets, hosting providers); remove inactive accounts.
- Quarterly forward: review `BENCHMARK.md` and update scores.
- Review and update `ROADMAP.md`, `PROJECT_STATUS.md`.

## Monitoring
- Uptime: UptimeRobot / BetterStack — public site, app portal, API health endpoints.
- Errors: Sentry for frontend + APIs.
- Performance: Lighthouse CI weekly; Web Vitals via GA4 or Plausible.
- Logs: structured JSON, centralised (Datadog/Loki/CloudWatch).

## Backups
- Database: nightly full + point-in-time recovery (where supported). Retain 30 days hot, 12 months cold.
- Object storage (when in use for client documents): versioned, with separate-account replication.
- Validate restorability monthly.

## Incident Response
See `docs/runbooks/incident-response.md`. Always:
1. Open an incident channel.
2. Assign Incident Commander.
3. Communicate status every 30 minutes.
4. Postmortem within 5 business days, recorded in `DECISIONS.md`.

## Support Workflow
- Channels: WhatsApp Business, contact form, email.
- SLA targets: first response 1 business day, resolution 3 business days for non-urgent matters; urgent legal/PDPL within 24 hours.
- All client communications are confidential — never paste case details into external tools without redaction.

## Release Workflow
See `docs/runbooks/release.md`. Summary:
1. Bump `VERSION.md`, update `CHANGELOG.md`.
2. Run pre-deployment checklist (`DEPLOYMENT.md`).
3. Tag the release `vX.Y.Z`.
4. Deploy frontend, then APIs (or coordinate when contracts change).
5. Run post-deployment checklist.
6. Announce in the team channel.

## Maintenance Workflow
- Schedule monthly dependency window (1st Wednesday of each month).
- Schedule quarterly security review.
- Schedule quarterly content review with the Compliance Advisor.
- Track all maintenance tasks in `TODO.md`.
