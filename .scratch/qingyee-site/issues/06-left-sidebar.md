# 06 — Left sidebar

Status: ready-for-agent

## Parent

`.scratch/qingyee-site/PRD.md`

## What to build

The 180px left sidebar and the reusable widget primitives it establishes for the rest of the site.

- `Widget` (dark header bar + body), `StatRow` (label left / Courier Prime value right), `SkillTag` (filled + outline variants) — reusable shells.
- Profile widget: 78px avatar — render `/public/headshot.jpg` cropped to circle when `assetPresence.hasHeadshot`, else rust circle with Abril Fatface "QY" initials; name, "Wilderfarer" sub, programme line.
- Online indicator: dark bg, rust pulsing dot, "Online — JB, Malaysia".
- By-the-Numbers: LOC 8,100+ · Controls **26** · **Projects 6** · Certs 4 · HM Target <2:00.
- Stack: filled tags (Node.js · React · MySQL · Python · Nginx · OCI) + outline tags (CCNA · Flask · JWT).
- Find Me: GitHub, LinkedIn, Email (mailto), WhatsApp links from content data.

## Acceptance criteria

- [ ] `Widget`/`StatRow`/`SkillTag` are reusable and used by the sidebar widgets.
- [ ] Avatar shows QY initials with no headshot; dropping `headshot.jpg` swaps to the photo with no code change.
- [ ] By-the-Numbers shows Projects = 6 and Controls = 26 (the resolved values, not 7+).
- [ ] Pulsing dot animates via CSS keyframe; all Find Me links use correct hrefs.

## Blocked by

- 01 — Foundation & deployable shell
- 03 — Hero band + assetPresence helper (tested)
