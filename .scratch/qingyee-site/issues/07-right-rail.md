# 07 — Right rail

Status: ready-for-agent

## Parent

`.scratch/qingyee-site/PRD.md`

## What to build

The 160px right rail using the widget primitives from issue 06.

- Credentials widget: four cert rows (CCNA R&S / Cisco, DevNet Associate / Cisco, OCI Associate / Oracle, Cybersecurity / Google) with icons.
- Running Log: HM 6:11/km · 10K 5:43/km · 5K 5:15/km · VDOT ~42 · Goal HM <2:00.
- Wilderfarer widget: rust-left-border parchment blockquote (Courier Prime italic), identity lines (Selenophile · Dendrophile · Hodophile), status "JB → Singapore".

## Acceptance criteria

- [ ] All three widgets render from content data using the shared `Widget`/`StatRow` shells.
- [ ] Blockquote styling matches spec §12 (4px rust left border, parchment bg, Courier Prime italic).
- [ ] Identity lines use the exact three -phile terms.

## Blocked by

- 06 — Left sidebar
