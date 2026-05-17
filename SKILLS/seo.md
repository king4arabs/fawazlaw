# SEO Playbook

## Purpose
Make Fawazlaw.sa the most discoverable, trustworthy Arabic legal-services destination for Saudi search intent, with a clean technical baseline that does not regress.

## Standards
- Every public route has: unique `<title>` (50–60 chars), unique meta description (140–160 chars), canonical URL, OG/Twitter cards, structured data.
- One H1 per page; H2/H3 form a real outline.
- `sitemap.xml` is generated automatically and validated on every release.
- `robots.txt` allows crawling of public surfaces and disallows admin/preview routes.
- Internal links connect every service to its supporting articles and back.

## Checklist
- [ ] Title and meta description unique and informative.
- [ ] Canonical URL set and correct.
- [ ] Structured data validates in Google's Rich Results Test.
- [ ] Page is reachable in ≤ 3 clicks from the homepage.
- [ ] Internal links to ≥ 3 related pages.
- [ ] Image alt text in Arabic for Arabic pages.
- [ ] Mobile Lighthouse SEO ≥ 95.

## Best Practices
- Build topic clusters (hub service page + 5–10 articles).
- Mark articles with `Article` schema, including `author` (verified person) and `datePublished` / `dateModified`.
- Add `FAQPage` schema for FAQ blocks on service pages.
- Add `BreadcrumbList` schema site-wide.
- Add `LocalBusiness` for city-specific pages once the firm verifies city presence.
- Maintain `hreflang` once English coverage is genuinely complete.

## Common Mistakes to Avoid
- Duplicate titles/descriptions across many pages.
- Canonicals pointing at the wrong page (or missing).
- `noindex` left on production after a staging mishap.
- Heavy JS that delays first contentful paint.
- Hidden text or stuffed keywords — modern search penalises and clients distrust.

## Project-Specific Implementation Guidance
- Service landing-page structure mandated in `MARKETING_GROWTH.md` is also an SEO requirement (FAQ schema, internal links, breadcrumbs).
- Use the Fawazlaw `Organization` schema globally; include `legalName`, `url`, `logo`, `sameAs`, `contactPoint`.
- Do not include unverified `award`, `award` or `member-of` claims in schema.

## Recommended Tools
- Google Search Console, Google Rich Results Test, Schema Markup Validator, Screaming Frog (occasional crawl), Ahrefs/Semrush.

## Validation Steps
- Run Rich Results Test on touched pages.
- Inspect URL in Search Console after deploy.
- Lighthouse SEO + best-practices pass.

## Definition of Done
- All checklist items pass.
- Search Console shows the new URL discoverable within 7 days.
- `MARKETING_GROWTH.md` updated if strategy changed.
