# Benchmark

Fawazlaw.sa is benchmarked against world-class references so we know what "good" looks like and where we stand. Scores are 1–10 (self-assessed, reviewed monthly).

## Reference Standards
- **Vercel** — frontend quality, performance, DX.
- **Stripe** — documentation clarity and developer experience.
- **Linear** — product polish, speed, attention to detail.
- **GitHub** — repository maintainability and contributor experience.
- **OpenAI** — AI safety, transparency, model behaviour documentation.
- **Supabase** — open developer experience, quickstart quality.
- **Enterprise SaaS (Atlassian, Notion)** — security, compliance, audit readiness.
- **Saudi / GCC market** — Arabic-first UX, local payments, hosting, terminology.
- **LegalTech** — trust, confidentiality, professional tone, regulatory clarity.

## Current Scores (v0.2.0)
| Dimension                    | Current | Target | Notes |
|------------------------------|--------:|-------:|-------|
| UX / Design polish           |   6 / 10 |  9 / 10 | Premium direction in place; needs design system + a11y audit. |
| Engineering quality          |   5 / 10 |  9 / 10 | Dual API stack, CRA in maintenance mode, weak test coverage. |
| Documentation                |   8 / 10 |  9 / 10 | Strong after v0.2.0; needs API + practitioner content depth. |
| Security                     |   5 / 10 |  9 / 10 | Documented; enforcement (MFA, headers, audit logs) pending. |
| SEO                          |   7 / 10 |  9 / 10 | Solid technical baseline; needs deeper Arabic content + hreflang. |
| Performance                  |   5 / 10 |  9 / 10 | No Lighthouse CI baseline; image optimisation incomplete. |
| Accessibility                |   5 / 10 |  9 / 10 | RTL in place; not audited; no a11y CI. |
| Saudi / GCC readiness        |   7 / 10 |  9 / 10 | Arabic-first + MyFatoorah; hosting region + Apple Pay / STC Pay pending. |
| AI safety                    |   7 / 10 |  9 / 10 | Hard labelling and disclaimers; RAG and human review still planned. |
| Developer experience         |   6 / 10 |  9 / 10 | Setup is clear; needs scripts, env templates, and OpenAPI. |
| Operational readiness        |   4 / 10 |  9 / 10 | No observability, no incident drills yet. |
| Compliance (PDPL)            |   6 / 10 |  9 / 10 | ROPA drafted; data-subject workflow not yet built. |
| **Overall benchmark score**  |  **5.9 / 10** | **9.0 / 10** | |

## Top 10 Recommended Improvements (prioritised)
1. Add Sentry, uptime monitoring, structured logs across all services.
2. Add Lighthouse CI + axe accessibility CI; fix the largest regressions.
3. Add Playwright E2E for the top 5 user journeys.
4. Resolve CRA lint warnings; restore `CI=true` build.
5. Add MFA for all admin accounts; enforce response headers and rate limits at the edge.
6. Decide and document the primary API stack; publish OpenAPI.
7. Begin CRA → Next.js migration spike for SSR/ISR and native i18n routing.
8. Build PDPL data-subject request workflow + audit log.
9. Add Apple Pay + STC Pay via MyFatoorah; decide Saudi-region hosting.
10. Ship bilingual parity (Arabic + English) on the top 10 service pages.

## Scoring Methodology
- Each dimension is reviewed monthly by the relevant role (per `OPERATIONS.md` ownership matrix).
- Movement of any score is recorded in `CHANGELOG.md` with rationale.
- Target scores are revisited each quarter.
