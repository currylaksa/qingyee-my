# 08 — Full-width sections: About, Credentials, Wilderfarer

Status: ready-for-agent

## Parent

`.scratch/qingyee-site/PRD.md`

## What to build

The detailed full-width sections stacked below the 3-column band (rail widgets stay as teasers; these are the expanded versions).

- `#about`: expanded bio (drafted from known facts — graduand, UTM CS Networks & Security, Huawei intern, DIGITEX Silver, Wilderfarer), UTM/supervisor details, headshot (reuse avatar/`assetPresence` behavior at larger size).
- `#credentials`: all four certs with issuer; cert issue **dates left as clearly-marked TODO slots** (not invented).
- `#wilderfarer`: personal-brand + running-journey narrative (drafted from facts), paces from content data, and a **TODO** slot for specific hiking-log entries.

## Acceptance criteria

- [ ] Three full-width sections render below the band with anchor ids `#about`, `#credentials`, `#wilderfarer`.
- [ ] Drafted bio + Wilderfarer narrative read naturally and contain no fabricated facts.
- [ ] Cert dates and hiking-log entries appear as visible TODO slots, never as made-up values.

## Blocked by

- 06 — Left sidebar

## Comments

**Implemented.** Three full-width sections below the band: `AboutSection` (#about — drafted 2-para bio + UTM/supervisor detail list + 120px headshot via `assetPresence`/QY fallback), `CredentialsSection` (#credentials — 4 cert cards, each date a visible `Issued — TODO` slot), `WilderfarerSection` (#wilderfarer — drafted narrative + identity terms + Running Log paces + `TODO: add recent trails` hiking slot). Bio/narrative drafted from known facts only; no fabricated cert dates or hiking entries.

Verified: build OK; all 3 anchors present; 4 cert TODO slots + 1 hiking TODO; supervisor rendered; 16 tests green.
