# 03 — Hero band + assetPresence helper (tested)

Status: ready-for-agent

## Parent

`.scratch/qingyee-site/PRD.md`

## What to build

The hero region of the main column, plus the shared `assetPresence` build-time helper it is the first to consume.

- `assetPresence` (deep, pure): resolves `hasCv` (`/public/cv.pdf` exists), `hasHeadshot` (`/public/headshot.jpg` exists), `hasFormKey` (`PUBLIC_WEB3FORMS_KEY` set). Filesystem/env access isolated at the boundary so the decision logic is testable. **Tested** (see Testing Decisions in PRD).
- Hero section: centered "Featured" label with rules, Abril Fatface headline ("Zero-Trust Exam Platform Earns Silver at DIGITEX 2026"), body copy (graduand / present-perfect tense), pill row (gold DIGITEX Silver + dark Zero-Trust / AI Risk Scoring / Production Live).
- CTA row: "Download CV" (rust, → `/cv.pdf` with `download`) rendered **only when `hasCv`**; if absent, "View SecureExam Live" (outline, → `https://secureexam-cqy.tech`, new tab) becomes the sole, centered CTA.

## Acceptance criteria

- [ ] `assetPresence` unit tests pass for the full present/absent matrix of `hasCv`/`hasHeadshot`/`hasFormKey`.
- [ ] Hero renders headline, body, pills, and CTAs matching spec §6.6 styling.
- [ ] With no `cv.pdf`, the Download CV button is absent and "View SecureExam Live" is centered as the sole CTA.
- [ ] Dropping a `cv.pdf` into `/public` and rebuilding makes the Download CV button appear with no code change.

## Blocked by

- 01 — Foundation & deployable shell

## Comments

**Implemented.** `assetPresence` split into pure `resolveAssetPresence`/`isUsableKey` (tested, 7 cases incl. placeholder "NA"/"TODO" → no key) + `assetPresence.server.ts` I/O reader (fs existsSync + `import.meta.env.PUBLIC_WEB3FORMS_KEY`). `HeroSection` renders Featured label, headline, body (graduand/present-perfect), gold + dark pills, CTA row. `hasCv` false → Download CV hidden, "View SecureExam Live" sole + centered (`cta single`).

Verified: `npm test` 7/7 green; build no-cv → only View Live + `cta single`; temp `cv.pdf` → Download CV appears, `cta` un-centered, no code change. Temp file removed.
