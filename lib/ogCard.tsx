/* ============================================================
   Shared social card, rendered at build time by next/og and used
   by both app/opengraph-image.tsx and app/twitter-image.tsx.

   Everything reads from content.ts, so the card can never drift
   from the site's headline again — the previous card was a
   hand-made PNG and went stale the moment the copy changed.

   Satori (the renderer behind ImageResponse) supports a subset of
   CSS: flexbox only, no CSS variables, and any element with more
   than one child needs an explicit display:flex.
   ============================================================ */
import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { personalInfo, certs } from './content';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';
export const OG_ALT = `${personalInfo.fullName} — ${personalInfo.tagline}`;

// Design tokens, mirrored from globals.css. Satori cannot read CSS vars.
const PAPER = '#fcfbf8';
const CARD = '#ffffff';
const INK = '#1a1a1a';
const MUTED = '#6b6862';
const ACCENT = '#b23a1f';
const SECURE = '#1f7a4d';
const HAIRLINE = 'rgba(26,26,26,0.1)';

/** The short, punchy card headline — deliberately not the full value prop,
    which is ~95 characters and would force the type down by a third. */
const HEADLINE = 'I design, secure, and operate networks.';
const SUBHEAD = 'Routing · segmentation · zero-trust';
/** Card-specific copy, like the headline — kept short enough for one row. */
const CHIPS = ['OSPF', 'VLANs', 'ACLs', 'IPsec VPN', 'Firewalls'];

const font = (file: string) =>
  readFileSync(path.join(process.cwd(), 'node_modules/geist/dist/fonts', file));

export function renderOgCard() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: PAPER,
          fontFamily: 'Geist',
        }}
      >
        {/* ── Left: identity + headline ─────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 760,
            padding: '56px 48px',
          }}
        >
          {/* Wordmark */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: 10,
                backgroundColor: INK,
                color: PAPER,
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              QY
            </div>
            <div style={{ marginLeft: 14, fontSize: 22, color: MUTED }}>
              qingyee.my
            </div>
          </div>

          <div
            style={{
              marginTop: 30,
              fontSize: 22,
              fontFamily: 'Geist Mono',
              color: ACCENT,
            }}
          >
            {`// ${personalInfo.tagline.toLowerCase()}`}
          </div>

          <div
            style={{
              marginTop: 16,
              fontSize: 62,
              fontWeight: 600,
              letterSpacing: -1.6,
              lineHeight: 1.08,
              color: INK,
            }}
          >
            {HEADLINE}
          </div>

          <div
            style={{
              marginTop: 22,
              fontSize: 25,
              fontFamily: 'Geist Mono',
              color: MUTED,
            }}
          >
            {SUBHEAD}
          </div>

          <div style={{ display: 'flex', marginTop: 34 }}>
            {CHIPS.map((chip) => (
              <div
                key={chip}
                style={{
                  display: 'flex',
                  padding: '6px 14px',
                  marginRight: 10,
                  borderRadius: 999,
                  border: `1px solid ${HAIRLINE}`,
                  color: MUTED,
                  fontFamily: 'Geist Mono',
                  fontSize: 17,
                }}
              >
                {chip}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'auto', fontSize: 24, color: MUTED }}>
            {`${personalInfo.fullName} — ${personalInfo.programme}, ${personalInfo.gradYear}`}
          </div>
        </div>

        {/* ── Right: credential rail ────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            padding: '56px 48px',
            backgroundColor: CARD,
            borderLeft: `1px solid ${HAIRLINE}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              alignSelf: 'flex-start',
              padding: '7px 16px',
              borderRadius: 999,
              border: `1px solid ${SECURE}55`,
              backgroundColor: `${SECURE}0d`,
              color: SECURE,
              fontFamily: 'Geist Mono',
              fontSize: 19,
            }}
          >
            DIGITEX 2026 Silver
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: 26,
            }}
          >
            {certs.map((cert) => (
              <div
                key={cert.name}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    fontSize: 15,
                    fontFamily: 'Geist Mono',
                    color: MUTED,
                  }}
                >
                  {cert.org}
                </div>
                <div style={{ fontSize: 19, color: INK, marginTop: 3 }}>
                  {cert.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        {
          name: 'Geist',
          data: font('geist-sans/Geist-Regular.ttf'),
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Geist',
          data: font('geist-sans/Geist-SemiBold.ttf'),
          weight: 600,
          style: 'normal',
        },
        {
          name: 'Geist Mono',
          data: font('geist-mono/GeistMono-Regular.ttf'),
          weight: 400,
          style: 'normal',
        },
      ],
    },
  );
}
