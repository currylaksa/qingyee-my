# qingyee.my — Website Build Specification
**Theme:** Warm Rust & Cream — Retro Americana / Vintage Poster
**Version:** 2.0 | June 2026
**Handoff to:** Claude Code

---

## 0. Build-Ready Checklist (read first)

This spec is complete enough to build the full shell, layout, and all content **today**. A few assets are owner-supplied — Claude Code should scaffold the slots and use the placeholder paths below; Chan drops the real files in afterward. Anything not yet supplied is marked **`TODO`** inline so nothing ships as a silent placeholder.

**Assets Chan will drop into `/public`:**
- `cv.pdf` — linked by the hero "Download CV" button
- `headshot.jpg` — real photo (profile widget + About section); initials "QY" is the fallback if absent

**Owner-supplied values still needed (wire the slot, mark `TODO` until filled):**
- Live/repo URLs for DuoDrop, World Cup 2026 PWA, VibeUI (Hot Meal Bar), Raspberry Pi IoT — see §9
- Web3Forms access key for the contact form — see §6.9

**Confirmed decisions:**
- ✅ Single-page layout (Option A) for v1
- ✅ "Download CV" button in hero
- ✅ Real headshot photo (with initials fallback)
- ✅ Real working contact **form** via Web3Forms (not just a mailto)
- ✅ SecureExam = **26 security controls** total (AI Behavioural Risk Scoring counts as #26)
- ✅ Contact: email · LinkedIn · phone/WhatsApp all live

---

## 1. Project Overview

A personal portfolio and brand showcase for **Chan Qing Yee** — a final-year CS (Networks & Security) student at UTM, internship alumni at Huawei Malaysia, and DIGITEX 2026 Silver Medalist. The site doubles as a hiring-manager-facing portfolio targeting Singapore tech roles, and a personal brand page for the *Wilderfarer* identity.

**Domain:** `qingyee.my`
**Target audience:** Singapore tech hiring managers, recruiters, and collaborators
**Primary goal:** Make a memorable first impression; showcase SecureExam UTM as the lead case study
**Secondary goal:** Express personal identity (Wilderfarer — selenophile, hodophile, dendrophile)

---

## 2. Tech Stack Recommendation

| Layer | Choice | Reason |
|---|---|---|
| Framework | **Astro** (static) | Zero-JS by default, fast, great for portfolio sites |
| Styling | **Tailwind CSS** | Utility-first, easy to maintain the custom colour palette |
| Fonts | Google Fonts (see §4) | Free, fast via CDN |
| Hosting | **Cloudflare Pages** | Free tier, global CDN, custom domain easy |
| Icons | **Tabler Icons** (outline) | Already used in mockup, 5800+ icons |
| Animations | **CSS-only** (keyframes + IntersectionObserver scroll-reveal) | Keeps the site truly static/zero-JS-dependency. **Do NOT pull in Framer Motion** — it requires React islands and is overkill for the subtle entrance fades this design needs. A ~15-line vanilla IntersectionObserver covers all reveal-on-scroll. |
| Contact form | **Web3Forms** | Works on a fully static site (POST to their endpoint, no backend). Free tier 250 submissions/mo. See §6.9 |

> If Claude Code prefers a different stack, the colour tokens and component structure in this spec are framework-agnostic. The only firm constraint is **no heavy client-side JS framework** — this is a static poster site, keep it light.

---

## 3. Colour Palette (Design Tokens)

These are the exact hex values from Version B. Use these as CSS custom properties. **Do not alter these — the palette is the locked identity of the site.**

```css
:root {
  /* Backgrounds */
  --color-bg-page:        #f5ede0;   /* aged parchment grain — page bg */
  --color-bg-surface:     #faf4ea;   /* main site wrapper / cards */
  --color-bg-sidebar:     #f2e6d0;   /* left & right rail */
  --color-bg-dark:        #1a0c06;   /* nav bar, card headers, footer */
  --color-bg-mid:         #3a1a0a;   /* nav hover state */

  /* Brand */
  --color-rust:           #c0392b;   /* PRIMARY accent — nav active, badges, dots, borders */
  --color-rust-dark:      #8b1a0e;   /* rust shadow / pressed state */
  --color-rust-light:     #f5c8b8;   /* rust tint text on dark bg */

  /* Text */
  --color-text-primary:   #1a0c06;   /* headings, strong labels */
  --color-text-body:      #3a1a0a;   /* body copy */
  --color-text-muted:     #7a4828;   /* secondary labels, company names */
  --color-text-cream:     #e8d5b8;   /* text on dark backgrounds */
  --color-text-cream-dim: #faf4ea;   /* bright cream on rust */

  /* Borders */
  --color-border-heavy:   #1a0c06;   /* project card borders, section dividers */
  --color-border-mid:     #d4a87a;   /* widget separators */
  --color-border-light:   #e8d5b8;   /* timeline items */
}
```

**Parchment grain background** — apply this SVG noise texture as a `background-image` on the page root:
```css
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E");
```

---

## 4. Typography

| Role | Font | Weight | Size | Notes |
|---|---|---|---|---|
| Display / H1 | **Abril Fatface** | 400 (only weight) | 48px desktop / 32px mobile | Logo name, hero headline |
| Section headings | **Abril Fatface** | 400 | 22–30px | Uppercase, letter-spacing: 2px |
| Body / UI | **Josefin Sans** | 300 (light), 700 (bold) | 10–13px | Navigation, labels, body copy |
| Monospace / dates | **Courier Prime** | 400, 700 | 10–12px | Years, stats, ticker, footer |

**Google Fonts import:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Josefin+Sans:wght@300;400;700&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
```

---

## 5. Layout Structure

The site is a **single-page** design with anchor-linked sections (Option A — confirmed for v1). The desktop layout is a **3-column newspaper grid**:

```
┌─────────────────────────────────────────────────────────┐
│  TOP BAR — date left / status right (rust bg)           │
├─────────────────────────────────────────────────────────┤
│  HEADER — logo left / star badge right (cream bg)       │
│  striped top border (rust + cream repeating)            │
├─────────────────────────────────────────────────────────┤
│  NAV BAR — 6 items (dark bg, rust active)               │
├─────────────────────────────────────────────────────────┤
│  TICKER — scrolling marquee (rust bg, cream text)       │
├──────────┬──────────────────────────┬───────────────────┤
│ SIDEBAR  │   MAIN CONTENT           │   RIGHT RAIL      │
│ 180px    │   flex: 1                │   160px           │
│          │                          │                   │
│ Profile  │  Hero section            │  Credentials      │
│ widget   │  Project grid (2-col)    │  Running log      │
│ Stats    │  Experience timeline     │  Wilderfarer      │
│ Stack    │                          │                   │
│ Links    │                          │                   │
├──────────┴──────────────────────────┴───────────────────┤
│  FOOTER — copyright left / links right (dark bg)        │
└─────────────────────────────────────────────────────────┘
```

**Breakpoints:**
- Desktop: ≥960px — full 3-column layout
- Tablet: 600–959px — collapse right rail into main, sidebar becomes top bar
- Mobile: <600px — full single column stack, nav becomes hamburger

---

## 6. Component Specifications

### 6.1 Top Bar
- Background: `--color-rust`
- Border-bottom: 2px solid `--color-rust-dark`
- Left text: current date — `font-family: Courier Prime, monospace; font-size: 10px; color: --color-text-cream-dim; letter-spacing: 1px`
- Right text: "Currently: Open to Singapore Roles"
- Padding: 5px 20px

### 6.2 Header
- Background: `--color-bg-surface`
- Border-bottom: 6px solid `--color-rust`
- Top stripe: `repeating-linear-gradient(90deg, #c0392b 0px, #c0392b 20px, #e8d5b8 20px, #e8d5b8 22px)` — 6px tall strip at very top
- **Left block:**
  - Eyebrow: "The Portfolio of" — Josefin Sans 300, 10px, letter-spacing 5px, uppercase, rust colour
  - Name: "Chan Qing Yee" — Abril Fatface, 48px, dark colour
  - Tagline: "Wilderfarer — Builder — Security Engineer" — Josefin Sans 300, 11px, letter-spacing 4px, uppercase, muted colour
- **Right block:** SVG star badge
  - 10-point star polygon, fill: `--color-rust`, stroke: `--color-rust-dark`
  - Centre text line 1: "3.90" — Abril Fatface, 14px, cream
  - Centre text line 2: "CGPA" — Josefin Sans, 7px, rust-light
  - Below badge: "UTM 2026" — Courier Prime, 9px, rust, letter-spacing 1px

### 6.3 Navigation Bar
- Background: `--color-bg-dark`
- Border-bottom: 3px solid `--color-rust`
- 6 items: **Home · About · Projects · Credentials · Wilderfarer · Contact**
- Font: Josefin Sans 700, 11px, letter-spacing 2px, uppercase
- Default text: `--color-text-cream`
- Active state: background `--color-rust`, text `--color-text-cream-dim`
- Hover state: background `--color-bg-mid`
- Item border-right: 1px solid `--color-bg-mid`

### 6.4 Ticker / Marquee
- Background: `--color-rust`
- Border-bottom: 2px solid `--color-rust-dark`
- Continuous scrolling text (CSS `@keyframes` translateX loop, ~22s linear infinite — **not** the deprecated `<marquee>` tag):
  > ★ DIGITEX 2026 Silver Medal — SecureExam UTM • Zero-Trust Platform Live at secureexam-cqy.tech • CCNA • DevNet Associate • OCI Associate • Google Cybersecurity • Seeking Singapore opportunities • github.com/currylaksa ★
- Font: Courier Prime, 10px, cream, letter-spacing 1px

### 6.5 Left Sidebar (180px)

**Widget: Profile**
- Dark header bar: "Profile" with user-circle icon
- **Avatar:** 78px circle. If `/public/headshot.jpg` exists, render the photo cropped to the circle with a 3px dark border. **Fallback** (no photo present): rust bg, dark 3px border, Abril Fatface 26px initials "QY" in cream. `TODO: drop headshot.jpg`
- Name: Abril Fatface 14px dark — "Chan Qing Yee"
- Sub: Josefin Sans 300, 10px, letter-spacing 2px, uppercase, muted — "Wilderfarer"
- Description: "CS (Networks & Security) / Universiti Teknologi Malaysia"

**Widget: Online indicator**
- Dark bg, rust pulsing dot animation, text "Online — JB, Malaysia"

**Widget: By the Numbers**
- Dark header bar with chart-bar icon
- Stat rows (label left / Courier Prime value right):
  - LOC → 8,100+
  - Controls → **26**
  - Projects → 7+
  - Certs → 4
  - HM Target → <2:00

**Widget: Stack**
- Dark header with tool icon
- Tags split into two styles:
  - Filled (rust bg, cream text, uppercase): Node.js · React · MySQL · Python · Nginx · OCI
  - Outline (transparent bg, rust border/text): CCNA · Flask · JWT

**Widget: Find Me**
- Dark header with link icon
- Four links with icons (all live values below):
  - GitHub (brand-github icon) → `https://github.com/currylaksa`
  - LinkedIn (brand-linkedin icon) → `https://www.linkedin.com/in/chanqingyee`
  - Email (mail icon) → `mailto:qingyee0219@gmail.com`
  - WhatsApp (brand-whatsapp icon) → `https://wa.me/60137339035` (label as "WhatsApp / +60 13-733 9035")

### 6.6 Main Content Area

**Hero Section**
- Padding: 20px 24px 16px
- Border-bottom: 3px solid dark
- Label bar (centered, with rules either side): "Featured" — Josefin Sans 700, 9px, rust, letter-spacing 4px, uppercase
- Headline (Abril Fatface, 30px, dark):
  > "Zero-Trust Exam Platform Earns Silver at DIGITEX 2026"
- Body (Josefin Sans 300, 12px, body colour, line-height 1.7, max-width 480px):
  > Final-year CS graduand Chan Qing Yee ships SecureExam UTM to production — a full-stack zero-trust examination platform with AI behavioural risk scoring, MFA, TOTP, RBAC, and 26 mapped security controls. Deployed on DigitalOcean Singapore.
- Pill row:
  - Gold pill (rust bg): 🏅 DIGITEX 2026 Silver
  - Dark pills: Zero-Trust · AI Risk Scoring · Production Live
- **CTA row (new):** two buttons side by side
  - Primary: **"Download CV"** — rust bg, cream text, download icon → `/cv.pdf` (`download` attribute). `TODO: drop cv.pdf into /public`
  - Secondary: **"View SecureExam Live"** — outline (rust border/text) → `https://secureexam-cqy.tech` (opens new tab)

**Project Dossier Section**
- Section label: Abril Fatface uppercase with code-circle icon — "Project Dossier"
- 2-column grid of project cards
- **Each card now includes a link row** (see card structure below). Live/Code values are in §9.

| Project | Icon | Stack tags | Description |
|---|---|---|---|
| SecureExam UTM | shield | Node.js, React 19, Flask, MySQL | Zero-Trust exam platform. JWT MFA, TOTP, RBAC, browser lockdown, Isolation Forest AI scoring. 26 controls, 8,100+ LOC. DIGITEX 2026 Silver. |
| DuoDrop | transfer | WebRTC, libsodium, PWA | WebRTC P2P file transfer PWA with libsodium E2E encryption. No server persistence — pure peer-to-peer. |
| Huawei Automation Suite | robot | Python, Automation | 7 internal automation tools built at Huawei Malaysia, reducing manual engineering workflows. |
| World Cup 2026 PWA | world | React, Streamlit, Poisson | Malaysian-timezone match planner + Dixon-Coles Poisson predictor for the 48-team 2026 format. |

Project card structure:
- Dark header bar (card-header): icon + title in Josefin Sans 700, uppercase, letter-spacing 1px, cream text; icon in rust
- Body: Josefin Sans 300, 10px, body colour, line-height 1.7
- Stack tags: rust bg, cream text, 8px, uppercase
- **Link row (bottom of card):** small text links with icons — **"Live ↗"** (external-link icon) and **"Code ↗"** (brand-github icon), Courier Prime 9px, rust, underline-on-hover. Hide a link if its URL is a `TODO` (don't render dead links).

**Experience Section**
- Section label: Abril Fatface uppercase with briefcase icon — "Experience"
- Timeline rows:

| Year | Role | Organisation | Description |
|---|---|---|---|
| 2024 | Project Engineer Intern | Huawei Technologies Malaysia | Delivered 7 automation tools, streamlining internal project engineering operations. |
| 2022–25 | FYP — SecureExam UTM | UTM — Dr. Siti Hajar Bt Othman | End-to-end build and production deploy. Zero-Trust, 26 controls, ~8,100 LOC, AI risk scoring. |

Timeline row structure:
- Year column: Courier Prime, 10px, rust, bold, min-width 44px
- Role: Josefin Sans 700, 12px, uppercase, letter-spacing 1px, dark
- Organisation: Josefin Sans 300, 10px, muted, letter-spacing 1px
- Description: Josefin Sans, 10px, body colour, line-height 1.6
- Divider: 1px solid `--color-border-light`

### 6.7 Right Rail (160px)

**Widget: Credentials**
- Four cert rows with icon, name, org:

| Icon | Name | Org |
|---|---|---|
| network | CCNA R&S | Cisco |
| code | DevNet Associate | Cisco |
| cloud | OCI Associate | Oracle |
| shield-check | Cybersecurity | Google |

**Widget: Running Log**
- Stat rows (same format as sidebar):
  - HM → 6:11/km
  - 10K → 5:43/km
  - 5K → 5:15/km
  - VDOT → ~42
  - Goal HM → <2:00

**Widget: Wilderfarer**
- Dark header with mountain icon
- Blockquote (rust left-border, parchment bg, Courier Prime italic):
  > "Not all those who wander are lost — some are just between deployments."
- Identity lines (Josefin Sans 300, 10px, body colour, line-height 1.7):
  - Selenophile
  - Dendrophile
  - Hodophile
- Status (Josefin Sans 700, rust): "JB → Singapore"

### 6.8 Footer
- Background: `--color-bg-dark`
- Border-top: 4px solid `--color-rust`
- Padding: 12px 20px
- Left: Josefin Sans 300, 10px, letter-spacing 2px, uppercase, cream — "© 2026 Chan Qing Yee — qingyee.my"
- Right: links — Email · LinkedIn · GitHub — Courier Prime, 10px, rust, underlined
  - Email → `mailto:qingyee0219@gmail.com`
  - LinkedIn → `https://www.linkedin.com/in/chanqingyee`
  - GitHub → `https://github.com/currylaksa`

### 6.9 Contact Form (Web3Forms)

The `#contact` section uses a **real working form** that runs on the static site with no backend. Submissions are emailed to `qingyee0219@gmail.com`.

**Setup:**
1. Chan registers a free access key at `https://web3forms.com` using `qingyee0219@gmail.com`. `TODO: obtain access key`
2. Store the key as a build-time env var (`PUBLIC_WEB3FORMS_KEY`) — it's a public submission key, safe to expose, but env keeps it out of source.

**Markup (native HTML form — fine in Astro):**
```html
<form action="https://api.web3forms.com/submit" method="POST">
  <input type="hidden" name="access_key" value="YOUR_KEY_HERE">
  <input type="hidden" name="subject" value="New message from qingyee.my">
  <!-- honeypot for spam -->
  <input type="checkbox" name="botcheck" class="hidden" style="display:none">

  <input type="text"  name="name"    placeholder="Your name"  required>
  <input type="email" name="email"   placeholder="Your email" required>
  <textarea name="message" placeholder="Your message" required></textarea>
  <button type="submit">Send Message</button>
</form>
```

**Styling:** inputs on `--color-bg-surface` with `--color-border-heavy` borders, Josefin Sans body text, labels in Courier Prime. Submit button: rust bg, cream text (matches the hero CTA). Show a success state (Web3Forms supports an `ajax` JSON response or a redirect via a `redirect` hidden field to a `/thanks` anchor — pick the simpler one for a static build).

**Fallback:** below the form, a plain line "Prefer email? qingyee0219@gmail.com" as a `mailto:` link, so there's always a no-JS path.

---

## 7. Pages / Sections

### Single Page (Option A — confirmed for v1)
All content on one `index.astro` with smooth scroll to anchor IDs:
- `#home` — Hero (with Download CV + View Live CTAs) + Projects + Experience
- `#about` — Expanded bio, headshot photo, UTM details
- `#projects` — Full project case studies (expanded cards with Live/Code links)
- `#credentials` — All certs with dates
- `#wilderfarer` — Personal brand, running journey, hiking log
- `#contact` — Web3Forms contact form + email/LinkedIn/WhatsApp

> Multi-page Astro (separate pages sharing the 3-column shell component) is a **future** upgrade path, not part of v1.

---

## 8. Content — Personal Info

| Field | Value |
|---|---|
| Full name | Chan Qing Yee |
| Initials | QY |
| Email | qingyee0219@gmail.com |
| Phone / WhatsApp | +60 13-733 9035 (`wa.me/60137339035`) |
| LinkedIn | www.linkedin.com/in/chanqingyee |
| GitHub | currylaksa (`github.com/currylaksa`) |
| University | Universiti Teknologi Malaysia (UTM), Faculty of Computing |
| Programme | CS (Networks & Security) |
| Supervisor | Prof. Madya Ts. Dr. Siti Hajar Binti Othman |
| CGPA | 3.90 |
| Location | Johor Bahru, Malaysia → targeting Singapore |
| Personal brand | Wilderfarer (selenophile · hodophile · dendrophile) |
| FYP project | SecureExam UTM — secureexam-cqy.tech |
| DIGITEX 2026 | Silver Medal, Grand Finale, 15 June 2026, JB |

---

## 9. Content — Projects (Full Detail + Links)

> **Link policy:** render a "Live ↗" / "Code ↗" link only when a real URL is present. Anything marked `TODO` should be left as a non-linked card until Chan supplies the URL.

### SecureExam UTM *(lead case study)*
- **Live URL:** `https://secureexam-cqy.tech` ✅
- **Repo:** `TODO: GitHub repo URL (or mark private)`
- **Stack:** Node.js/Express · React 19/Vite · MySQL · Python Flask · JWT · speakeasy (TOTP) · Nodemailer · DigitalOcean Singapore · Nginx · PM2 · Let's Encrypt
- **Security controls:** **26 mapped** (AI Behavioural Risk Scoring = Control #26)
- **LOC:** ~8,100
- **Key features:**
  - Zero-Trust architecture
  - JWT MFA + TOTP via speakeasy
  - RBAC (Role-Based Access Control)
  - Browser lockdown (anti-tab-switch, copy-paste disabled)
  - Heartbeat token rotation
  - Nodemailer audit notifications
  - AI Behavioural Risk Scoring — Python Flask + Isolation Forest (Control #26)
- **Award:** DIGITEX 2026 Silver Medal
- **FYP supervisor:** Dr. Siti Hajar Bt Othman

### DuoDrop
- **Live URL:** `TODO: live demo URL`
- **Repo:** `TODO: GitHub repo URL`
- **Stack:** WebRTC · libsodium · PWA · DigitalOcean
- **Description:** WebRTC P2P file transfer PWA with libsodium end-to-end encryption. No server-side file persistence — all transfers peer-to-peer. Portfolio piece demonstrating cryptography applied in-browser.

### Huawei Malaysia Automation Suite
- **Live URL:** internal / not public (no link)
- **Repo:** internal / not public (no link)
- **Internship:** Huawei Technologies Malaysia — Project Engineer Intern, 2024
- **Output:** 7 internal automation tools
- **Impact:** Reduced repetitive engineering workflows across project operations
- **Stack:** Python

### World Cup 2026 PWA
- **Live URL:** `TODO: live demo URL`
- **Repo:** `TODO: GitHub repo URL`
- **Stack:** React · Streamlit · Dixon-Coles Poisson model · Kaggle data
- **Description:** Malaysian-timezone-aware match planner + Poisson predictor for the 48-team 2026 format

### VibeUI Challenge 2026 — Hot Meal Bar
- **Live URL:** `TODO: live demo URL`
- **Repo:** `TODO: GitHub repo URL`
- **Stack:** React · Vite · Tailwind · Framer Motion
- **Description:** Hot Meal Bar restaurant site built for the VibeUI Challenge 2026

### Raspberry Pi IoT Lab
- **Live URL:** N/A (hardware project — link to a write-up or demo video instead) `TODO: optional demo video URL`
- **Repo:** `TODO: GitHub repo URL`
- **Stack:** MongoDB Atlas · GPIO LEDs · Python
- **Description:** Emergency/control board architecture with sensor-driven LED state management and cloud data logging

---

## 10. Content — Certifications

| Certification | Issuer | Notes |
|---|---|---|
| CCNA Routing & Switching | Cisco | Core networking |
| CCNA Enterprise (DevNet Associate) | Cisco | Network automation & programmability |
| Oracle Cloud Infrastructure Associate | Oracle | OCI |
| Google Cybersecurity Certificate | Google | Foundational security |

---

## 11. Content — Running / Personal

| Metric | Value |
|---|---|
| HM current pace | 6:11/km |
| 10K current pace | 5:43/km |
| 5K current pace | 5:15/km |
| 3.5K pace | 5:00/km |
| VDOT estimate | ~42–43 |
| HM goal | Sub-2:00 |
| 5K goal | Sub-25 min |
| Other sports | Badminton, hiking |

---

## 12. Key Design Details to Preserve

1. **Parchment grain texture** on page background (SVG noise filter, opacity 0.07)
2. **Repeating rust+cream stripe** at very top of header (6px tall)
3. **SVG 10-point star badge** in header — not a CSS shape, use inline SVG polygon
4. **Abril Fatface** is the identity font — never substitute with another serif
5. **Ticker/marquee** must scroll continuously (CSS animation, not the `<marquee>` tag)
6. **Project card dark headers** — icon in rust, title in cream, dark bg — this contrast is the signature of Version B
7. **Widget dark header bars** throughout sidebar and right rail — consistent pattern
8. **Pulsing dot** on online indicator (CSS keyframe, opacity 1→0.3→1, 2s)
9. **Blockquote** in Wilderfarer widget: rust left-border (4px), parchment bg, Courier Prime italic
10. **Hero CTA buttons** (Download CV + View Live) match the rust/cream button language used by the contact form submit button

---

## 13. Suggested File Structure (Astro)

```
qingyee.my/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro       ← shell: topbar, header, nav, ticker, footer
│   ├── components/
│   │   ├── Sidebar.astro
│   │   ├── RightRail.astro
│   │   ├── HeroSection.astro      ← includes Download CV + View Live CTAs
│   │   ├── ProjectGrid.astro
│   │   ├── ProjectCard.astro      ← includes Live/Code link row
│   │   ├── ExperienceTimeline.astro
│   │   ├── ContactForm.astro      ← Web3Forms native form
│   │   ├── Widget.astro           ← reusable widget shell (dark header + body)
│   │   ├── StatRow.astro
│   │   ├── SkillTag.astro
│   │   └── Ticker.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css             ← tokens, fonts, base resets
├── public/
│   ├── favicon.ico
│   ├── cv.pdf                     ← TODO: Chan drops in
│   └── headshot.jpg               ← TODO: Chan drops in (initials fallback if absent)
├── .env                           ← PUBLIC_WEB3FORMS_KEY=...
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

---

## 14. SEO & Meta

```html
<title>Chan Qing Yee — Portfolio | qingyee.my</title>
<meta name="description" content="Chan Qing Yee — CS (Networks & Security) graduand, DIGITEX 2026 Silver Medalist, Zero-Trust builder, and Wilderfarer. Based in JB, targeting Singapore.">
<meta property="og:title" content="Chan Qing Yee — qingyee.my">
<meta property="og:description" content="Portfolio of a Zero-Trust builder and Wilderfarer. SecureExam UTM, CCNA, DevNet Associate, OCI.">
<meta property="og:url" content="https://qingyee.my">
<meta property="og:image" content="https://qingyee.my/og-image.png">
<link rel="canonical" href="https://qingyee.my">
```
> `TODO: optional og-image.png (1200×630) for nice link previews on LinkedIn/WhatsApp — a rust/cream poster card with the name + "Wilderfarer · Security Engineer" reads well.`

---

## 15. Deployment Notes

- **Host:** Cloudflare Pages (recommended) or Vercel
- **Domain:** `qingyee.my` is registered at **Exabytes**. To point it at Cloudflare Pages:
  - Easiest: change the domain's **nameservers** at Exabytes to the Cloudflare nameservers, then add the Pages custom domain in the Cloudflare dashboard (Cloudflare manages DNS + SSL automatically), **or**
  - Keep DNS at Exabytes and add a **CNAME** record for the apex/`www` pointing to the Pages `*.pages.dev` target (apex CNAME may need a CNAME-flattening/ALIAS record — Cloudflare-managed DNS avoids this).
- **Build command (Astro):** `npm run build`
- **Output dir:** `dist/`
- **Node version:** 18+
- **Env var:** set `PUBLIC_WEB3FORMS_KEY` in the Cloudflare Pages project settings.

---

*Spec v2.0 prepared June 2026. Pass this document to Claude Code as the primary reference. The Version B mockup widget (qingyee_americana_rust) in the Claude conversation is the visual source of truth. The palette in §3 is locked; do not substitute.*
