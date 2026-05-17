# Database Playbook

## Purpose
Design and operate storage layers (MySQL/PostgreSQL via Laravel, MongoDB via Node, Redis cache, object storage for client documents) that are correct, fast, recoverable, and PDPL-compliant.

## Standards
- Every schema change ships as a migration; no manual production DDL.
- Every migration has a tested down-migration (or a documented "forward-only" justification).
- Indexes on every foreign key and on every column used in `WHERE`/`ORDER BY` over ≥ 1K rows.
- No `SELECT *` in hot code paths; project only what you need.
- Soft-deletes for legally significant records; hard-delete only after a documented retention period.
- PII columns are tagged in code comments and tracked in the PDPL ROPA.
- All credentials and connection strings come from env; never committed.

## Checklist
- [ ] Migration adds indexes for new query patterns.
- [ ] Backup ran successfully within 24 hours of the deploy.
- [ ] `EXPLAIN` reviewed for any new query touching ≥ 1K rows.
- [ ] Sensitive columns added to the PDPL ROPA.
- [ ] No destructive change without a backup-restore drill on staging first.

## Best Practices
- Use UUIDs for externally exposed identifiers; keep auto-increment for internal joins where helpful.
- Use `decimal`/`numeric` for money — never `float`.
- Use timezone-aware timestamps stored in UTC; render in `Asia/Riyadh`.
- Add `created_at`, `updated_at`, and `deleted_at` (where soft-delete applies) on every business table.
- Use Redis for cache + rate limiting + ephemeral session state — not as a primary store.
- For Mongo, model around access patterns; avoid huge unbounded arrays.

## Common Mistakes to Avoid
- Cascading deletes on legally significant data.
- Long-running migrations on production without `pt-online-schema-change` or equivalent.
- Storing payloads of secrets, tokens, or full request bodies in the DB.
- Querying without indexes and "fixing" with more memory.
- Forgetting to run backups before destructive migrations.

## Project-Specific Implementation Guidance
- Articles and services have `lang` and `slug` columns; `(lang, slug)` is unique.
- Payments table stores `provider_reference`, `status`, `amount`, `currency`, `idempotency_key`; status transitions are append-only audit rows.
- Future client documents stored in object storage, with metadata (owner, matter id, retention class, hash, encryption-key id) in the DB.
- Audit log table is append-only; no updates or deletes.

## Recommended Tools
- Laravel Migrations, `php artisan db:show`, `php artisan db:monitor`.
- Mongo Compass, mongoexport/mongoimport for diagnostics only.
- Redis CLI, RedisInsight.
- `pgbadger` / slow query log for analysis.

## Validation Steps
- Run migrations forward and backward on a staging copy of production.
- Verify `EXPLAIN` plan for new queries.
- Run a backup-restore drill at least monthly.

## Definition of Done
- Migration applied on staging, validated, then applied on production behind a release tag.
- Backup verified before and after the migration.
- ROPA and `docs/compliance/pdpl.md` updated when PII columns change.
