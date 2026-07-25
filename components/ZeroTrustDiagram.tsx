'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { zeroTrustLayers, type ZeroTrustLayer } from '@/lib/content';

const DESKTOP = '(min-width: 1024px)';

/**
 * Tabs and accordions are different ARIA patterns, and which one is correct
 * here depends on the viewport — so the breakpoint has to be readable in JS,
 * not just in CSS. Server snapshot is `true`: without JS the desktop layout
 * (rail + panel below it) renders statically, which is what phones showed
 * before this component gained an accordion.
 */
function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(DESKTOP);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    () => window.matchMedia(DESKTOP).matches,
    () => true,
  );
}

/** The control + threats, shared by the desktop panel and the phone accordion. */
function LayerBody({ layer }: { layer: ZeroTrustLayer }) {
  return (
    <>
      <p className="text-muted">{layer.control}</p>
      <p className="mt-6 font-mono text-xs text-muted">threats stopped</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {layer.threats.map((threat) => (
          <li
            key={threat}
            className="rounded-full border border-threat/25 bg-threat/5 px-3 py-1 text-sm text-threat"
          >
            {threat}
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * The wow moment (brief §8). A vertical "request path" rail of 8 zero-trust
 * layers; selecting one reveals its control + the threats it stops. On desktop
 * that is an ARIA tablist with a sticky side panel; on a phone the panel would
 * land ~900px below the tap, so each layer expands in place as an accordion
 * instead. Deep-link anchors (#layer-<tag>) and the one-shot "packet"
 * animation (which respects prefers-reduced-motion) work in both.
 */
export default function ZeroTrustDiagram() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const len = zeroTrustLayers.length;
  const isDesktop = useIsDesktop();

  // Deep link: honour #layer-<tag> on load so the diagram can be linked
  // straight to a specific layer from a message.
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const idx = zeroTrustLayers.findIndex((l) => `layer-${l.tag}` === hash);
    if (idx >= 0) setActive(idx);
  }, []);

  function select(idx: number, focus = false) {
    setActive(idx);
    history.replaceState(null, '', `#layer-${zeroTrustLayers[idx].tag}`);
    if (focus) tabRefs.current[idx]?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    let next: number | null = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (active + 1) % len;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (active - 1 + len) % len;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = len - 1;
    if (next !== null) {
      e.preventDefault();
      select(next, true);
    }
  }

  const current = zeroTrustLayers[active];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_1.1fr] lg:items-start">
      {/* ── Request-path rail (tablist on desktop, accordion on phones) ── */}
      <div
        role={isDesktop ? 'tablist' : undefined}
        aria-label={isDesktop ? 'SecureExam zero-trust request path' : undefined}
        aria-orientation={isDesktop ? 'vertical' : undefined}
        onKeyDown={onKeyDown}
        className="relative ml-3 border-l border-hairline pl-6"
      >
        {/* one-shot packet travelling down the rail */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-[5px] h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_4px_rgba(178,58,31,0.12)]"
          style={{ animation: 'packet-descend 2.6s ease-in-out 0.3s 1 both' }}
        />

        <div className="mb-3 font-mono text-xs text-muted">▼ request in</div>

        <div className="flex flex-col gap-2">
          {zeroTrustLayers.map((layer, idx) => {
            const selected = idx === active;
            return (
              <div key={layer.num}>
                <button
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  role={isDesktop ? 'tab' : undefined}
                  id={`layer-${layer.tag}`}
                  aria-selected={isDesktop ? selected : undefined}
                  aria-expanded={isDesktop ? undefined : selected}
                  aria-controls={isDesktop ? 'zt-panel' : `zt-region-${layer.tag}`}
                  tabIndex={isDesktop ? (selected ? 0 : -1) : undefined}
                  onClick={() => select(idx)}
                  className={`group relative flex w-full items-center gap-3 rounded-[var(--radius-card)] border px-3 py-2.5 text-left transition-colors ${
                    selected
                      ? `border-accent/50 bg-accent/5 ${isDesktop ? '' : 'rounded-b-none'}`
                      : 'border-hairline bg-card hover:border-accent/30'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[2.1rem] grid h-6 w-6 place-items-center rounded-full border font-mono text-[0.65rem] transition-colors ${
                      selected
                        ? 'border-accent bg-accent text-paper'
                        : 'border-hairline bg-paper text-muted group-hover:border-accent/40'
                    }`}
                  >
                    {layer.num}
                  </span>
                  {/* Grows only where the chevron exists, so the desktop
                      tablist keeps its original shrink-to-fit label box. */}
                  <span className="min-w-0 max-lg:flex-1">
                    <span
                      className={`block text-sm font-medium ${selected ? 'text-accent' : 'text-ink'}`}
                    >
                      {layer.layer}
                    </span>
                    <span className="font-mono text-xs text-muted">· {layer.tag}</span>
                  </span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`h-4 w-4 shrink-0 transition-transform lg:hidden ${
                      selected ? 'rotate-180 text-accent' : 'text-muted'
                    }`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {!isDesktop && (
                  <div
                    id={`zt-region-${layer.tag}`}
                    role="region"
                    aria-labelledby={`layer-${layer.tag}`}
                    hidden={!selected}
                    className="rounded-b-[var(--radius-card)] border border-t-0 border-accent/50 bg-accent/5 px-3 pb-4 pt-1 lg:hidden"
                  >
                    <LayerBody layer={layer} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-3 font-mono text-xs text-secure">▼ trusted action</div>
      </div>

      {/* ── Detail panel (tabpanel) — desktop only ──────────── */}
      {isDesktop && (
        <div
          role="tabpanel"
          id="zt-panel"
          aria-labelledby={`layer-${current.tag}`}
          tabIndex={0}
          className="rounded-[var(--radius-card)] border border-hairline bg-card p-6 lg:sticky lg:top-24"
        >
          <p className="font-mono text-xs text-accent">
            layer {current.num} · {current.tag}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">{current.layer}</h3>
          <div className="mt-4">
            <LayerBody layer={current} />
          </div>
        </div>
      )}

      {/* Screen-reader summary: the full content without interaction. */}
      <div className="sr-only">
        <h3>Zero-trust layers, in request order</h3>
        <ol>
          {zeroTrustLayers.map((layer) => (
            <li key={layer.num}>
              Layer {layer.num}, {layer.layer} ({layer.tag}): {layer.control} Threats
              stopped: {layer.threats.join(', ')}.
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
