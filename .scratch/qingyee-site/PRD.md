# PRD: qingyee.my Personal Portfolio Site

Status: ready-for-agent

> Source of truth for the build. Consolidates `qingyee-my-website-spec.md` (v2.0) with the decisions resolved during `/grill-with-docs`. Where this PRD and the spec disagree, **this PRD wins** (the spec was internally inconsistent on project count, status/tense, and page shape). Respect `CONTEXT.md` (glossary) and `docs/adr/0001` (plain CSS) and `docs/adr/0002` (Cloudflare nameservers).

## Problem Statement

Chan Qing Yee — a CS (Networks & Security) graduand from UTM, Huawei Malaysia internship alumni, and DIGITEX 2026 Silver Medalist — is job-hunting for Singapore tech roles and has no personal site. A LinkedIn profile and a CV alone don't make a memorable first impression on a hiring manager, don't showcase SecureExam UTM as a deep case study, and don't express the *Wilderfarer* personal brand. The domain `qingyee.my` is bought but unused.

## Solution

A single-page portfolio at `qingyee.my` in a "Warm Rust & Cream / Retro Americana newspaper" theme. It opens with a 3-column newspaper-grid band (sidebar profile/stats/stack/links · main hero + Project Dossier + experience · right rail credentials/running/Wilderfarer), followed by full-width sections (About, Credentials, Wilderfarer, Contact) reachable via a sticky nav. SecureExam UTM is the lead case study. A real Web3Forms contact form lets recruiters reach Chan with no backend. The site is static, fast, and degrades gracefully while owner-supplied assets (CV, headshot, form key, some project URLs) are still missing.

## User Stories

1. As a hiring manager, I want to land on a striking, distinctive page, so that Chan is memorable among many candidates.
2. As a hiring manager, I want to immediately see Chan's headline achievement (DIGITEX 2026 Silver for SecureExam UTM), so that I grasp the strongest signal in seconds.
3. As a hiring manager, I want to read a concise SecureExam case study (zero-trust, 26 controls, AI risk scoring, ~8,100 LOC), so that I can judge technical depth.
4. As a hiring manager, I want to click through to the live SecureExam deployment, so that I can verify it actually runs.
5. As a recruiter, I want to download Chan's CV in one click, so that I can forward it internally.
6. As a recruiter, I want to know Chan's availability and location ("graduand, open to Singapore roles, JB → Singapore"), so that I can assess fit and logistics.
7. As a hiring manager, I want to browse all six projects in the Project Dossier, so that I see range beyond the lead project.
8. As a hiring manager, I want each project to link to its live demo and/or code when available, so that I can dig deeper — and I want dead/placeholder links hidden so the site feels finished.
9. As a hiring manager, I want to see Chan's work experience timeline (Huawei intern; FYP SecureExam), so that I understand the trajectory.
10. As a hiring manager, I want to see certifications (CCNA R&S, DevNet Associate, OCI Associate, Google Cybersecurity), so that I can confirm credentials.
11. As a recruiter, I want a real working contact form, so that I can message Chan without leaving the site.
12. As a recruiter with JavaScript disabled, I want the contact form to still submit (or an obvious email fallback), so that I can always reach Chan.
13. As a recruiter, I want clear confirmation after I submit the form, so that I know the message was sent.
14. As a visitor, I want email / LinkedIn / WhatsApp links, so that I can reach Chan on my preferred channel.
15. As a visitor, I want to read the expanded About bio and UTM details, so that I understand who Chan is.
16. As a visitor curious about the person, I want the Wilderfarer section (selenophile · dendrophile · hodophile, running journey), so that I get the personal brand.
17. As a runner/peer, I want to see Chan's running paces and goals, so that I connect over the shared interest.
18. As a mobile visitor, I want the layout to collapse cleanly to a single column with a hamburger nav, so that the site is usable on a phone.
19. As a tablet visitor, I want the right rail to fold into the main content, so that nothing is cramped.
20. As any visitor on a long page, I want the nav to stick after I scroll past it, so that I can jump to any section at any time.
21. As a visitor who clicks a nav item, I want to land at the section without it hiding under the sticky nav, so that the target heading is visible.
22. As a visitor with motion sensitivity, I want animations (ticker, reveals, pulsing dot) to pause under `prefers-reduced-motion`, so that the site is comfortable.
23. As Chan, I want to drop `cv.pdf` into `/public` later and have the Download CV button appear automatically, so that I don't need a code change.
24. As Chan, I want to drop `headshot.jpg` later and have it replace the "QY" initials fallback automatically, so that the avatar upgrades without a code change.
25. As Chan, I want to add my Web3Forms key later and have the form activate (falling back to mailto-only until then), so that the contact section is never broken.
26. As Chan, I want to fill in TODO project URLs later and have the Live/Code links appear, so that the cards complete themselves over time.
27. As Chan sharing the link on LinkedIn/WhatsApp, I want good SEO/OG meta, so that the preview card looks professional.
28. As Chan, I want all content centralized as data, so that I can update facts in one place.
29. As a search engine, I want a proper title, description, canonical URL, and semantic markup, so that the site is indexed well.
30. As Chan, I want the site deployed via push-to-GitHub → Cloudflare Pages, so that updates ship automatically.

