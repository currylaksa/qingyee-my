/** Small mono tech-tag pill (brief §10 components). */
export default function TechTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-hairline px-2.5 py-0.5 font-mono text-xs text-muted">
      {children}
    </span>
  );
}
