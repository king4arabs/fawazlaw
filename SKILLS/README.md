# SKILLS — The Discipline Playbooks

This folder contains **operating playbooks** for every discipline involved in Fawazlaw.sa. Each file is project-specific, practical, and written as instructions to a working team member — not generic notes.

## How to Use
- Read the playbook for your discipline before starting work.
- Use the **checklist** as a working pre-flight before every change.
- Use the **validation steps** before requesting review.
- The **definition of done** is the bar for merging.
- If you disagree with a standard, raise it in `DECISIONS.md`; do not silently deviate.

## Playbooks
- `frontend.md` — React / Tailwind / RTL / accessibility / SEO / performance.
- `backend.md` — Laravel / Node / API design / validation / errors / logging.
- `database.md` — schema, migrations, indexes, integrity, backups, caching.
- `devops.md` — CI/CD, environments, deploys, rollback, infrastructure.
- `security.md` — secrets, auth, headers, rate limits, audits, vulnerabilities.
- `qa.md` — unit / integration / E2E / accessibility / regression / manual.
- `ai.md` — AI usage, prompt engineering, RAG, hallucination control, human review.
- `product.md` — discovery, prioritisation, specs, acceptance criteria.
- `business.md` — model, packaging, journey, monetisation, market positioning.
- `marketing.md` — SEO, content, conversion, analytics, experiments.
- `operations.md` — daily / weekly / monthly ops, support, incident response.
- `compliance.md` — Saudi PDPL, legal services obligations, auditability.
- `integrations.md` — payments, email, CRM, automation, gov APIs, webhooks.
- `saudi_gcc_readiness.md` — Arabic-first, Hijri/Gregorian, local payments, hosting, GCC expansion.
- `seo.md` — search strategy, schema, metadata, internal linking.

## Common Principles (all playbooks)
- Preserve existing content and routes unless they are clearly broken, duplicated, obsolete, or unsafe.
- Prioritise Arabic RTL clarity, Saudi legal context, confidentiality, and premium trust.
- Separate implemented features from planned features in code, copy, and docs.
- Do not invent licenses, awards, regulatory claims, or attorney credentials.
- Validate every change with the commands in the relevant playbook.
- Document what changed and why in `CHANGELOG.md` (and `DECISIONS.md` for architectural choices).
