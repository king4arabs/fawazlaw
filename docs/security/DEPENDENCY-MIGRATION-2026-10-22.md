# Dependency migration — validation pending

The dependency graph was resolved with Composer security blocking enabled. A Packagist audit of the resulting lockfile reported zero known security advisories on 2026-10-22. No advisory exceptions were added. Platform extensions were ignored only during dependency resolution; installation must verify the real runtime and extensions.

Run the application suite and review Laravel 10-to-12, Sanctum 4, Swagger 5 and Carbon 3 compatibility before merging. doctrine/annotations remains abandoned.

This branch has not been application-tested or deployed. A clean dependency audit does not prove application security or compatibility.
