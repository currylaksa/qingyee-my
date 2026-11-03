import Kicker from './Kicker';

/** Section kicker with a quiet mono index, e.g. `02 // selected work`. */
export default function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-mono text-xs text-muted" aria-hidden="true">
        {index}
      </span>
      <Kicker>{children}</Kicker>
    </div>
  );
}
