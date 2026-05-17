# Compliance Playbook

## Purpose
Operate Fawazlaw.sa in line with Saudi Personal Data Protection Law (PDPL), Saudi Bar regulations, and the firm's professional confidentiality obligations.

## Standards
- Lawful basis is documented for every category of personal data processed.
- Consent is explicit and revocable for marketing communications.
- Data subjects can exercise access, correction, deletion, and objection rights.
- Cross-border data transfers are documented and risk-assessed.
- Breach notification process to SDAIA is rehearsed; incident runbook triggers legal review within 24 hours.

## Checklist
- [ ] ROPA (Record of Processing Activities) updated for any new data flow.
- [ ] Privacy notice updated for any new processing purpose or recipient.
- [ ] Consent collection mechanism tested before launching marketing surfaces.
- [ ] DPIA (Data Protection Impact Assessment) completed for high-risk processing (AI, client portal, document storage).
- [ ] Sub-processor list reviewed quarterly.

## Best Practices
- Data minimisation: collect only what is necessary; delete on schedule.
- PII tagging in code and in the data dictionary.
- Encryption at rest for sensitive data; encryption in transit always.
- Access logs retained ≥ 2 years for audit defensibility.
- Annual review of the privacy notice and consent flows with a licensed practitioner.

## Common Mistakes to Avoid
- Pre-ticked consent boxes.
- Conflating contractual necessity with consent (different lawful bases).
- Forgetting that AI providers are sub-processors.
- Cross-border transfers without documented safeguards.
- Treating PDPL as "GDPR-lite" — they differ; obey PDPL explicitly.

## Project-Specific Implementation Guidance
- Public site collects only what's needed for contact and (where applicable) appointment scheduling.
- AI assistant interactions must be redacted of PII before sending to providers and must not be retained with raw PII.
- Future client portal: data-subject request workflow (access / correct / delete / export) is a launch requirement.
- Audit log for admin actions is an enterprise-procurement requirement.

## Recommended Tools
- Plain markdown ROPA in `docs/compliance/`.
- DPA templates from sub-processors filed in `docs/compliance/dpa/` (private mirror).
- Consent management: prefer first-party implementation over third-party widgets.

## Validation Steps
- Quarterly compliance review.
- Annual external audit (recommended pre-enterprise launch).
- Data-subject request tabletop exercise.

## Definition of Done
- `docs/compliance/pdpl.md` reflects current processing.
- Privacy notice and terms reflect current practice.
- Practitioner sign-off recorded for legal text changes.
