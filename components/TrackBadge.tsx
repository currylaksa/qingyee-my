import type { ProjectTrack } from '@/lib/content';

const dot: Record<ProjectTrack, string> = {
  'Test & automation': 'bg-accent',
  Software: 'bg-secure',
  Networks: 'bg-ink',
  Security: 'bg-threat',
};

export default function TrackBadge({ track }: { track?: ProjectTrack }) {
  if (!track) return null;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-2.5 py-0.5 font-mono text-[0.625rem] text-muted">
      <span className={`h-1.5 w-1.5 rounded-full ${dot[track]}`} aria-hidden="true" />
      {track}
    </span>
  );
}
