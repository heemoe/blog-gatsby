# Gatsby to Astro + Cloudflare Pages Migration

## Goal
- Migrate this dormant Gatsby blog into a single-stack Astro site that is easier to maintain and deploy on Cloudflare Pages.
- Keep the publishing model intentionally simple: Markdown content in Git, short-lived branches, preview deploys, and merge to `main`.

## Scope
- Included:
  - Astro site scaffold, global layout, homepage, post pages, About, RSS, sitemap, 404
  - Content collections, frontmatter cleanup, and static asset migration
  - Cloudflare Pages deployment docs, redirects, and manual cutover checklist
  - Removal of Gatsby, Netlify CMS, Flow, Disqus, and obsolete tests/configs
- Excluded:
  - CMS or admin UI
  - Restoring tags, categories, archives, or comments
  - Dashboard-side Cloudflare or Netlify operations

## Read First
- `AGENTS.md`
- `docs/plans/PLANS.md`
- `README.md`
- `src/site.config.ts`
- `src/content/blog/*`
- `src/content/pages/about.md`

## Risks
- This is a cross-cutting migration touching content, build, deployment, and docs; keeping the repo buildable after each phase is mandatory.
- Existing frontmatter is inconsistent, so schema cleanup can create route regressions if slugs are not handled carefully.
- Cloudflare Pages cutover still requires manual dashboard and DNS work; code changes alone cannot finish production switchover.

## Plan
1. Build the Astro foundation and record the migration boundaries.
2. Migrate content into Astro collections and normalize frontmatter.
3. Remove the Gatsby/Netlify stack and rewrite developer docs around Cloudflare Pages.
4. Hand off the remaining manual cutover steps and verification checklist.

## Verification
- `npm run check`
- `npm run build`
- Manual spot checks for homepage, About, posts, redirects, RSS, sitemap, and 404

## Open Questions
- None for the code migration itself; remaining decisions are manual Cloudflare/Netlify operations after code lands.

## Status Log
- `2026-04-22`: Phase 1 started. Creating the Astro single-stack foundation and repository plan document.
- `2026-04-22`: Phase 1 completed. Astro scaffold, base layout, homepage, About, 404, robots, redirects, and RSS routes are in place.
- `2026-04-22`: Phase 2 completed. Legacy Markdown content moved into Astro content collections and normalized around the new frontmatter shape.
- `2026-04-22`: Phase 3 completed. Gatsby, Netlify CMS, Flow, old tests, and deployment configs were removed. README now documents the Cloudflare Pages workflow and manual cutover steps.
- `2026-04-22`: Phase 4 remains manual. Branch rename, Cloudflare dashboard setup, DNS cutover, and Netlify shutdown still need to be performed outside the repo.
