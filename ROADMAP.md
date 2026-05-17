# Roadmap

_Living document. Reviewed monthly._

## Immediate Fixes (this sprint)
- [x] Repository operating system docs (root + SKILLS + `docs/`).
- [x] Fix CI workflow to target `UI-WEB/frontend`.
- [ ] Resolve CRA lint warnings to restore `CI=true npm run build`.
- [ ] Enable Dependabot at the org level for this repo.
- [ ] Add Gitleaks scan to CI.
- [ ] Add link checker to CI for the marketing site.

## Short-Term Roadmap (0–3 months)
- [ ] Sentry + structured logging across frontend, Laravel API, Node API.
- [ ] Uptime monitoring on public domains.
- [ ] Lighthouse CI baseline + budgets.
- [ ] Playwright E2E for top 5 user journeys.
- [ ] axe accessibility checks in CI.
- [ ] Decide primary API stack; document in `DECISIONS.md`.
- [ ] OpenAPI spec for the primary API; publish under `docs/api/`.
- [ ] MFA for all admin accounts.
- [ ] PDPL ROPA finalised in `docs/compliance/pdpl.md`.

## Mid-Term Roadmap (3–9 months)
- [ ] Migrate frontend from CRA to Next.js (App Router) with native i18n routing and ISR.
- [ ] Client portal MVP: authentication, document upload (encrypted), matter timeline, secure messaging.
- [ ] Saudi-region production hosting decision (AWS me-central-1 / STC Cloud / Oracle KSA).
- [ ] Apple Pay + STC Pay enablement via MyFatoorah.
- [ ] Bilingual content parity (Arabic + English) for top 10 service pages.
- [ ] AI legal assistant v1 with RAG over a curated Saudi legal corpus and human-in-the-loop review.

## Long-Term Roadmap (9–24 months)
- [ ] GCC content variants (UAE, Kuwait, Qatar, Bahrain, Oman).
- [ ] Enterprise tier with SLA, dedicated portal, audit-export, SSO.
- [ ] Government API integrations (Nafath, Najiz, ZATCA, Absher) where lawful and useful.
- [ ] Mobile apps (iOS/Android) for the client portal.
- [ ] Marketplace / referral network for verified specialists.

## Product Roadmap
- Consultation booking flow (calendar, payment, intake form).
- Productised legal packages (incorporation, employment kit, contract review).
- Client document vault with retention rules.
- AI-assisted intake (triage + summarisation), always human-reviewed.

## Engineering Roadmap
- Single primary API stack with OpenAPI.
- TypeScript end-to-end (frontend + Node services).
- Shared design system package (tokens, components) — `docs/design-system/`.
- Infrastructure-as-code (Terraform) for cloud resources.
- Containerised deploy targets where applicable (Docker, K8s optional).

## AI Roadmap
- v0 (today): static AI assistant copy and safeguards on the marketing site.
- v1: RAG-backed assistant over curated Saudi legal corpus, scoped FAQ-style answers, mandatory human review for client-facing output.
- v2: matter-aware drafting assistance for lawyers (internal-only), with redaction and audit trail.
- v3: client-portal self-serve triage with seamless lawyer handoff.

## LegalTech Feature Roadmap
- Encrypted document upload + e-signature.
- Case timeline and milestones.
- Court date reminders.
- Anonymised case studies generator (lawyer-reviewed).
- PDPL data-subject request workflow.

## Growth Roadmap
- 50+ practitioner-reviewed Arabic articles in 12 months.
- Verified Google Business Profile + reviews program.
- Quarterly webinar series in Arabic.
- Enterprise outbound program (HR/finance leaders in mid-market KSA).
- Annual KSA legal market outlook report.
