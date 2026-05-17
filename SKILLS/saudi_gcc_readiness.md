# Saudi & GCC Readiness Playbook

## Purpose
Ensure Fawazlaw.sa is unambiguously Saudi-first in UX, language, payments, hosting, terminology, and procurement — and ready to expand to the wider GCC market.

## Standards
- Arabic is the default UI language and direction.
- Saudi legal terminology is used correctly; jurisdiction labels are explicit.
- Local payment methods (mada, Apple Pay, STC Pay) supported where available.
- Hijri dates surfaced alongside Gregorian where Hijri is the primary frame of reference.
- In-Kingdom or GCC-region data residency preferred for production personal data.
- Procurement-grade documentation available on request (security, PDPL, SLAs).

## Checklist
- [ ] Page renders correctly RTL across all touched components.
- [ ] No mirrored icons that imply Western LTR semantics (back/forward arrows are direction-aware).
- [ ] Dates display in the right calendar for the page's context.
- [ ] Currency is SAR by default; VAT is included or clearly broken out.
- [ ] City and jurisdiction labels are correct (Riyadh, Jeddah, Dammam, etc.).
- [ ] Practice-area language matches Saudi court / regulator usage.

## Best Practices
- Use logical CSS properties (`margin-inline-start`, `padding-inline-end`) instead of `margin-left`/`right`.
- Test with real Arabic content, not Lorem Ipsum — line heights and break points differ.
- Localise numerals when appropriate (Arabic-Indic vs Western-Arabic numerals); keep one convention per page.
- Defer to practitioners on Saudi legal terminology; never machine-translate legal terms.

## Common Mistakes to Avoid
- "RTL-styled" pages that still hard-code `left`/`right`.
- Generic Gulf framing that ignores Saudi-specific regulators (SDAIA, ZATCA, MoCS, Najiz).
- Using Egyptian/Levantine Arabic phrasing in formal Saudi legal copy.
- Hijri-only or Gregorian-only display on dates that genuinely need both.

## Project-Specific Implementation Guidance
- Top navigation, footer, and CTAs are first authored in Arabic; English variants are added afterwards.
- Service pages name the relevant Saudi regulator/court when applicable.
- App portal flows accept Saudi mobile formats (`+9665XXXXXXXX`) and validate accordingly.
- Future GCC variants are launched as separate country surfaces (`/sa`, `/ae`, etc.) — not by stretching one page across jurisdictions.

## Recommended Tools
- Hijri/Gregorian conversion: `moment-hijri`, `dayjs` with Hijri plugin.
- Phone formatting: `libphonenumber-js` with `SA` default.
- VAT calculation aligned to ZATCA rules.

## Validation Steps
- Native Arabic-speaker review of any substantial copy change.
- RTL visual smoke at 375 / 768 / 1280 widths.
- Cross-check practice-area terms against Najiz / regulator documentation.

## Definition of Done
- Reviewer (native Arabic, ideally a practitioner) sign-off.
- `MARKETING_GROWTH.md` and `BUSINESS_CONTEXT.md` updated if positioning shifted.
- `CHANGELOG.md` entry noting the Saudi/GCC impact.
