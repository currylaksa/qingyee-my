import Link from 'next/link';
import type { ExperienceEntry } from '@/lib/content';

export default function ExperienceTimeline({
  entries,
}: {
  entries: ExperienceEntry[];
}) {
  return (
    <ol className="relative mt-10 border-l border-hairline pl-6 sm:pl-8">
      {entries.map((entry) => (
        <li
          key={`${entry.org}-${entry.period}`}
          className="relative pb-5 last:pb-0"
          aria-current={entry.current ? 'true' : undefined}
        >
          <span
            aria-hidden="true"
            className={`absolute -left-10 top-7 z-10 grid h-8 w-8 place-items-center rounded-full border bg-paper font-mono text-[0.5625rem] sm:-left-12 ${
              entry.current
                ? 'border-accent text-accent'
                : 'border-hairline text-muted'
            }`}
          >
            {entry.monogram}
          </span>

          <article className="reveal rounded-[var(--radius-card)] border border-hairline bg-card p-6 transition-colors hover:border-accent/30">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h2 className="text-lg font-semibold tracking-tight">
                {entry.role}
              </h2>
              {entry.current && (
                <span className="rounded-full border border-secure/30 bg-secure/5 px-2.5 py-0.5 font-mono text-[0.625rem] text-secure">
                  Current
                </span>
              )}
              {entry.kind === 'internship' && (
                <span className="rounded-full border border-hairline px-2.5 py-0.5 font-mono text-[0.625rem] text-muted">
                  Internship
                </span>
              )}
              {entry.kind === 'education' && (
                <span className="rounded-full border border-hairline px-2.5 py-0.5 font-mono text-[0.625rem] text-muted">
                  Degree
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-ink">
              {entry.org} · {entry.location}
            </p>
            <p className="mt-0.5 font-mono text-xs text-muted">
              <time>{entry.period}</time>
            </p>

            <p className="mt-4 text-muted">{entry.summary}</p>

            <ul className="mt-4 space-y-1.5">
              {entry.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2 text-sm">
                  <span aria-hidden="true" className="font-mono text-accent">
                    ·
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {entry.href && entry.hrefLabel && (
              <Link
                href={entry.href}
                className="mt-5 inline-block font-medium text-accent transition-colors hover:text-accent-hover max-lg:min-h-11"
              >
                {entry.hrefLabel} →
              </Link>
            )}
          </article>
        </li>
      ))}
    </ol>
  );
}
