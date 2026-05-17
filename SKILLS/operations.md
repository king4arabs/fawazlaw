# Operations Playbook

## Purpose
Keep Fawazlaw.sa healthy, supported, observable, and recoverable across daily, weekly, and monthly cadences.

## Standards
- Every production system has a named owner and backup owner (`OPERATIONS.md`).
- Every alert routes to a human within SLA.
- Every incident generates a postmortem within 5 business days.
- Backups are tested monthly, not just configured.

## Checklist
- [ ] Uptime dashboard reviewed daily.
- [ ] Error tracker triaged daily.
- [ ] Customer support inbox triaged daily.
- [ ] Weekly Lighthouse / analytics review done.
- [ ] Monthly backup-restore drill done.

## Best Practices
- Treat "no alert" as a smell — silence often means broken alerting.
- Reduce manual work via runbooks, then automate the runbooks.
- Pre-create incident channel templates.
- Communicate status every 30 minutes during incidents — over-communicate.

## Common Mistakes to Avoid
- Heroic on-call without a written runbook (knowledge dies with the on-call).
- Skipping postmortems for "small" incidents.
- Manual production changes outside the deploy pipeline.
- Granting "temporary" prod access that becomes permanent.

## Project-Specific Implementation Guidance
- Confidential client data must never leave the firm's controlled environment without explicit consent and a documented legal basis.
- During incidents, do not paste client identifiers into shared channels — use case codes.
- The Compliance Advisor is paged for any incident that may involve client data exposure.

## Recommended Tools
- UptimeRobot / BetterStack, Sentry, Datadog / Loki / CloudWatch.
- PagerDuty / Opsgenie for on-call.
- Notion / Confluence for runbook hosting (mirror to `docs/runbooks/`).

## Validation Steps
- Quarterly tabletop exercise: simulate an incident, walk the runbook end-to-end.
- Monthly backup-restore drill on staging.
- Weekly dependency advisory review.

## Definition of Done
- All operational tasks for the cadence are checked off.
- Incidents have postmortems recorded.
- `OPERATIONS.md` and `docs/runbooks/` reflect any process change.
