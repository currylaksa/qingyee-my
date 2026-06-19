# 01 — Foundation & deployable shell

Status: ready-for-agent

## Parent

`.scratch/qingyee-site/PRD.md`

## What to build

The static Astro project and the persistent newspaper "chrome" that wraps every section, rendering an empty-but-complete shell that builds cleanly.

- Astro (static) project; **plain CSS only, no Tailwind** (ADR-0001).
- Global stylesheet with the locked design tokens (palette CSS custom properties from spec §3), Google Fonts import (Abril Fatface / Josefin Sans / Courier Prime), the parchment-grain SVG noise background (opacity 0.07), and base resets.
- `BaseLayout` containing the full chrome top-to-bottom: TopBar (date left, "Currently: Open to Singapore Roles" right), Header (eyebrow + name "Chan Qing Yee" + tagline, the repeating rust/cream 6px top stripe, and the inline SVG 10-point star badge with 3.90 / CGPA / UTM 2026), the dark Nav bar (6 items: Home · About · Projects · Credentials · Wilderfarer · Contact) made **sticky** on scroll, the CSS-animated Ticker marquee, and the Footer.
- SEO/OG/meta + canonical per PRD/spec §14 (og-image left as a TODO slot).
- Vitest configured and runnable (no tests yet — establishes the pattern).
- A typed `content` data module scaffolded (type shapes for projects, certs, stats, running, experience, personalInfo, navItems, ticker) as the single source of truth; may seed with known values.
- `index` page renders the chrome with empty content regions.

## Acceptance criteria

- [ ] `npm run build` produces `dist/` with no errors; `npm run dev` serves the page.
- [ ] All three fonts load; palette tokens and parchment grain are applied via CSS custom properties.
- [ ] Top stripe, SVG star badge, and dark sticky nav render per spec; nav sticks to top after scrolling past the header.
- [ ] Ticker scrolls continuously via CSS animation (not `<marquee>`).
- [ ] Page `<head>` has title, description, canonical, and OG tags.
- [ ] `npx vitest run` executes (zero tests, green).
- [ ] Content data module exports typed structures consumed by `index` (even if regions are empty).

## Blocked by

- None - can start immediately

## Comments

**Implemented.** Astro 5 (static) + Vitest scaffolded; plain CSS, no Tailwind (ADR-0001). `global.css` carries the locked tokens, fonts, parchment grain, resets. `BaseLayout` assembles the chrome — `TopBar`, `Header` (eyebrow/name/tagline + rust-cream stripe + inline SVG `StarBadge`), sticky `Nav` (6 anchors, Home active), CSS `Ticker` marquee, `Footer` — with full SEO/OG/canonical meta. Typed `src/data/content.ts` is the single source of truth. `index.astro` renders the chrome with empty band + section regions for later issues.

Verified: `npm run build` succeeds (1 page, static `dist/`); `npm test` green (no tests yet, `--passWithNoTests`); built HTML contains title/canonical/OG, the Google Fonts link, all 6 nav anchors, every chrome class, the star polygon, the compiled parchment-grain SVG, and the "Open to Singapore Roles" status line.
