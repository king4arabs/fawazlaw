# SDKs

> **Status:** Planning. No official SDK is published yet. This page describes the intended SDK shape so partners and internal teams can prepare.

## Planned Languages
- JavaScript / TypeScript (Node + browser).
- Python.
- PHP.

## Design Principles
- Generated from the OpenAPI spec (once published) to avoid drift.
- Idiomatic per language (Promise/async, type hints, PSR-12).
- Thin: no business logic, just typed HTTP wrappers and error mapping.
- Pluggable transport (so users can inject their own HTTP client / interceptors).
- Pluggable auth (Sanctum / JWT / future OAuth client credentials).

## Versioning
SDKs follow the API version, not the SDK package version: SDK `1.x` targets API `v1`.

## Files
- `javascript.md` — JS/TS notes.
- `python.md` — Python notes.
- `php.md` — PHP notes.
- `examples.md` — high-level examples per language.
