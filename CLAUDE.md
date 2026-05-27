# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Pixlgrove is a static marketing site for a web design studio. Plain HTML/CSS/JS with **no build step, no dependencies, and no framework**. There is no `package.json`, bundler, or test suite.

## Running locally

Open any `.html` file directly, or serve the directory for correct relative-path/asset behavior:

```bash
python -m http.server 8000   # then visit http://localhost:8000
```

Opening `file://` works for a quick look, but use a server to verify relative links and the sitemap/robots paths behave as in production.

## Architecture

- **Multi-page static site.** Each top-level page is a standalone HTML file: `index.html`, `portfolio.html`, `services.html`, `contact.html`. There is no router or templating engine.
- **Shared chrome (nav + footer) is duplicated static HTML in every page**, deliberately — non-JS crawlers (most AI bots: GPTBot, ClaudeBot, PerplexityBot, Google-Extended) must see internal links and footer content. When editing the nav or footer, **apply the same change to all four pages** (`index`, `portfolio`, `services`, `contact`). The active page is marked with `class="active" aria-current="page"` on its own nav link. `layout.js` is now only the mobile burger toggle; every page loads it via `<script src="layout.js"></script>` before `</body>`.
- **Two-tier CSS.** `style.css` holds the global design system: CSS custom properties in `:root` (the `--bark`/`--bark2`–`--bark5` neutral palette, the green brand colors `--grove` `#1D9E75` / `--mist` / `--dew`, `--max` content width `1120px`, `--nav-h` `68px`), base elements, buttons (`.btn`, `.btn-primary`), nav, footer, the `.fade-up` entrance animation, and the responsive `@media (max-width: 768px)` rules. **Page-specific styles live in an inline `<style>` block in that page's `<head>`** (e.g. hero styles in `index.html`). Keep shared/reusable styles in `style.css` and page-only styles inline.
- **Animations are CSS-only.** `.fade-up` triggers a one-time entrance animation on load with staggered `nth-child` delays — there is no IntersectionObserver or scroll-driven JS.
- **Brand color** is `#1D9E75` (green), used in the logo SVG and exposed as the `--grove` token (with lighter shades `--mist` and `--dew`).

## Conventions

- Use the `--bark*` / `--grove`/`--mist`/`--dew` CSS variables rather than hard-coded hex values for colors. Fonts are also tokenized (`--font-sans` DM Sans, `--font-mono` DM Mono, imported from Google Fonts at the top of `style.css`).
- Constrain page content with `max-width: var(--max)` centered containers, matching existing sections.
- The contact form is a **Tally embed** (`tally.so/embed/...`) via `data-tally-src` iframe plus the Tally loader script — there is no backend form handler.

## Deployment & version tracking

- **Hosting:** code lives in git; **Netlify** auto-deploys on push, and the domain is registered at **Namecheap** (DNS points to Netlify).
- **Which commit is live?** `netlify.toml` runs a one-line build command that writes `version.json` at deploy time from Netlify's env vars (`COMMIT_REF`, `BRANCH`, `DEPLOY_ID` + UTC timestamp). Check the deployed version with `curl https://pixlgrove.com/version.json` — it is intentionally **not surfaced anywhere in the visible UI**. `version.json` is served `no-cache` so it always reflects the live deploy.
- The repo's committed `version.json` is just a `"local"` placeholder; Netlify overwrites it on every build. Don't rely on its committed contents.
- `publish = "."` — the site is served from the repo root (no output dir). The build "step" is only the `version.json` stamp; there is still no bundler.

## SEO

- Each page's `<head>` carries: a unique `<title>` and meta description, `<link rel="canonical">` (absolute, base `https://pixlgrove.com/`), `robots`, `theme-color`, Open Graph + Twitter Card tags, and a JSON-LD `<script type="application/ld+json">` block. Home declares `ProfessionalService` + `WebSite`; services declares `Service` with an `OfferCatalog` mirroring the pricing tiers; portfolio/contact declare `BreadcrumbList` (contact also `ContactPage`). **If you change pricing, services, or the email, update the matching JSON-LD** so structured data stays truthful.
- `robots.txt`, `sitemap.xml`, and `llms.txt` live at the site root. New pages must be added to `sitemap.xml`, and significant content/pricing changes should be reflected in `llms.txt` (the plain-text summary AI engines read).
- Social/share image is referenced as `og-image.png` (absolute URL). The source art is `og-image.svg` — export it to a 1200×630 `og-image.png` for full compatibility (Facebook/Twitter/LinkedIn don't render SVG OG images).
