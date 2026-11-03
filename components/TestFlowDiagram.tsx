function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      {children}
    </svg>
  );
}

const steps = [
  {
    label: 'Wafer',
    icon: (
      <Icon>
        <circle cx="12" cy="12" r="8" />
        <path d="M8 8h8v8H8zM12 4v16M4 12h16" />
      </Icon>
    ),
  },
  {
    label: 'Probe',
    icon: (
      <Icon>
        <rect x="6" y="4" width="12" height="6" rx="1" />
        <path d="M9 10v4M12 10v6M15 10v4" />
      </Icon>
    ),
  },
  {
    label: 'Program',
    icon: (
      <Icon>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M7 9l3 3-3 3M13 15h5" />
      </Icon>
    ),
  },
  {
    label: 'Data',
    icon: (
      <Icon>
        <path d="M4 19V5M4 19h16" />
        <rect x="7" y="12" width="3" height="7" />
        <rect x="12" y="9" width="3" height="10" />
        <rect x="17" y="6" width="3" height="13" />
      </Icon>
    ),
  },
  {
    label: 'Pass / fail',
    icon: (
      <Icon>
        <circle cx="12" cy="12" r="8" />
        <path d="M8 12l2.5 2.5L16 9" />
      </Icon>
    ),
  },
];

export default function TestFlowDiagram() {
  return (
    <div className="reveal relative overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-card p-5">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-40" aria-hidden="true" />

      <div className="relative flex items-center justify-between gap-3">
        <p className="font-mono text-xs text-muted">// test flow</p>
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.625rem] text-secure">
          <span className="h-1.5 w-1.5 rounded-full bg-secure" aria-hidden="true" />
          wafer sort
        </span>
      </div>

      <div className="relative mt-6" role="img" aria-label="Test flow: wafer, probe, test program, data, pass or fail">
        <div
          aria-hidden="true"
          className="absolute left-[10%] right-[10%] top-5 h-px bg-hairline"
        />
        <div
          aria-hidden="true"
          className="absolute left-[10%] right-[10%] top-5 h-px overflow-hidden"
        >
          <span className="flow-pulse block h-px w-1/3 bg-accent/80" />
        </div>

        <div className="relative grid grid-cols-5 gap-1">
          {steps.map((step) => (
            <div key={step.label} className="flex flex-col items-center text-center">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-hairline bg-paper text-accent">
                {step.icon}
              </span>
              <span className="mt-2 font-mono text-[0.5625rem] text-muted">
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-5 grid grid-cols-12 gap-1" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-sm ${
              i === 7 || i === 16 ? 'bg-threat/70' : 'bg-secure/40'
            }`}
          />
        ))}
      </div>
      <div className="relative mt-2 flex items-center justify-between gap-3 font-mono text-[0.625rem] text-muted">
        <span>die map · pass / flagged</span>
        <span className="text-accent">debug before package</span>
      </div>
    </div>
  );
}
