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

## Blocked by

- 03 — Hero band + assetPresence helper (tested)
- 04 — Project Dossier + projectLinks helper (tested)
- 05 — Experience timeline
- 06 — Left sidebar
- 07 — Right rail
- 08 — Full-width sections: About, Credentials, Wilderfarer
- 09 — Contact section + Web3Forms form
