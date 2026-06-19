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
