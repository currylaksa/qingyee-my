# qingyee.my — Rebuild Brief (v1)

**Owner:** Chan Qing Yee (Wilderfarer) · CS (Networks & Security), UTM 2026
**Goal of site:** Land a **Network Security Engineer** role in **Singapore** (mid-sized fintech, cybersecurity, enterprise SaaS, telco). Priorities for target employers: pay + brand recognition.
**This is a full rebuild** of the existing site, not a patch.

---

## 0. Instructions to Claude Code — READ THIS FIRST

Do **not** start editing or generating code yet.

1. Read this entire brief.
2. Then **interview me in small batches of questions** (3–5 at a time) until you are genuinely confident about every ambiguity — content copy, exact asset paths, project URLs, hosting target, anything underspecified below.
3. Restate the plan back to me (page list, components, milestones) and get my explicit confirmation.
4. **Only then** begin making changes, and work in reviewable increments (one page / one component at a time), not a single giant commit.
5. If at any point you're unsure, ask rather than assume. A wrong assumption costs more than a question.

A starter list of questions you should ask me is in **§14**.

---

## 1. Audience & the 20-second test

Two readers, design for both:

- **Recruiter / HR (phone screen, ~20s skim):** needs to instantly see role fit, certs, location/availability, one flagship project, and a CV link.
- **Technical hiring manager (digs in):** needs to *explore* real architecture and threat-modeling, see network-layer + application-layer security, and come away with a talking point for the interview.

Every page must pass the recruiter skim above the fold **and** reward the technical reader who scrolls.

---

## 2. What's wrong with the current site (and what to remove)

The current build (Retro Americana / "newspaper") fails on three fronts. The rebuild fixes each:

- **Hard to read** → low contrast (red text on cream), everything in small-caps with heavy letter-spacing, newspaper density with 5 competing columns. **Fix:** high-contrast ink on near-white, real paragraph type, generous whitespace, single clear column of attention.
- **No surprise** → static poster, nothing demonstrates security skill. **Fix:** one tasteful interactive "wow moment" (the zero-trust diagram, §8).
- **Wrong thing in the spotlight** → SecureExam buried as a card; running/Wilderfarer content competes for the fold. **Fix:** pro-first hierarchy, SecureExam promoted to a full case study, personality demoted to a tasteful strip.

**Kill:** the ticker bar, the starburst CGPA badge, the dense left/right sidebars, the all-small-caps body text, red-on-cream body copy. Keep the *spirit* of warmth (a refined rust accent) but not the density.

---

## 3. Positioning & messaging

**One-line value prop (hero):**
> Network & Security Engineer — I design, build, and harden zero-trust systems, end to end.

**Three proof pillars (quiet badges under the hero):**
1. Cisco CCNA (R&S, Enterprise, DevNet Associate) + Google Cybersecurity + OCI Associate
2. Production zero-trust platform (SecureExam — DIGITEX 2026 Silver)
3. Huawei Malaysia internship — built 7 network automation tools

**The strategic narrative to thread throughout:** application-layer zero trust (SecureExam) **+** network-layer security (CCNA + the networking labs in §7) = full-stack defense-in-depth. This is the story that makes a *Network* Security Engineer hire make sense.

---

## 4. Decisions locked

| Decision | Choice |
|---|---|
| Aesthetic | Hybrid — clean, light, recruiter-safe base + tasteful terminal/SOC accents |
| Content weighting | Pro-first; Wilderfarer personality second |
| The "surprise" | **One** wow moment: interactive SecureExam zero-trust architecture diagram |
| Default theme | Light (recruiter-safe). Dark-mode toggle = optional stretch goal |
| Stack | **Next.js** + Tailwind |
| Architecture | Multi-page (Home / Projects / etc.) |
| Assets | All ready (CV, headshot, project live + repo URLs) |

---

## 5. Tech stack & hosting