## Implementation Decisions

**Stack & styling**
- **Astro (static)** for the component model; **plain CSS only — no Tailwind** (see ADR-0001). Use the locked CSS custom properties from spec §3 plus scoped per-component styles. Palette, typography (Abril Fatface / Josefin Sans / Courier Prime), parchment-grain SVG noise, and the inline SVG 10-point star badge are locked per spec §3–§4, §12; do not substitute.
- No heavy client framework. Allowed JS is minimal vanilla: scroll-reveal, sticky-nav assist, contact-form enhancement, mobile hamburger (prefer the CSS checkbox-hack to avoid JS where feasible).

**Content / data layer**
- A typed `content` data layer is the single source of truth: projects, certs, stats, running paces, experience rows, personal info, nav items, ticker string. Components read from it; copy does not live inline in markup.

**Project Dossier**
- Render **6** projects: SecureExam UTM, DuoDrop, Huawei Automation Suite, World Cup 2026 PWA, VibeUI (Hot Meal Bar), Raspberry Pi IoT Lab. (Resolves the spec's 4-vs-6 contradiction.)
- The By-the-Numbers "Projects" stat reads **6** (resolves the spec's "7+").

**`projectLinks` (deep, pure)**
- Input: a project's `{ liveUrl, repoUrl }` where values may be absent or sentinel-TODO. Output: the set of links to render. Encodes the "no dead links" policy — a link renders only when a real URL is present. Used by `ProjectCard` and the hero (analogous logic for the SecureExam live link).

**`assetPresence` (deep, pure/build-time)**
- Resolves three flags at build time: `hasCv` (`/public/cv.pdf` exists), `hasHeadshot` (`/public/headshot.jpg` exists), `hasFormKey` (`PUBLIC_WEB3FORMS_KEY` set). Drives conditional render:
  - `hasCv` false → hide the hero "Download CV" button; "View SecureExam Live" becomes the sole, centered CTA.
  - `hasHeadshot` false → render rust circle with Abril Fatface "QY" initials fallback.
  - `hasFormKey` false → hide the form; show only the "Prefer email? qingyee0219@gmail.com" mailto fallback.

**Status / copy**
- Chan is a **graduand** (coursework + FYP complete). Use present-perfect tense and "available now" framing throughout. Top bar: "Currently: Open to Singapore Roles". (Resolves the spec's student/graduand/graduate mix.)
- I draft the About bio and a short Wilderfarer/running narrative from facts already known. Genuinely-unknown items — cert issue dates and specific hiking-log entries — ship as clearly-marked TODO slots, never fabricated.

**Page shape**
- 3-column band is `#home` (Hero + Project Dossier grid + Experience timeline). Below it, full-width stacked sections: `#about`, `#credentials`, `#wilderfarer`, `#contact`. Sidebar/right-rail widgets are compact "teasers"; the sections below are the detailed versions. `#projects` nav anchors to the grid in the band (no separate expanded section in v1).

**Navigation**
- Nav bar is **sticky** once scrolled past (top bar + header + ticker scroll away). `scroll-margin-top` on sections so anchors clear the sticky nav. Home is the default active (rust) item. Scrollspy active-state is out of scope for v1.

**Contact form (`contactForm`)**
- Web3Forms native POST as the baseline (works with JS off — Web3Forms shows its own page). Progressive enhancement: vanilla `fetch` submits in the background and swaps the form for an inline rust/cream success message. Honeypot `botcheck` field retained. Email target: `qingyee0219@gmail.com`. Key read from `PUBLIC_WEB3FORMS_KEY` env var.

**Responsive**
- ≥960px full 3-column; 600–959px right rail folds into main, sidebar becomes a top band; <600px single-column stack with hamburger nav.

**SEO/meta**
- Title, description, canonical, and OG tags per spec §14. `og-image.png` (1200×630) is a TODO slot.

**Deployment (see ADR-0002)**
- `git init` → push to a new GitHub repo under the `currylaksa` account → connect to Cloudflare Pages (git integration, push-to-deploy, branch previews). Build `npm run build`, output `dist/`, Node 18+. `PUBLIC_WEB3FORMS_KEY` set in Pages project settings. DNS: move `qingyee.my` nameservers from Exabytes to Cloudflare (verify no existing MX/records first).

## Testing Decisions

- **What makes a good test here:** assert external behavior through the module's public interface, not internals. For these two pure functions: feed inputs, assert outputs. No DOM, no network, no snapshotting markup.
- **`projectLinks` — tested.** Cases: both URLs present → both links; only live present → live only; only repo present → code only; both absent/TODO → no link row; sentinel-TODO treated identically to absent.
- **`assetPresence` — tested.** The present/absent matrix for `hasCv` / `hasHeadshot` / `hasFormKey` → correct flag object. Stub the filesystem check and env lookup at the boundary so the resolver's decision logic is what's under test.
- **Not tested:** presentational Astro components, CSS layout, the `contactForm` client handler, and `scrollReveal` — verified visually / manually. (Per the agreed view that TDD is overkill for a presentational site; logic lives only in the two pure helpers.)
- **Prior art:** none — greenfield repo. Establish a minimal test runner (e.g. Vitest) alongside these two helpers as the pattern for any future logic.

## Out of Scope

- Multi-page Astro (separate routed pages) — future upgrade; v1 is single-page.
- Scrollspy / active-section highlight while scrolling.
- A separate expanded `#projects` case-study section distinct from the band grid.
- CMS / blog / dynamic content.
- Analytics, cookie banners, i18n.
- Fabricated content for unknown facts (cert dates, hiking log) — slots only.
- `og-image.png`, `favicon` artwork, real `cv.pdf`, real `headshot.jpg`, Web3Forms key, and TODO project URLs are owner-supplied; the build wires the slots but does not invent them.

## Further Notes

- **Owner action items (block full go-live, not the build):** drop `cv.pdf` + `headshot.jpg` into `/public`; register a Web3Forms key and set `PUBLIC_WEB3FORMS_KEY`; supply TODO project URLs (DuoDrop, World Cup, VibeUI, Raspberry Pi); verify `qingyee.my` has no existing MX/DNS before the nameserver flip.
- **Canonical facts** (see `CONTEXT.md`): SecureExam = exactly **26** controls (AI Behavioural Risk Scoring = Control #26); DIGITEX 2026 = **Silver**; Wilderfarer traits = selenophile · dendrophile · hodophile; project count = **6**.
- The Version B mockup (`qingyee_americana_rust`) referenced in the spec is the visual source of truth for anything ambiguous in layout detail.
