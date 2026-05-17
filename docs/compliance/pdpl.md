# PDPL Readiness

> **Status:** Drafted, not externally audited. This file tracks Fawazlaw.sa's posture under Saudi Arabia's Personal Data Protection Law (PDPL) and supports the firm's Record of Processing Activities (ROPA).

## Roles
- **Data Controller:** شركة فواز للمحاماة والاستشارات القانونية.
- **Data Processors / Sub-Processors:** hosting providers, payment processor (MyFatoorah), email provider (TBD), analytics provider (TBD), AI model provider (TBD). Maintain a current list in `docs/compliance/sub-processors.md` (planned).

## Lawful Bases (current)
| Processing                                  | Lawful basis                           |
|---------------------------------------------|----------------------------------------|
| Contact form submission                     | Consent + pre-contractual necessity    |
| Service delivery (engaged clients)          | Contractual necessity                  |
| Payment processing                          | Contractual necessity                  |
| Marketing communications                    | Consent (explicit, revocable)          |
| Analytics (aggregated, non-identifying)     | Legitimate interest (with opt-out)     |
| AI assistant interactions                   | Consent (explicit per session)         |

## Data Subject Rights
The firm provides access, correction, deletion, and objection rights:
- Today: handled manually via email to a designated address.
- Planned (client portal launch): self-serve workflow with audit log.

## Cross-Border Transfers
- Hosting region currently TBD; production data preference is in-Kingdom (AWS me-central-1, STC Cloud) or GCC-region.
- Any cross-border transfer is documented with the safeguards used (contractual clauses, processor commitments, encryption in transit and at rest).

## Breach Notification
- Detection → Compliance Advisor within 1 hour.
- Legal review within 24 hours of detection.
- SDAIA notification per PDPL requirements (timing depends on severity and confirmation).
- Affected data subjects notified per regulator guidance.

## ROPA (Record of Processing Activities — abbreviated)
| Activity              | Data categories          | Recipients            | Retention                  |
|-----------------------|--------------------------|-----------------------|----------------------------|
| Contact form          | Name, phone, message     | Firm intake team      | 24 months                  |
| Engagement records    | Identity, matter details | Engaged practitioners | Per regulatory minimum     |
| Payment records       | Transaction metadata     | Finance, MyFatoorah   | 10 years (tax/regulatory)  |
| Marketing list        | Email, opt-in proof      | Marketing             | Until opt-out, then 12 months |
| Analytics             | Aggregated traffic data  | Marketing             | 26 months                  |
| AI assistant logs     | Redacted prompts/responses | AI team             | 90 days then purged        |

## Outstanding (tracked in `TODO.md`)
- Final sub-processor list and DPAs filed.
- DPIA for the client portal launch.
- DPIA for AI assistant v1.
- External PDPL audit pre-enterprise launch.
