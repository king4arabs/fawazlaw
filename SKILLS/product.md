# Product Playbook

## Purpose
Run product discovery, prioritisation, and delivery for Fawazlaw.sa so we ship the highest-value work for Saudi legal clients while protecting professional standards.

## Standards
- Every shipped feature has a one-page spec: problem, user, hypothesis, scope, acceptance criteria, success metric, risk.
- Acceptance criteria are testable.
- Roadmap is reviewed monthly; trade-offs recorded in `DECISIONS.md`.
- No public legal feature ships without Compliance Advisor sign-off.

## Checklist
- [ ] User and problem are explicit (not "the team thinks…").
- [ ] Acceptance criteria written before development starts.
- [ ] Success metric defined and instrumented.
- [ ] Out-of-scope items explicitly listed.
- [ ] Risks (legal, technical, operational) called out with owners.

## Best Practices
- Talk to real users (clients, lawyers, paralegals) every cycle.
- Prefer the smallest end-to-end slice that validates the hypothesis.
- Reuse existing surfaces (service pages, contact form) before adding new ones.
- Cut scope, not quality.
- Watch leading indicators (engagement, qualified contacts) more than lagging (revenue).

## Common Mistakes to Avoid
- Shipping a feature because it's interesting, not because it's needed.
- Skipping the acceptance criteria step.
- Adding configuration "in case" — every option is future work.
- Letting the AI assistant or client portal compete with the consultation CTA on a page.

## Project-Specific Implementation Guidance
- Conversion-impacting changes (CTA copy, form fields, page structure) follow a documented A/B test or a recorded decision in `DECISIONS.md`.
- Practice-area additions require a practitioner to author the content; engineering only ships the surface.
- The AI assistant must stay framed as support — product copy may not promote it as a substitute for a lawyer.

## Recommended Tools
- Linear / Jira for backlog; GitHub Projects acceptable.
- Notion / Coda for specs; commit final specs to `docs/product/` for repo continuity.
- Plausible / GA4 + Hotjar/Clarity for behaviour insight.

## Validation Steps
- Spec reviewed by Engineering, Design, Compliance.
- Pre-launch demo on staging.
- Post-launch metric review at 7 / 30 / 90 days.

## Definition of Done
- Feature live behind the documented release process.
- Metric instrumented and dashboarded.
- Spec archived in `docs/product/`.
- `CHANGELOG.md` and `ROADMAP.md` updated.
