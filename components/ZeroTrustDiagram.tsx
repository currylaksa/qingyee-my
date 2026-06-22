'use client';

import { useEffect, useRef, useState } from 'react';
import { zeroTrustLayers } from '@/lib/content';

/**
 * The wow moment (brief §8). A vertical "request path" rail of 8 zero-trust
 * layers; selecting one reveals its control + the threats it stops. Built as
 * an ARIA tablist (full keyboard nav), with deep-link anchors (#layer-<tag>)
 * and a one-shot "packet" animation that respects prefers-reduced-motion.
 */
export default function ZeroTrustDiagram() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const len = zeroTrustLayers.length;

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
      {/* ── Request-path rail (tablist) ─────────────────────── */}
      <div
        role="tablist"
        aria-label="SecureExam zero-trust request path"
        aria-orientation="vertical"
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
              <button
                key={layer.num}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                role="tab"
                id={`layer-${layer.tag}`}
                aria-selected={selected}
                aria-controls="zt-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(idx)}
                className={`group relative flex items-center gap-3 rounded-[var(--radius-card)] border px-3 py-2.5 text-left transition-colors ${
                  selected
                    ? 'border-accent/50 bg-accent/5'
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
                <span className="min-w-0">
                  <span
                    className={`block text-sm font-medium ${selected ? 'text-accent' : 'text-ink'}`}
                  >
                    {layer.layer}
                  </span>
                  <span className="font-mono text-xs text-muted">· {layer.tag}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-3 font-mono text-xs text-secure">▼ trusted action</div>
      </div>

      {/* ── Detail panel (tabpanel) ─────────────────────────── */}
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
        <p className="mt-4 text-muted">{current.control}</p>

        <p className="mt-6 font-mono text-xs text-muted">threats stopped</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {current.threats.map((threat) => (
            <li
              key={threat}
              className="rounded-full border border-threat/25 bg-threat/5 px-3 py-1 text-sm text-threat"
            >
              {threat}
            </li>
          ))}
        </ul>
      </div>

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
