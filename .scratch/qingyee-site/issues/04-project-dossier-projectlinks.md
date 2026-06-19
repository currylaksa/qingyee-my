# 04 — Project Dossier + projectLinks helper (tested)

Status: ready-for-agent

## Parent

`.scratch/qingyee-site/PRD.md`

## What to build

The Project Dossier grid in the main column, plus the `projectLinks` helper encoding the "no dead links" policy.

- `projectLinks` (deep, pure): given a project's `{ liveUrl, repoUrl }` (values may be absent or sentinel-TODO), returns the set of links to render. **Tested**.
- `ProjectGrid` + `ProjectCard`: 2-column grid rendering **all 6 projects** (SecureExam UTM, DuoDrop, Huawei Automation Suite, World Cup 2026 PWA, VibeUI Hot Meal Bar, Raspberry Pi IoT Lab) from the content data.
- Each card: dark header bar (icon in rust, title in cream), body copy, stack tags (rust bg / cream text), and a Live ↗ / Code ↗ link row driven by `projectLinks` — TODO/absent links are not rendered.

## Acceptance criteria

- [ ] `projectLinks` unit tests cover: both URLs, live-only, repo-only, both absent/TODO, and TODO-treated-as-absent.
- [ ] All 6 projects render as cards with correct headers, stack tags, and copy.
- [ ] Cards with only TODO URLs show no link row; cards with a real URL show only the real link(s).
- [ ] Supplying a TODO URL later in the content data makes its link appear with no component change.

## Blocked by

- 01 — Foundation & deployable shell
