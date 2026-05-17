# Incident Response Runbook

## Severity Levels
| Sev | Definition                                                        | Response                   |
|-----|-------------------------------------------------------------------|----------------------------|
| 1   | Site down, confirmed data exposure, payments halted               | Immediate, all hands       |
| 2   | Major degradation, partial outage, intermittent payment failures  | < 30 min, on-call + lead   |
| 3   | Minor degradation or limited user impact                          | Same business day          |
| 4   | Cosmetic / non-functional                                         | Next business day          |

## Workflow
1. **Detect** — alert from monitoring, user report, or audit anomaly.
2. **Open** incident channel; assign Incident Commander.
3. **Contain** — disable affected integration, rotate secrets, isolate hosts.
4. **Communicate** — status update every 30 minutes (Sev1/2).
5. **Eradicate** — patch the root cause; validate via tests.
6. **Recover** — restore service; verify from clean state.
7. **Postmortem** — within 5 business days; recorded in `DECISIONS.md`.

## Data Exposure
If confidential client data may have been exposed:
- Page the Compliance Advisor immediately.
- Preserve evidence (logs, snapshots, access trails).
- Begin SDAIA notification clock (PDPL); legal review within 24 hours.
- Do not communicate externally until the Compliance Advisor approves messaging.

## Templates
Keep incident channel and status-update templates pinned in the team workspace; mirror in `docs/runbooks/templates/` (planned).

## Drills
Tabletop exercise quarterly; backup-restore drill monthly.
