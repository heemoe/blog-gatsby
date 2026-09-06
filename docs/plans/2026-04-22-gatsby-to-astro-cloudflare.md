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
- Platform-side changes cannot be inferred from repository configuration alone. Cloudflare cutover is now verified; Netlify retirement still needs account-side confirmation.

## Plan
1. Build the Astro foundation and record the migration boundaries.
2. Migrate content into Astro collections and normalize frontmatter.
3. Remove the Gatsby/Netlify stack and rewrite developer docs around Cloudflare Pages.
4. Hand off the remaining manual cutover steps and verification checklist.

## Verification
- `npm run check`
- `npm run build`
- `npm run check:urls` after building; optionally supply the exact Cloudflare Preview or production URL to check deployed output.
- Manual spot checks for homepage, About, posts, redirects, RSS, sitemap, and 404

## Open Questions
- Netlify's old URL returns 404, but account-side auto-deploy, Identity/Git Gateway, and project deletion have not been verified.

## Domain Follow-up (2026-09-06)
- Cloudflare API confirms project `blog-gatsby`, production branch `main`, active custom domain `blog.zsms.me`, and GitHub production/preview deployments enabled.
- The Pages fallback domain is `blog-gatsby-92w.pages.dev`. The apex domain `zsms.me` serves the separate personal homepage and must not be redirected to the blog.
- Scope: correct canonical, social images, RSS, sitemap, and robots URLs; share the site origin through `src/site.config.ts`; update publishing documentation. Do not change DNS, article slugs, or dependencies.
- Implementation: update Astro's site configuration and generate `robots.txt` from that configuration, then check all built page/XML URLs and local assets.
- Release: publish a short-lived branch and PR, verify the Cloudflare Preview against this exact commit, then release through the existing `main` deployment workflow.
- Verification: `npm run check`, `npm run build`, and a repeatable built-output URL check. Production verification remains pending until the corrected commit is deployed.
- Context risk is low for this focused follow-up. Existing migration phases are not being restarted.

## Status Log
- `2026-04-22`: Phase 1 started. Creating the Astro single-stack foundation and repository plan document.
- `2026-04-22`: Phase 1 completed. Astro scaffold, base layout, homepage, About, 404, robots, redirects, and RSS routes are in place.
- `2026-04-22`: Phase 2 completed. Legacy Markdown content moved into Astro content collections and normalized around the new frontmatter shape.
- `2026-04-22`: Phase 3 completed. Gatsby, Netlify CMS, Flow, old tests, and deployment configs were removed. README now documents the Cloudflare Pages workflow and manual cutover steps.
- `2026-04-22`: Phase 4 remains manual. Branch rename, Cloudflare dashboard setup, DNS cutover, and Netlify shutdown still need to be performed outside the repo.
- `2026-09-06`: Supersedes the previous all-manual Phase 4 status: `main` is the GitHub default branch; Cloudflare production deployment `f5e99c3b-01e0-4f20-9fc3-b8c51898b350` for `14485be` succeeded; `blog.zsms.me` is active. Domain metadata still points to the apex and is being corrected. Full code review and Netlify account-side retirement remain unverified.
- `2026-09-06`: Domain fix implemented on `codex/fix-blog-domain`. Local `npm run check` reports no diagnostics; `npm run build` and `npm run check:urls` pass for 10 HTML pages, RSS, two sitemaps, robots, and two social images. The same URL check against the existing production deployment fails on the old apex canonical as expected. PR/Preview verification and production release are pending; no DNS or Netlify changes were made.
