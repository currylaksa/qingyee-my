# 09 — Contact section + Web3Forms form

Status: ready-for-agent

## Parent

`.scratch/qingyee-site/PRD.md`

## What to build

The `#contact` full-width section with a real working form and channel links.

- `ContactForm`: native HTML POST to `https://api.web3forms.com/submit` (baseline, works with JS off), hidden `access_key` (from `PUBLIC_WEB3FORMS_KEY`), `subject`, and a hidden `botcheck` honeypot; name/email/message fields.
- Progressive enhancement: vanilla `fetch` submits in the background and swaps the form for an inline rust/cream success message (no navigation). If JS is off, native POST still works.
- Form rendered **only when `assetPresence.hasFormKey`**; otherwise show only the "Prefer email? qingyee0219@gmail.com" mailto fallback. The mailto fallback line is always present.
- Contact channels: email · LinkedIn · WhatsApp (+60 13-733 9035) from content data.

## Acceptance criteria

- [ ] With a key set, submitting shows the inline success state without leaving the page; with JS disabled the native POST still submits.
- [ ] With no key, the form is hidden and only the mailto fallback shows.
- [ ] Honeypot field present and hidden; email target is qingyee0219@gmail.com.
- [ ] Email/LinkedIn/WhatsApp links use correct hrefs.

## Blocked by

- 03 — Hero band + assetPresence helper (tested)

## Comments

**Implemented.** `ContactSection` (#contact): when `hasFormKey`, renders native POST form to web3forms (hidden `access_key` from `PUBLIC_WEB3FORMS_KEY`, `subject`, off-screen `botcheck` honeypot, name/email/message) + progressive `fetch` enhancement that swaps to an inline rust/cream success state (works as plain POST with JS off). When no usable key, form is hidden and only the notice + `mailto` show. "Prefer email?" mailto fallback always present. Channels: Email / LinkedIn / WhatsApp.

Verified: no-key build → 0 forms, notice + mailto, channels present; `PUBLIC_WEB3FORMS_KEY=...` build → 1 form with real access_key, honeypot, message field; 16 tests green. CF env currently `NA` → form self-hides until real key set.
