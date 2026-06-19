# qingyee.my

Personal portfolio of **Chan Qing Yee** — CS (Networks & Security) graduand (UTM), DIGITEX 2026 Silver Medalist, Zero-Trust builder, and *Wilderfarer*. Theme: **Warm Rust & Cream / Retro Americana**.

🔗 **Live:** https://qingyee.my

## Stack

| Layer | Choice |
|---|---|
| Framework | [Astro](https://astro.build) (static) |
| Styling | Plain CSS + design tokens (no Tailwind — see `docs/adr/0001`) |
| Icons | astro-icon + Tabler (build-time inline SVG) |
| Fonts | Abril Fatface · Josefin Sans · Courier Prime (Google Fonts) |
| Contact form | [Web3Forms](https://web3forms.com) (static, no backend) |
| Tests | Vitest |
| Hosting | Cloudflare Pages (push-to-deploy) |

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # static build -> dist/
npm test         # vitest (assetPresence + projectLinks)
```

Node 18+.

## Structure

```
src/
├── layouts/BaseLayout.astro    # chrome: topbar, header, sticky nav, ticker, footer
├── components/                 # Hero, ProjectGrid, Sidebar, RightRail, sections, widgets
├── lib/                        # assetPresence + projectLinks (pure, tested)
├── data/content.ts             # single source of truth for all content
└── pages/index.astro           # single-page layout
docs/adr/                       # architecture decision records
CONTEXT.md                      # domain glossary
```

## Content

All copy and data live in [`src/data/content.ts`](src/data/content.ts) — edit there to update projects, certs, stats, bio, links.

## Owner-supplied assets

The site renders gracefully without these and auto-includes them once present:

- `public/cv.pdf` — hero "Download CV" button (hidden until added)
- `public/headshot.jpg` — profile photo (falls back to "QY" initials)
- `PUBLIC_WEB3FORMS_KEY` env var — activates the contact form (mailto fallback until set)
- TODO project URLs (DuoDrop, World Cup, VibeUI, Raspberry Pi), cert dates, hiking log, `og-image.png`

## Deploy

Pushes to `main` auto-build on Cloudflare Pages (`npm run build` → `dist/`). DNS managed by Cloudflare; custom domains `qingyee.my` + `www`.
