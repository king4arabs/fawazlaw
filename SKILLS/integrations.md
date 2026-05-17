# Integrations Playbook

## Purpose
Connect Fawazlaw.sa to payment, email, CRM, automation, and (eventually) government APIs safely, observably, and with idempotency.

## Standards
- All third-party calls go through a single client wrapper per provider — no scattered SDK calls.
- All inbound webhooks verify signatures before processing.
- All side-effecting operations (charge, email, document push) use idempotency keys.
- All providers have a DPA on file before any production data flows.

## Checklist
- [ ] Provider DPA filed; PDPL ROPA updated.
- [ ] Sandbox tested end-to-end.
- [ ] Webhook signature verification implemented and tested.
- [ ] Retry policy with exponential backoff for transient failures.
- [ ] Dead-letter queue or alert for permanent failures.
- [ ] Secrets stored in the host secret manager, scoped to environment.

## Best Practices
- Treat the webhook as the source of truth for asynchronous provider state (e.g., MyFatoorah payment status).
- Persist the provider reference and the raw event for replay and audit.
- Use feature flags to switch providers without code change.
- Add a `/health` probe that confirms each critical integration is reachable.

## Common Mistakes to Avoid
- Trusting redirect-back URLs as proof of payment.
- Skipping signature verification "because it's behind Cloudflare".
- Hard-coding provider IDs in views.
- Re-using one webhook secret across environments.
- Triggering emails or charges inline on the request path (slow + non-retriable).

## Project-Specific Implementation Guidance
- **Payments — MyFatoorah:** verify webhook signature; reconcile via daily settlement report; support mada, Apple Pay, STC Pay when enabled.
- **Email — provider TBD (Resend or SES recommended):** sender on `@fawazlaw.sa`, SPF/DKIM/DMARC configured.
- **CRM — provider TBD:** every first contact opens a record; sales/legal handoff is logged.
- **Automation — n8n / Make:** automations must be version-controlled (export JSON to `docs/integrations/` for review).
- **Government APIs — Nafath / Najiz / ZATCA / Absher:** integrate only with documented legal basis; treat as high-risk processing requiring a DPIA.

## Recommended Tools
- Postman / Insomnia for sandbox testing.
- ngrok for local webhook testing.
- A queue (Laravel queues, BullMQ) for retriable side effects.
- Centralised log host for cross-provider tracing.

## Validation Steps
- Run a sandbox transaction end-to-end before each provider release.
- Replay the last 24h of webhooks on staging after major changes.
- Verify DKIM/SPF/DMARC alignment via `dig` and mail-tester.

## Definition of Done
- Integration documented in `docs/integrations/`.
- Health probe live and alerting configured.
- ROPA, privacy notice, and `CHANGELOG.md` updated.
