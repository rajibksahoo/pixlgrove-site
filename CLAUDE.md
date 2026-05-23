# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Pixlgrove is a static marketing site for a web design studio. Plain HTML/CSS/JS with **no build step, no dependencies, and no framework**. There is no `package.json`, bundler, or test suite.

## Running locally

Open any `.html` file directly, or serve the directory for correct relative-path/asset behavior:

```bash
python -m http.server 8000   # then visit http://localhost:8000
```

Use a server (not `file://`) so `layout.js`'s active-link detection via `location.pathname` works as expected.

## Architecture

- **Multi-page static site.** Each top-level page is a standalone HTML file: `index.html`, `portfolio.html`, `services.html`, `contact.html`. There is no router or templating engine.
- **Shared chrome is injected by JS, not duplicated in HTML.** `layout.js` holds the `<nav>` and `<footer>` as template-literal strings and injects them into every page on `DOMContentLoaded` (`insertAdjacentHTML`). It also sets the active nav link and wires the mobile burger menu. To change the nav or footer, edit `layout.js` once — never the individual pages. Every page must include `<script src="layout.js"></script>`.
- **Two-tier CSS.** `style.css` holds the global design system: CSS custom properties in `:root` (the `--bark*` neutral palette, green brand colors, `--max` content width `1120px`, `--nav-h` `68px`), base elements, buttons (`.btn`, `.btn-primary`), nav, footer, the `.fade-up` entrance animation, and the responsive `@media (max-width: 768px)` rules. **Page-specific styles live in an inline `<style>` block in that page's `<head>`** (e.g. hero styles in `index.html`). Keep shared/reusable styles in `style.css` and page-only styles inline.
- **Animations are CSS-only.** `.fade-up` triggers a one-time entrance animation on load with staggered `nth-child` delays — there is no IntersectionObserver or scroll-driven JS.
- **Brand color** is `#1D9E75` (green), used in the logo SVG and `--brand` token.

## Conventions

- Use the `--bark*` / brand CSS variables rather than hard-coded hex values for colors.
- Constrain page content with `max-width: var(--max)` centered containers, matching existing sections.
- The contact form is a **Tally embed** (`tally.so/embed/...`) via `data-tally-src` iframe plus the Tally loader script — there is no backend form handler.
