# Architecture Decision Records

## ADR-0001: Initialize repository operating system
- Date: 2026-05-17
- Decision: Establish mandatory documentation, SKILLS playbooks, status, roadmap, benchmark, and release tracking.
- Context: Repository had minimal root documentation and lacked a standard operating system for production-grade LegalTech delivery.
- Options considered: Leave documentation ad hoc; create only README; create complete operating documentation.
- Final decision: Create complete operating documentation with practical playbooks.
- Consequences: Future changes have clearer standards and must keep docs current.
- Owner: Repository maintainers
- Status: Accepted

## ADR-0002: Remove runtime secrets and generated dependencies from source control
- Date: 2026-05-17
- Decision: Remove committed `.env` files and `API-Node/node_modules` from Git; add `.env.example` and `.gitignore`.
- Context: Runtime secrets and generated dependencies increase security and maintainability risk.
- Options considered: Keep as-is; document risk only; remove and replace with examples.
- Final decision: Remove unsafe/generated files and document setup.
- Consequences: Developers must install dependencies and create local `.env` files.
- Owner: Engineering/Security
- Status: Accepted

## ADR-0003: Treat backend source-of-truth selection as a priority
- Date: 2026-05-17
- Decision: Keep both Laravel and Node implementations for now while documenting the need to choose a primary API platform.
- Context: Both backends contain useful implementation work and removing one now may lose value.
- Options considered: Remove Node; remove Laravel; preserve both and plan consolidation.
- Final decision: Preserve both and prioritize consolidation planning.
- Consequences: Short-term complexity remains, but existing work is preserved.
- Owner: Software Architect/Product
- Status: Proposed
