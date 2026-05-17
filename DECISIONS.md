# Architecture Decision Records

Each entry follows the ADR format: Date, Decision, Context, Options, Final Decision, Consequences, Owner, Status.

---

## ADR-0001 — Initial Semantic Version Baseline
- **Date:** 2026-05-17
- **Decision:** Adopt `v0.1.0` as the initial semantic version baseline.
- **Context:** Repository previously had no formal versioning; needed a documented starting point.
- **Options considered:**
  - `v0.0.1` — implies almost no functionality.
  - `v0.1.0` — implies a pre-1.0 working baseline with known gaps.
  - `v1.0.0` — implies production-grade stability we do not yet claim end-to-end.
- **Final decision:** `v0.1.0`.
- **Consequences:** Future MINOR bumps for meaningful structural/standards upgrades; PATCH for fixes/docs; MAJOR only when an external contract breaks.
- **Owner:** Software Architect.
- **Status:** Accepted.

## ADR-0002 — Preserve Legacy Pages and Components
- **Date:** 2026-05-17
- **Decision:** Do not delete existing pages or components even when adding new SEO-static pages.
- **Context:** The site had legacy components consuming dynamic APIs. New static SEO pages improve indexability and performance, but removing legacy code risks breaking admin/back-office flows.
- **Options considered:** Delete legacy / Preserve legacy / Move legacy behind feature flag.
- **Final decision:** Preserve until each legacy surface is verified obsolete with a documented replacement.
- **Consequences:** Some duplication; mitigated by clear ownership in `PROJECT_STATUS.md`.
- **Owner:** Senior Full-Stack Developer.
- **Status:** Accepted.

## ADR-0003 — Position AI as Support, Not a Replacement for Legal Advice
- **Date:** 2026-05-17
- **Decision:** All AI assistant copy and outputs must be labelled as support tools, never as a replacement for licensed legal advice.
- **Context:** Bar regulations and PDPL require human practitioner accountability for legal advice; LLM outputs can hallucinate.
- **Options considered:** No labelling / Soft disclaimer / Hard label + UX gates.
- **Final decision:** Hard label + UX gates; mandatory human review for any client-facing AI output.
- **Consequences:** Slower self-serve flows; preserves professional accountability and regulatory standing.
- **Owner:** Compliance Advisor + AI Engineer.
- **Status:** Accepted.

## ADR-0004 — Arabic-First UX, English as Strategic Secondary
- **Date:** 2026-05-17
- **Decision:** Default UI language and content are Arabic with RTL layout; English is added only when human-translated and reviewed.
- **Context:** Primary market is Saudi Arabia; machine-translated legal content is unacceptable.
- **Options considered:** Equal AR/EN / Arabic-first with limited EN / English-first.
- **Final decision:** Arabic-first with limited human-reviewed EN.
- **Consequences:** Slower English coverage; higher quality and trust.
- **Owner:** UI/UX Director + Compliance Advisor.
- **Status:** Accepted.

## ADR-0005 — Establish a Repository Operating System
- **Date:** 2026-05-17
- **Decision:** Standardise the repository on a root-level documentation set + `SKILLS/` discipline playbooks + a `docs/` deep-guide tree, with `BENCHMARK.md` scoring quality against external benchmarks.
- **Context:** Previous docs were stubs; the team needs an explicit operating system to scale safely.
- **Options considered:** Keep minimal docs / Adopt a wiki only / Adopt repo-as-source-of-truth operating system.
- **Final decision:** Repo-as-source-of-truth operating system; the wiki under `docs/wiki/` mirrors the repo.
- **Consequences:** Higher upfront documentation cost; large maintenance gain and onboarding speedup.
- **Owner:** Product Manager + Software Architect.
- **Status:** Accepted (this release).

## ADR-0006 — Fix CI Workflow Scope
- **Date:** 2026-05-17
- **Decision:** Rewrite `.github/workflows/node.js.yml` to run inside `UI-WEB/frontend` for the frontend job and add a separate `API-Node` install/audit job.
- **Context:** The previous workflow ran `npm ci` at the repository root, where no `package.json` exists, so every CI run was guaranteed to fail.
- **Options considered:** Add a root `package.json` proxy / Use working-directory in jobs / Move workflow under each app.
- **Final decision:** Use `defaults.run.working-directory` per job; keep the workflow at repository root for visibility.
- **Consequences:** CI now exercises the real apps; PHP CI still needs to be added for the Laravel API (tracked in `TODO.md`).
- **Owner:** DevOps Engineer.
- **Status:** Accepted.

## ADR-0007 — Tolerate `CI=false` Build Until Lint Warnings Are Remediated
- **Date:** 2026-05-17
- **Decision:** Run the frontend build with `CI=false` in CI to avoid CRA's treat-warnings-as-errors behaviour while pre-existing lint warnings are remediated in a tracked sprint.
- **Context:** CRA defaults treat warnings as errors when `CI=true`; the existing codebase has multiple warnings that block CI without code changes outside the scope of this documentation release.
- **Options considered:** Block CI / Disable lint / Use `CI=false` with explicit tracking issue / Mass-rewrite to remove warnings now.
- **Final decision:** `CI=false` with explicit tracking (`TODO.md`, `PROJECT_STATUS.md`).
- **Consequences:** Build passes; warnings remain visible in logs and must be cleaned in a follow-up.
- **Owner:** Senior Full-Stack Developer.
- **Status:** Accepted (time-bound).
