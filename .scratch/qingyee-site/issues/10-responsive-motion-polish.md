# 10 — Responsive + motion polish

Status: ready-for-agent

## Parent

`.scratch/qingyee-site/PRD.md`

## What to build

The cross-cutting layout-collapse and motion pass, applied once all page regions exist.

- Breakpoints: ≥960px full 3-column; 600–959px right rail folds into main and sidebar becomes a top band; <600px single-column stack with a hamburger nav (prefer the CSS checkbox-hack to avoid JS).
- Sticky-nav anchoring: `scroll-margin-top` on all sections so anchor jumps clear the sticky nav; smooth scroll.
- `scrollReveal`: minimal vanilla IntersectionObserver entrance fades on sections/cards.
- `prefers-reduced-motion`: pause/disable ticker, scroll reveals, and the pulsing dot when the user prefers reduced motion.

## Acceptance criteria

- [ ] Layout matches the three breakpoint behaviors; mobile nav is usable as a hamburger.
- [ ] Clicking any nav item lands at the section with its heading visible (not hidden under the sticky nav).
- [ ] Entrance reveals work and respect `prefers-reduced-motion`; ticker and pulsing dot also halt under reduced motion.
- [ ] No layout breakage at 599px / 600px / 959px / 960px boundaries.

## Comments

**Implemented.** Breakpoints: ≥960 full 3-col; 600–959 right rail folds in + sidebar/rail become horizontal wrap-bands; <600 single-column stack with **CSS-only hamburger** (checkbox-hack, animated to X, no JS). `scroll-margin-top` on all `[id]` header/sections so sticky-nav anchors clear. `scrollReveal`: IntersectionObserver in BaseLayout reveals 7 `[data-reveal]` sections; `.js` class set pre-paint so no-JS shows all (progressive). `prefers-reduced-motion` honored across ticker, pulsing dot, nav transitions, and reveals (forced visible).

Verified: build OK; observer + js-class + hamburger + 7 reveal targets in output; reduced-motion guards in compiled CSS + inline; 16 tests green.

## Blocked by

- 03 — Hero band + assetPresence helper (tested)
- 04 — Project Dossier + projectLinks helper (tested)
- 05 — Experience timeline
- 06 — Left sidebar
- 07 — Right rail
- 08 — Full-width sections: About, Credentials, Wilderfarer
- 09 — Contact section + Web3Forms form
