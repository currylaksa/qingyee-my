import type { ExperienceEntry } from '@/lib/content';

/** Compact UTM → Huawei → Micron path summary. */
export default function CareerPath({
  entries,
  className = '',
}: {
  entries: ExperienceEntry[];
  className?: string;
}) {
  const path = [...entries].reverse();

  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className="absolute left-[16.66%] right-[16.66%] top-5 hidden h-px bg-hairline sm:block"
      />

      <ol className="grid gap-4 sm:grid-cols-3" aria-label="Career path">
        {path.map((entry) => (
          <li
            key={`${entry.org}-${entry.period}`}
            className="relative flex items-center gap-3 sm:flex-col sm:items-center sm:text-center"
          >
            <span
              className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border bg-paper font-mono text-[0.625rem] ${
                entry.current
                  ? 'border-accent text-accent'
                  : 'border-hairline text-muted'
              }`}
            >
              {entry.monogram}
              {entry.current && (
                <span
                  aria-hidden="true"
                  className="absolute -right-0.5 -top-0.5 h-2 w-2 animate-pulse rounded-full bg-secure"
                />
              )}
            </span>
            <div>
              <p className="font-mono text-[0.625rem] uppercase tracking-wider text-muted">
                {entry.kind === 'education'
                  ? 'degree'
                  : entry.kind === 'internship'
                    ? 'internship'
                    : 'current'}
              </p>
              <p className="text-sm font-medium">{entry.shortOrg ?? entry.org}</p>
              <p className="font-mono text-[0.625rem] text-muted">{entry.period}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
