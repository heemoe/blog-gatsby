# UI Refinement, Responsive Layouts, and Themes

## Goal
- Refine the existing black/red UI rather than replace its visual direction.
- Reduce oversized headings, coordinate page rhythm, and support light/dark reading.

## Scope
- Shared styles, header, theme control, and reading/About/404 presentation.
- Dual Shiki palettes only; no dependency upgrades or deployment changes.
- Preserve existing uncommitted `codex/black-red-ui` work, article content, routes, feeds, and SEO.
- Release authorized by the user on 2026-09-11: commit the existing UI changes, verify a Cloudflare Preview, then merge to main and verify production.
- Keep the separate zsms.me homepage, DNS, Netlify settings, content, and dependencies unchanged.

## Read First
- README.md, AGENTS.md, package.json, src/site.config.ts, docs/plans/PLANS.md
- docs/plans/2026-09-07-black-red-ui.md
- src/styles/global.css, src/styles/reading.css, src/layouts/BaseLayout.astro
- src/components/SiteHeader.astro, src/components/PostEntry.astro, src/pages/*.astro
- src/pages/about/index.astro, src/pages/posts/[...slug].astro, astro.config.mjs
- src/lib/content.ts, src/content/config.ts

## Review Findings
- Home, About, and article headings use unrelated maximum sizes (132/164/76px).
- First-entry typography competes with the main heading on mobile.
- Tablet article columns reserve too much width for metadata.
- Hard-coded dark prose/inline-code colors and a single Shiki theme prevent a usable light mode.
- Adding a header control requires deliberate small-screen navigation sizing.

## Plan
1. Unify heading scale, readable widths, spacing, and responsive breakpoints.
2. Add a pre-paint theme initializer, an accessible toggle, persistence, system fallback, and dual code palettes.
3. Verify build, URLs, theme edge cases, and real-browser desktop/tablet/mobile layouts.
4. Release through a pull request after fresh local checks and exact-commit Preview verification. Record the merge SHA, deployment URL, and final production verification in the pull request conversation to avoid a documentation-only redeployment loop.

## Risks
- This is a bounded cross-template refinement; keep results here for context-safe handoff.
- Existing uncommitted design work must not be reset or replaced with the production UI.
- Storage can be blocked; switching must still work in the current page.
- JavaScript-disabled pages should follow the system theme and not show a dead control.
- The Playwright connector profile is busy; use the available in-app browser without closing another task's browser.

## Verification
- npm run check; npm run build; npm run check:urls; theme logic tests.
- All 10 pages at 320/390/768/1024/1440px in light and dark modes.
- Long titles, code, images, keyboard navigation, persistence, system changes, and unavailable storage.

## Status Log
- 2026-09-07: Reviewed current files and the existing local preview. Confirmed uncommitted black/red design is the baseline; started focused refinement, not a new migration.
- 2026-09-07: Unified layout width and spacing. Desktop home/About headings now cap at 76px (previously 132/164px), article titles at 48px (previously 76px), and the featured entry at 28px. Narrow layouts use smaller fluid headings; tablet metadata moves above prose instead of squeezing the text column.
- 2026-09-07: Added warm-white/red and charcoal/red palettes, an accessible keyboard-operated theme toggle, pre-paint initialization, saved preferences, and cross-tab/system change handling. Storage errors do not prevent in-page switching. Shiki now emits both GitHub light/dark colors without changing dependencies or Markdown content.
- 2026-09-07: Added seven Node-based theme tests covering early initialization, saved preference/navigation, system changes, invalid values, blocked storage, cross-tab changes/clear, and already-loaded documents. All pass. These edge cases are tested with a small DOM/storage harness, not by changing the user's OS settings.
- 2026-09-07: Final `npm run check` passed with zero errors/warnings/hints; `npm run build`, `npm run check:urls`, and `git diff --check` passed. Article content, content helpers, site config, redirects, and lockfile are unchanged.
- 2026-09-07: Real in-app browser checks covered 10 pages x 5 widths (320/390/768/1024/1440) x 2 themes = 100 cases after the final code changes. No horizontal document overflow, broken images, missing/duplicate h1, undersized header controls, or unfocusable code blocks. No browser warnings/errors. Visually inspected home, About, 404, and reading layouts; confirmed light/dark code foregrounds, keyboard switching, reload persistence, back navigation, and Skip to content focus.
- 2026-09-07: Measured text/prose/muted/accent contrast against each theme's background: minimum 5.29:1 in light and 6.66:1 in dark. Cross-engine Safari/Firefox testing and JavaScript-disabled browser execution were not performed; the CSS system-theme fallback and hidden inactive control were reviewed in source.
- 2026-09-07: Final local preview is `http://127.0.0.1:4322/`, shown in the app. Temporary viewport overrides were reset. Existing branch and uncommitted work remain intact; no commit, PR, DNS, Cloudflare change, or production release was made.
- 2026-09-11: User explicitly requested publication. Confirmed `codex/black-red-ui` still starts from production commit `cb5cc8e`, origin/main has not moved, and no PR exists for this branch. Re-running local release checks before creating the PR; production remains unchanged at this point. The resulting PR is the authoritative record of Preview, merge, and live verification outcomes.
- 2026-09-11: Fresh release checks passed: Astro check (18 files, zero diagnostics), all seven theme tests, static build (10 pages), local URL/feed/sitemap/image validation, and `git diff --check`. Content, content helpers, site configuration, redirects, and lockfile are unchanged. Cloudflare still deploys this repository's main branch to blog.zsms.me using npm run build and dist; the live production SHA remains cb5cc8e before release.
