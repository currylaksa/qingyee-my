# 02 — Deploy pipeline live

Status: ready-for-human

## Parent

`.scratch/qingyee-site/PRD.md`

## What to build

Wire continuous deployment so the shell (and every later push) ships to `qingyee.my`. HITL — requires the owner's GitHub/Cloudflare credentials and a DNS change.

- `git init`, `.gitignore`, initial commit; push to a new GitHub repo under the `currylaksa` account.
- Connect the repo to Cloudflare Pages (git integration): build `npm run build`, output `dist/`, Node 18+.
- Add `PUBLIC_WEB3FORMS_KEY` as a Pages environment variable (value supplied later; slot can be empty for now).
- DNS per ADR-0002: **first verify** `qingyee.my` has no existing MX/other records to preserve, then move nameservers from Exabytes to Cloudflare and add the Pages custom domain (apex + www).

## Acceptance criteria

- [ ] Repo exists on GitHub under currylaksa and pushes succeed.
- [ ] Cloudflare Pages builds the repo on push; preview URLs appear for branches/PRs.
- [ ] Existing DNS records on qingyee.my audited and migrated/confirmed-empty before the nameserver flip.
- [ ] `https://qingyee.my` (and www) serve the site over Cloudflare-managed SSL.
- [ ] `PUBLIC_WEB3FORMS_KEY` env slot present in Pages settings.

## Blocked by

- 01 — Foundation & deployable shell
