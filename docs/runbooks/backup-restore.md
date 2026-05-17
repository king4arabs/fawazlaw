# Backup & Restore Runbook

## Backups
- **Laravel (MySQL/PostgreSQL):** nightly full + point-in-time recovery (where supported).
- **Node (MongoDB):** nightly snapshot via Atlas.
- **Object storage (when in use):** versioning + cross-account replication.
- Retention: 30 days hot, 12 months cold.

## Verification (monthly drill)
1. Spin up a clean staging database.
2. Restore the most recent full backup.
3. Apply the most recent PITR/WAL to a chosen timestamp.
4. Run a smoke check: row counts on key tables, latest record timestamps, audit log presence.
5. Record the drill outcome in `docs/runbooks/drills.md` (planned).

## Emergency Restore
1. Open an incident channel.
2. Snapshot the current (broken) state for forensics before restoring.
3. Restore to a parallel database; cut traffic over after verification, do not overwrite in place.
4. Update `DNS`/`connection string` to the restored instance.
5. Post-restore: reconcile any data created after the restore point with operational notes.

## Anti-Patterns
- Restoring in place without forensics.
- Trusting "the backup is configured" without verification drills.
- Storing backup credentials in the same account as the primary DB.
