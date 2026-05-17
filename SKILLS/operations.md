# Operations Skill

## Purpose
Operations standards for daily/weekly/monthly routines, support, monitoring, incidents, releases, and documentation ownership.

## Standards
- Audit current implementation before changing behavior.
- Preserve existing useful work and document any removal.
- Support Arabic/English and RTL/LTR where user-facing.
- Prefer secure, maintainable, testable, production-ready patterns.
- Update relevant repository operating documents after meaningful changes.

## Checklist
- Confirm affected files, routes, environment variables, and deployment impact.
- Verify Saudi-first business and compliance alignment.
- Add or update validation coverage where practical.
- Review accessibility, SEO, security, performance, and operational implications.
- Document decisions, risks, and follow-up tasks.

## Best practices
- Keep changes small and reviewable.
- Use existing stack conventions before adding tools.
- Prefer explicit configuration over hidden assumptions.
- Design for observability, rollback, and maintainability.
- Avoid leaking secrets or sensitive client/legal data.

## Common mistakes to avoid
- Treating Arabic support as translation only without RTL layout QA.
- Shipping payment/contact/auth changes without validation and logging review.
- Adding generic documentation that does not match actual repository behavior.
- Creating duplicate systems without migration ownership.
- Ignoring dependency, CI, and deployment consequences.

## Project-specific implementation guidance
Fawazlaw.sa currently combines React CRA, Laravel 10, and a Node/Express API prototype. Any operations work must acknowledge this mixed state, avoid false claims about unimplemented capabilities, and improve clarity around the chosen future architecture.

## Recommended tools
Repository scripts, npm, Composer, GitHub Actions, browser testing tools, Lighthouse, accessibility checks, dependency audits, and provider-native monitoring/security tools.

## Validation steps
- Run relevant install/build/test/audit commands.
- Verify user-facing Arabic/English copy and route behavior where applicable.
- Check documentation references and changelog/status updates.
- Record failures that cannot be safely fixed in the same cycle.

## Definition of done
The work is implemented or documented accurately, validation has been attempted, known risks are recorded, and the next owner can continue without guessing.
