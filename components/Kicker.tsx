/** Mono kicker label, e.g. `// selected work` (brief §10). */
export default function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-sm text-accent">// {children}</p>
  );
}
