import { allocationOf, addressesIn } from '@/lib/subnets';

/* A proportional strip of the whole parent block: every subnet drawn at its
   real share, with the unallocated remainder at the end. The point is the
   thing a table of prefixes cannot show — how much of the block the design
   actually spends, and how much is left contiguous for the next expansion. */

type Block = { name: string; subnet: string };

export default function AddressSpaceBar({
  parent,
  blocks,
  label,
}: {
  parent: string;
  blocks: Block[];
  label?: string;
}) {
  const { parentSize, allocated, free, blocks: sized, freeShare } = allocationOf(
    parent,
    blocks,
  );

  // Every block is drawn at its exact share — no minimum width. Padding the
  // slivers would have to come out of somewhere, and the only block big
  // enough to take it is the free tail, which is the number this figure
  // exists to report. A /30 lands around 5px wide, which is visible; the
  // table below carries the detail for anything too thin to hover.

  return (
    <figure className="m-0">
      <div className="flex items-baseline justify-between gap-4 font-mono text-xs text-muted">
        <span>{label ?? parent}</span>
        <span>{parentSize} addresses</span>
      </div>

      <div
        className="mt-2 flex h-11 w-full overflow-hidden rounded-[var(--radius-card)] border border-hairline"
        role="img"
        aria-label={`${parent} holds ${parentSize} addresses. ${allocated} are allocated across ${blocks.length} subnets; ${free} remain free.`}
      >
        {sized.map((b) => (
          <div
            key={b.subnet}
            title={`${b.name} — ${b.subnet} · ${b.size} addresses`}
            style={{ width: `${b.share * 100}%` }}
            className="group relative border-r border-paper bg-accent/25 transition-colors last:border-r-0 hover:bg-accent/45"
          />
        ))}
        {freeShare > 0 && (
          <div
            title={`Unallocated — ${free} addresses`}
            style={{ width: `${freeShare * 100}%` }}
            className="bg-[repeating-linear-gradient(135deg,transparent,transparent_5px,var(--color-hairline)_5px,var(--color-hairline)_6px)]"
          />
        )}
      </div>

      {/* Read the bar out in words — the bar shows the shape, these carry
          the numbers a reader would otherwise have to estimate. */}
      <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 font-mono text-xs sm:grid-cols-4">
        <div className="flex items-baseline gap-1.5">
          <dt className="text-muted">allocated</dt>
          <dd className="text-ink">{allocated}</dd>
        </div>
        <div className="flex items-baseline gap-1.5">
          <dt className="text-muted">free</dt>
          <dd className="text-ink">{free}</dd>
        </div>
        <div className="flex items-baseline gap-1.5">
          <dt className="text-muted">subnets</dt>
          <dd className="text-ink">{blocks.length}</dd>
        </div>
        <div className="flex items-baseline gap-1.5">
          <dt className="text-muted">largest</dt>
          <dd className="text-ink">
            /{Math.min(...blocks.map((b) => Number(b.subnet.split('/')[1])))} ·{' '}
            {Math.max(...blocks.map((b) => addressesIn(b.subnet)))}
          </dd>
        </div>
      </dl>

      <figcaption className="mt-3 font-mono text-xs text-muted">
        // every block at its exact share of the parent; the hatched tail is
        unallocated. The three /30 transit links are the thinnest slivers —
        12 addresses between them.
      </figcaption>
    </figure>
  );
}
