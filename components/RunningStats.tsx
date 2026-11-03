import type { Stat } from '@/lib/content';

function paceMinutes(value: string): number | null {
  const match = value.match(/^(\d+):(\d{2})/);
  if (!match) return null;
  return Number(match[1]) + Number(match[2]) / 60;
}

export default function RunningStats({ stats }: { stats: Stat[] }) {
  const paces = stats
    .map((stat) => ({ ...stat, minutes: paceMinutes(stat.value) }))
    .filter((stat): stat is Stat & { minutes: number } => stat.minutes !== null)
    .reverse();
  const goal = stats.find((stat) => stat.label.toLowerCase().includes('goal'));

  return (
    <div className="reveal rounded-[var(--radius-card)] border border-hairline bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-xs text-muted">// pace log</p>
        {goal && (
          <span className="font-mono text-[0.625rem] text-accent">
            {goal.label} {goal.value}
          </span>
        )}
      </div>

      <dl className="mt-5 space-y-3">
        {paces.map((stat) => (
          <div key={stat.label}>
            <div className="flex items-baseline justify-between gap-3 font-mono text-xs">
              <dt className="text-muted">{stat.label}</dt>
              <dd className="text-ink">{stat.value}</dd>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-hairline">
              <div
                className="h-full rounded-full bg-accent"
                style={{ width: `${Math.min((stat.minutes / 6.5) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </dl>

      <p className="mt-4 text-xs text-muted">
        6:11/km half-marathon pace; chasing a sub-2:00 finish.
      </p>
    </div>
  );
}
