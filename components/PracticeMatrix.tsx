import type { HuaweiTool } from '@/lib/content';

/* Which tool demonstrates which engineering practice. The two used to be
   separate prose lists — five tools in one section, five claimed practices
   in another, with nothing connecting them. Crossing them answers "prove it"
   for each claim, and leaves the thin columns visible rather than implying
   every practice is equally well evidenced. */

type Practice = { name: string; short: string; detail: string };

export default function PracticeMatrix({
  tools,
  practices,
}: {
  tools: HuaweiTool[];
  practices: Practice[];
}) {
  const count = (p: number) => tools.filter((t) => t.practices.includes(p)).length;

  return (
    <figure className="m-0">
      {/* ── Phones: one block per tool ────────────────────── */}
      <div className="flex flex-col gap-3 sm:hidden">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="rounded-[var(--radius-card)] border border-hairline bg-card p-4"
          >
            <p className="text-sm font-medium">{tool.name}</p>
            <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
              {tool.practices.map((p) => (
                <li key={p} className="font-mono text-xs text-muted">
                  <span aria-hidden="true" className="text-secure">
                    ✓
                  </span>{' '}
                  {practices[p].short}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── sm and up: the grid ───────────────────────────── */}
      <div className="hidden overflow-x-auto rounded-[var(--radius-card)] border border-hairline sm:block">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">
            Each tool against the engineering practices it demonstrates.
          </caption>
          <thead>
            <tr className="bg-card">
              <th
                scope="col"
                className="p-3 pl-4 font-mono text-xs font-normal text-muted"
              >
                tool ↓ / practice →
              </th>
              {practices.map((p) => (
                <th
                  key={p.name}
                  scope="col"
                  className="p-3 text-center font-mono text-xs font-normal text-muted"
                >
                  <abbr title={`${p.name} — ${p.detail}`} className="no-underline">
                    {p.short}
                  </abbr>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tools.map((tool) => (
              <tr key={tool.name} className="border-t border-hairline">
                <th
                  scope="row"
                  className="p-3 pl-4 text-left text-sm font-medium"
                >
                  {tool.name}
                </th>
                {practices.map((p, i) => {
                  const has = tool.practices.includes(i);
                  return (
                    <td key={p.name} className="p-3 text-center font-mono">
                      <span aria-hidden="true" className={has ? 'text-secure' : 'text-muted/25'}>
                        {has ? '✓' : '·'}
                      </span>
                      <span className="sr-only">
                        {tool.name} {has ? 'demonstrates' : 'does not demonstrate'}{' '}
                        {p.name}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-hairline bg-card">
              <th
                scope="row"
                className="p-3 pl-4 text-left font-mono text-xs font-normal text-muted"
              >
                tools demonstrating
              </th>
              {practices.map((p, i) => (
                <td
                  key={p.name}
                  className="p-3 text-center font-mono text-xs text-muted"
                >
                  {count(i)}/{tools.length}
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

      {/* The columns are the claims; spelling them out keeps the grid from
          being the only place the practice is named. */}
      <dl className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2">
        {practices.map((p) => (
          <div key={p.name} className="flex flex-col">
            <dt className="font-mono text-xs text-accent">{p.short}</dt>
            <dd className="text-sm text-muted">{p.detail}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