- **Framework:** Next.js (App Router) + TypeScript + Tailwind CSS.
- **Preserve the "hardened static site" story** (it's a genuine flex for a security role): prefer **static generation** for all content pages. Use `output: 'export'` (static export) if no server features are needed, or default static rendering otherwise. The only client-side JavaScript should be the interactive diagram and the optional theme toggle.
- **Fonts via `next/font`** (self-hosted, no layout shift): **Geist Sans** (body/UI) + **Geist Mono** (terminal accents, code, labels). One serif (e.g. Fraunces) reserved *only* for the single Wilderfarer pull-quote.
- **Hosting:** Vercel is the path of least resistance for Next.js. If staying on Cloudflare Pages, use `@cloudflare/next-on-pages` (or static export → Pages). Decide with me (§14).
- **Repo:** github.com/currylaksa (confirm target repo/branch with me).

---

## 6. Information architecture

Top nav (sticky, minimal): **Home · Projects · Credentials · About · Contact**
Persistent: a **"Download CV"** button (primary accent) and a small **"Open to Singapore roles"** status pill.

Pages:
1. `/` Home
2. `/projects` Projects index → `/projects/secureexam` (the case study) + other project pages or anchored sections
3. `/credentials` Certifications & education
4. `/about` About + Wilderfarer strip
5. `/contact` Contact + links (GitHub, LinkedIn, email)

(If you'd rather collapse Projects detail into the index, raise it with me in §14.)

---

## 7. Page-by-page spec

### Home (`/`)
- **Hero:** name, the one-liner (§3), the three proof pillars as quiet mono-labelled badges, two CTAs: *View SecureExam case study* (primary) and *Download CV* (secondary). A small `// open to Singapore roles` status line in mono.
- **Featured case study teaser:** SecureExam — one tight paragraph + a static preview of the architecture diagram that links into the full case study.
- **Selected projects:** 3 cards (SecureExam, plus 2 of: DuoDrop, networking labs, World Cup PWA) with tech tags. "See all projects →".
- **Credentials strip:** logos/labels for CCNA R&S, DevNet, OCI, Google Cybersecurity. "See all →".
- **Wilderfarer strip:** small, tasteful — the serif pull-quote ("Not all those who wander are lost…"), selenophile/hodophile/dendrophile, and a compact running-stats line. One row, not a sidebar.
- **Contact CTA footer.**

### SecureExam case study (`/projects/secureexam`) — the centerpiece
Structure it like an engineer's write-up, not a brag:
- **Header:** title, "DIGITEX 2026 Silver", live link (secureexam-cqy.tech), repo link, role ("solo full-stack, FYP under Dr. Siti Hajar Othman").
- **At a glance:** ~8,100 LOC · 26 controls · 35+ endpoints · 4 RBAC roles · Node/Express + React + MySQL 8 · deployed on DigitalOcean Singapore.
- **The problem / threat model:** what an online exam platform must defend against (cheating, account takeover, data theft, tampering).
- **THE WOW MOMENT — interactive zero-trust architecture diagram (§8).** This is the anchor of the page.
- **Deployment & hardening:** Nginx reverse proxy, UFW, fail2ban, Let's Encrypt TLS, PM2 (two processes: `secureexam-backend` Node + `risk-scorer` Flask on 127.0.0.1:8001), least-privilege MySQL user, SSH hardening. Frame this as *I shipped and operated this*, which is rare for a fresh grad.
- **What I'd do next:** brief, honest forward-look (shows maturity).

### Projects (`/projects`)
Cards, each with a 1-line summary + tech tags + live/repo links:
- **SecureExam** (links to case study).
- **Networking lab portfolio** (CRITICAL for a *network* security role — give this real estate):
  - Project 1 — Enterprise network simulation (OSPF, VLANs, ACLs) in Packet Tracer.
  - Project 2 — pfSense + Snort IDS in GNS3 (the network-layer companion to SecureExam's app-layer zero trust — state this link explicitly).
  - Project 3 — BGP peering lab (stretch).
- **Huawei automation suite** — 7 network automation tools (internship). Keep it credible and specific without breaching any NDA; confirm what's shareable with me.
- **DuoDrop** — WebRTC P2P file transfer PWA with libsodium end-to-end encryption (a nice security-flavored side project).
- **World Cup 2026 PWA** — "Worth Staying Up For" match planner (shows product range; keep it lower in the list).
- *(Optional)* JimatJalan (Vibeathon), Trend Radar.

### Credentials (`/credentials`)
- Certifications grid: CCNA Routing & Switching, CCNA Enterprise, Cisco DevNet Associate, Google Cybersecurity, Oracle OCI Associate. Each with issuer + (optional) verify link.
- Education: B.Sc. Computer Science (Networks & Security), UTM, 2026, CGPA 3.90.
- Keep it scannable — this is the recruiter's checklist page.

### About (`/about`)
- Short professional bio framed toward the SG network-security goal.
- Wilderfarer section: identity (selenophile, hodophile, dendrophile), running paces, the human side — tasteful, one screen, not dominant.
- Headshot here (not crowding the hero).

### Contact (`/contact`)
- Email, LinkedIn, GitHub (currylaksa), location (JB/SG-ready), "Open to Singapore roles."
- Simple contact form (Web3Forms) — **note:** if static export, ensure the form posts to an external endpoint, no server route needed.

---

## 8. The wow moment — interactive zero-trust architecture diagram

A clickable, defense-in-depth diagram that traces a request through SecureExam's 8 security layers. Each layer reveals the **control** it enforces and the **threats it stops**. Built as a client component (the only meaningful interactive island on the site).

**Interaction:** a vertical "request path" rail of 8 layers (numbered like network hops, mono). Clicking a layer updates a detail panel with the control description + "threats stopped" pills. Default-select layer 01. On load, animate a subtle "packet" travelling down the rail (respect `prefers-reduced-motion`). Add deep-link anchors (e.g. `#layer-authz`) so it can be linked straight from a message to an interviewer.

**Data (use verbatim, tighten as needed):**

| # | Layer | tag | Control | Threats stopped |
|---|---|---|---|---|
| 01 | Browser lockdown | client | Fullscreen lockdown, copy/paste + devtools restrictions, heartbeat tokens rotating through the session | Exam cheating; stale-session hijack |
| 02 | TLS 1.3 | transport | End-to-end HTTPS (Let's Encrypt) + HSTS | Eavesdropping; man-in-the-middle |
| 03 | Nginx reverse proxy | edge | App fronted behind UFW firewall, fail2ban, rate limiting; Node never publicly exposed | Brute force; port scanning; direct app exposure |
| 04 | JWT + TOTP MFA | authn | Short-lived JWTs + TOTP multi-factor auth | Credential stuffing; password reuse |
| 05 | RBAC · 4 roles | authz | Least privilege across 4 roles and 35+ endpoints | Privilege escalation; broken access control (IDOR) |
| 06 | Node + Express | app | Input validation + secure headers across 25+ mapped controls | XSS; CSRF; injection |
| 07 | MySQL 8 | data | Least-privilege DB user, parameterized queries, hardened auth | SQL injection; data exfiltration |
| 08 | Risk scorer | detection | Flask microservice (Control #26), Isolation Forest anomaly model, bound to localhost (127.0.0.1:8001) | Anomalous exam behavior |

**Visual rules:** light surfaces, secure/active states in the brand accent, "threats stopped" pills in muted red, mono kickers (`layer 04 · authn`). Keep it readable — restraint is the point.

---

## 9. Secondary security touches (small, tasteful)

- **Footer "site security" badge:** display the site's own security posture (e.g. "Security headers: A · TLS: A · 0 client trackers"). Can be a static, verifiable claim rather than a live client-side scan (which is fragile). Links to a real scan (e.g. securityheaders.com / SSL Labs report).
- **`/.well-known/security.txt`** — a real, correct one. Cheap, and exactly the kind of detail a security team notices.
- **`/whoami`-style flourish** is optional; only if it doesn't hurt readability.

---

## 10. Visual design system

The readability fix lives here — implement precisely.

**Palette (light, recruiter-safe, hybrid):**
- Paper: `#FCFBF8` (warm off-white); cards `#FFFFFF`
- Ink (primary text): `#1A1A1A` (high contrast — this is the core fix)
- Muted text: `#6B6862`
- Brand accent (links, CTAs, active states): a refined **deep rust** `#B23A1F` (keeps continuity with the old identity; dark enough for AA on white) — use sparingly, **never** for body text
- Secure/pass green (badge, diagram "pass"): `#1F7A4D`
- Threat red (diagram pills only): `#C0392B`
- Borders: hairline, low-opacity neutral

**Typography:**
- Body/UI: **Geist Sans**, 16–18px, line-height 1.6–1.7
- Terminal accents, kickers, code, labels: **Geist Mono** (e.g. `// 01 — case study`)
- One serif (Fraunces) for the single Wilderfarer pull-quote only
- **Sentence case everywhere.** No all-caps body, no heavy letter-spacing on paragraphs (the old site's mistake)
- Clear hierarchy: large confident h1, generous spacing between sections

**Components:** hairline-bordered cards (radius ~12px), mono kicker labels, tech-tag pills, quiet proof badges, the interactive diagram, a scannable credentials grid, sticky minimal nav, a status pill.

**Motion:** subtle and purposeful — fade/slide-in on scroll, the diagram's packet animation, soft hover states. All gated behind `prefers-reduced-motion`. No gratuitous movement (we want *tasteful*, not busy).

**Whitespace:** generous. The single biggest visual upgrade over the current site is breathing room.

---

## 11. Performance, security & SEO requirements

These aren't just hygiene — for a security candidate they *are* the portfolio.

- **Lighthouse 95+** across Performance / Accessibility / Best Practices / SEO.
- **Minimal client JS:** only the diagram + optional theme toggle hydrate.
- **Security headers (target A grade):** CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. (Configure via `next.config` headers or host config; if static export, set at the host/CDN.)
- **No third-party trackers / no ad scripts.** "Zero trackers" is a deliberate statement.
- **SEO/meta:** per-page titles + descriptions, Open Graph + Twitter cards (so a shared link looks sharp to a recruiter), `sitemap.xml`, `robots.txt`, JSON-LD `Person` schema.
- **Favicon + social share image** (use the rust/QY mark, cleaned up).

---

## 12. Accessibility

- WCAG AA contrast (the palette above is chosen for this).
- Full keyboard navigation; visible focus rings.
- The diagram: real `<button>`s, ARIA for the detail panel, screen-reader summary, motion opt-out.
- Semantic landmarks, alt text on the headshot and any project imagery.

---

## 13. Assets checklist (Chan to provide / confirm paths)

- [ ] `cv.pdf` (final)
- [ ] `headshot.jpg`
- [ ] SecureExam: live URL (secureexam-cqy.tech) + repo URL
- [ ] DuoDrop: live + repo URLs
- [ ] World Cup 2026 PWA: live + repo URLs
- [ ] Networking labs: any diagrams/screenshots (Packet Tracer, GNS3) to embed
- [ ] Huawei automation suite: what's shareable (NDA-safe)
- [ ] LinkedIn URL, email, Web3Forms key
- [ ] Cert verify links (optional)

---

## 14. Suggested clarifying questions for Claude Code to ask me

Ask these (and any others) before building:

1. **Hosting:** Vercel or Cloudflare Pages? (affects how security headers + the contact form are wired)
2. **Repo:** which repo/branch, and do you want the old site preserved on a branch first?
3. **Projects layout:** dedicated detail pages per project, or one index with anchored/expandable cards?
4. **Copy:** do you want me to draft all the body copy for your review, or will you supply it?
5. **Dark mode:** ship the light/dark toggle in v1, or defer it?
6. **Huawei content:** exactly what can be shown without breaching NDA?
7. **Diagram scope:** is the 8-layer set in §8 final, or do you want to add/remove layers?
8. **Security badge:** static verifiable claim + link to a real scan, or skip it for v1?
9. **Contact form:** Web3Forms confirmed, and what destination email?
10. **Networking labs:** do you have screenshots/topologies to embed, or should these be text-only for now?

---

## 15. Suggested build order

1. Project scaffold (Next.js + TS + Tailwind + fonts), design tokens, layout shell + nav/footer.
2. Home page (hero, pillars, teasers).
3. SecureExam case study **with the interactive diagram** (highest-value page — build early to de-risk).
4. Projects index + networking labs.
5. Credentials + About/Wilderfarer + Contact.
6. SEO/meta, security headers, security.txt, sitemap, OG images.
7. Lighthouse + a11y + headers pass; deploy.

---

*End of brief. Claude Code: begin with §0 — interview first, build second.*
