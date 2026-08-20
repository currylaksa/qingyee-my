import { usableIn, utilisation } from '@/lib/subnets';

/* Hosts a room holds against addresses its mask provides. Replaces a column
   of prose that asserted each subnet was "sized to the room" — this shows
   how well, and makes the tight ones and the loose ones visible at a glance. */

export default function SubnetFit({
  hosts,
  subnet,
}: {
  hosts: number;
  subnet: string;
}) {
  const usable = usableIn(subnet);
  const ratio = utilisation(hosts, subnet);
  const pct = Math.round(ratio * 100);

  return (
    <div className="flex items-center gap-2.5">
      <span className="whitespace-nowrap font-mono text-xs text-muted">
        {hosts}/{usable}
      </span>
      <span
        className="relative h-1.5 w-14 shrink-0 overflow-hidden rounded-full bg-hairline"
        role="img"
        aria-label={`${hosts} of ${usable} usable addresses, ${pct} percent`}
      >
        <span
          className="absolute inset-y-0 left-0 rounded-full bg-accent"
          style={{ width: `${pct}%` }}
        />
      </span>
      <span className="w-8 shrink-0 text-right font-mono text-xs text-muted">
        {pct}%
      </span>
    </div>
  );
}
