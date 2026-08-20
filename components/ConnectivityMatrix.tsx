import type { ConnectivityMatrix as Matrix, MatrixResult } from '@/lib/content';

/* A source × destination test grid. Replaces a list of prose checks: a list
   can only assert that testing was thorough, while a filled grid shows it —
   and shows where it isn't. Cells are only ever `pass` or `blocked` when the
   source report recorded that pair; everything else is `untested` and reads
   as blank, so the grid can never overstate what was actually run. */

const MARK: Record<MatrixResult, string> = {
  pass: '✓',
  blocked: '✕',
  untested: '·',
};

const TONE: Record<MatrixResult, string> = {
  pass: 'text-secure',
  blocked: 'text-accent',
  untested: 'text-muted/40',
};

const WORD: Record<MatrixResult, string> = {
  pass: 'reachable',
  blocked: 'blocked',
  untested: 'not tested',
};

export default function ConnectivityMatrix({ matrix }: { matrix: Matrix }) {
  const { sources, destinations, destinationsShort, cells } = matrix;

  // Columns carrying a denial get a tint — on a grid this size the eye needs
  // pointing at the one column that is the argument.
  const notable = destinations.map((_, c) =>
    cells.some((row) => row[c] === 'blocked'),
  );

  return (
    <figure className="m-0">
      {/* ── Phones: one block per source ──────────────────── */}
      <div className="flex flex-col gap-3 sm:hidden">
        {sources.map((source, r) => (
          <div
            key={source}
            className="rounded-[var(--radius-card)] border border-hairline bg-card p-4"
          >
            <p className="text-sm font-medium">{source}</p>
            <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
              {destinations.map((dest, c) => (
                <li
                  key={dest}
                  className="flex items-baseline gap-1 font-mono text-xs"
                >
                  <span aria-hidden="true" className={TONE[cells[r][c]]}>
                    {MARK[cells[r][c]]}
                  </span>
                  <span
                    className={
                      cells[r][c] === 'untested' ? 'text-muted/50' : 'text-muted'
                    }
                  >
                    {destinationsShort[c]}
                  </span>
                  <span className="sr-only">
                    {dest} — {WORD[cells[r][c]]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── sm and up: the real grid ──────────────────────── */}
      <div className="hidden overflow-x-auto rounded-[var(--radius-card)] border border-hairline sm:block">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">
            Connectivity test results, source by destination.
          </caption>
          <thead>
            <tr className="bg-card">
              <th
                scope="col"
                className="p-3 pl-4 font-mono text-xs font-normal text-muted"
              >
                from ↓ / to →
              </th>
              {destinations.map((dest, c) => (
                <th
                  key={dest}
                  scope="col"
                  className={`p-3 text-center font-mono text-xs font-normal ${
                    notable[c] ? 'text-accent' : 'text-muted'
                  }`}
                >
                  <abbr title={dest} className="no-underline">
                    {destinationsShort[c]}
                  </abbr>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sources.map((source, r) => (
              <tr key={source} className="border-t border-hairline">
                <th
                  scope="row"
                  className="whitespace-nowrap p-3 pl-4 text-left text-sm font-medium"
                >
                  {source}
                </th>
                {destinations.map((dest, c) => (
                  <td
                    key={dest}
                    className={`p-3 text-center font-mono ${TONE[cells[r][c]]} ${
                      notable[c] ? 'bg-accent/5' : ''
                    }`}
                  >
                    <span aria-hidden="true">{MARK[cells[r][c]]}</span>
                    <span className="sr-only">
                      {source} to {dest}: {WORD[cells[r][c]]}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <figcaption className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-muted">
        <span>
          <span className="text-secure">✓</span> reachable
        </span>
        <span>
          <span className="text-accent">✕</span> blocked by design
        </span>
        <span>
          <span className="text-muted/40">·</span> not tested
        </span>
      </figcaption>
    </figure>
  );
}
