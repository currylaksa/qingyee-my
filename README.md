# qingyee.my

Personal portfolio of **Chan Qing Yee** — Network & Security Engineer, CS graduand (UTM), DIGITEX 2026 Silver Medalist, and *Wilderfarer*. Theme: **Warm Rust & Cream / Retro Americana**.

🔗 **Live:** https://qingyee.my

## Stack

| Layer | Choice |
|---|---|
| Framework | [Next.js](https://nextjs.org) 15 App Router (`output: 'export'`) |
| Styling | Tailwind CSS 4 + design tokens in `app/globals.css` |
| Fonts | Geist Sans · Geist Mono · Fraunces (the Wilderfarer pull-quote only) |
| Contact form | [Web3Forms](https://web3forms.com) (static, no backend) |
| Tests | Vitest |
| Hosting | Cloudflare Pages (push-to-deploy) |

## Develop

```bash
npm install
npm run dev      # local dev server (turbopack)
npm run build    # static export -> out/
npm test         # vitest (assetPresence + projectLinks)
```

Node 20 (pinned in `.node-version`).

## Structure

```
app/
├── layout.tsx              # chrome: nav, footer, metadata, JSON-LD Person
├── page.tsx                # home
├── projects/               # index + secureexam, huawei, macos-menubar
├── credentials/ about/ contact/
├── globals.css             # design tokens + Tailwind
└── sitemap.ts robots.ts    # static metadata routes
components/                 # Nav, Footer, ProjectCard, ZeroTrustDiagram, …
lib/                        # content.ts + assetPresence/projectLinks (pure, tested)
docs/adr/                   # architecture decision records
CONTEXT.md                  # domain glossary
```

## Content

All copy and data live in [`lib/content.ts`](lib/content.ts) — edit there to update projects, certs, skills, achievements, bio, links.

## Owner-supplied assets

The site renders gracefully without these and auto-includes them once present:

- `public/cv.pdf` — Network & Security resume; "Download CV" button in the nav and hero (hidden until added)
- `public/cv-ai.pdf` — secondary AI engineering resume
- `public/headshot.jpg` — About-page portrait (section omitted until added)
- Cert dates and `verifyUrl`s in `lib/content.ts` (omitted while `null`)

Project URLs follow a **no dead links** policy: a `null` URL renders no link at all (see `lib/projectLinks.ts`).

## Deploy

Pushes to `main` auto-build on Cloudflare Pages (`npm run build` → `out/`). DNS managed by Cloudflare; custom domains `qingyee.my` + `www`. Security headers are served from `public/_headers`.
