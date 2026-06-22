import Link from 'next/link';
import { zeroTrustLayers } from '@/lib/content';

/**
 * Static preview of the 8-layer zero-trust request path. Non-interactive —
 * the full clickable diagram lives on the case study (Milestone 3). The whole
 * rail links there.
 */
export default function ZeroTrustPreview() {
  return (
    <Link
      href="/projects/secureexam#diagram"
      aria-label="View the interactive zero-trust architecture diagram"
      className="group block rounded-[var(--radius-card)] border border-hairline bg-card p-5 transition-colors hover:border-accent/40"
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-xs text-muted">request path · 8 layers</p>
        <span className="font-mono text-xs text-accent opacity-0 transition-opacity group-hover:opacity-100">
          explore →
        </span>
      </div>

      <ol className="relative ml-3 space-y-3 border-l border-hairline pl-5">
        {zeroTrustLayers.map((l) => (
          <li key={l.num} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[1.625rem] top-1 grid h-5 w-5 place-items-center rounded-full border border-hairline bg-paper font-mono text-[0.625rem] text-muted transition-colors group-hover:border-accent/50 group-hover:text-accent"
            >
              {l.num}
            </span>
            <span className="text-sm font-medium">{l.layer}</span>
            <span className="ml-2 font-mono text-xs text-muted">· {l.tag}</span>
          </li>
        ))}
      </ol>
    </Link>
  );
}
