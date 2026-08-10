import { sunray } from '@/lib/content';

/* Logical topology of the Sunray design, drawn from the report's addressing
   table. Department routers and the per-room access switches are collapsed
   into their segment box — the report gives each department its own router, so
   the box *is* the router plus the subnet behind it. Coordinates are
   hand-placed; subnets are read from lib/content.ts so the diagram can never
   drift from the address table. */

const W = 1020;
const H = 540;

/** Segment boxes, keyed by the `name` used in sunray.segments. */
const SEGMENTS: { name: string; x: number; parent: 'MR1' | 'CORE' | 'MR2' }[] = [
  { name: 'Staff Room 1', x: 90, parent: 'CORE' },
  { name: 'Staff Room 2', x: 230, parent: 'CORE' },
  { name: 'Executive Office', x: 370, parent: 'MR1' },
  { name: 'Remote Access', x: 510, parent: 'MR1' },
  { name: 'Finance', x: 650, parent: 'MR2' },
  { name: 'IT Department', x: 790, parent: 'MR2' },
  { name: 'Server Room', x: 930, parent: 'MR2' },
];

const Y_EDGE = 44; // internet router + internet server
const Y_FIREWALL = 140;
const Y_CORE_ROUTERS = 236; // MR1 / MR2
const Y_SWITCH = 330; // access switch carrying the two VLANs
const Y_SEGMENT = 430;

const MR1_X = 300;
const MR2_X = 790;
const SWITCH_X = 160;

const BOX_W = 128;
const BOX_H = 54;
const NODE_W = 132;
const NODE_H = 38;

const subnetOf = (name: string) =>
  sunray.segments.find((s) => s.name === name)?.subnet ?? '';

/** A rounded node with a label and an optional mono sub-label. */
function Node({
  x,
  y,
  w,
  h,
  label,
  sub,
  accent = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        rx={8}
        fill="var(--color-card)"
        stroke={accent ? 'var(--color-accent)' : 'var(--color-muted)'}
        strokeOpacity={accent ? 0.55 : 0.3}
      />
      <text
        x={x}
        y={sub ? y - 3 : y + 4}
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="500"
        fill="var(--color-ink)"
      >
        {label}
      </text>
      {sub && (
        <text
          x={x}
          y={y + 14}
          textAnchor="middle"
          fontSize="10.5"
          fontFamily="var(--font-mono)"
          fill="var(--color-muted)"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

/** Orthogonal link: down from `from`, across, then down into `to`. */
function Link({
  x1,
  y1,
  x2,
  y2,
  dashed = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dashed?: boolean;
}) {
  const mid = y1 + (y2 - y1) / 2;
  const d =
    x1 === x2
      ? `M ${x1} ${y1} L ${x2} ${y2}`
      : `M ${x1} ${y1} L ${x1} ${mid} L ${x2} ${mid} L ${x2} ${y2}`;
  return (
    <path
      d={d}
      fill="none"
      stroke="var(--color-muted)"
      strokeOpacity="0.4"
      strokeWidth="1.25"
      strokeDasharray={dashed ? '4 4' : undefined}
    />
  );
}

/** Small mono annotation floating beside a link. */
function LinkLabel({
  x,
  y,
  children,
  anchor = 'middle',
}: {
  x: number;
  y: number;
  children: string;
  anchor?: 'middle' | 'start' | 'end';
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize="10"
      fontFamily="var(--font-mono)"
      fill="var(--color-muted)"
    >
      {children}
    </text>
  );
}

export default function SunrayTopology() {
  return (
    <figure className="m-0">
      {/* The diagram stays legible rather than shrinking to fit a phone, so it
          scrolls inside its own container instead of the page scrolling. */}
      <div className="overflow-x-auto rounded-[var(--radius-card)] border border-hairline bg-paper">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-labelledby="topo-title topo-desc"
          className="h-auto w-full min-w-[47rem]"
        >
          <title id="topo-title">
            Logical network topology of the Sunray enterprise design
          </title>
          <desc id="topo-desc">
            Two core routers link seven departmental segments. One core router
            also reaches a firewall and the Internet edge; the other serves
            Finance, IT, and the Server Room.
          </desc>

          {/* ── Links (drawn first so nodes sit on top) ──────── */}
          <Link x1={MR1_X} y1={Y_EDGE} x2={MR1_X} y2={Y_FIREWALL - NODE_H / 2} />
          <Link
            x1={MR1_X + NODE_W / 2}
            y1={Y_EDGE}
            x2={560 - NODE_W / 2}
            y2={Y_EDGE}
          />
          <Link
            x1={MR1_X}
            y1={Y_FIREWALL + NODE_H / 2}
            x2={MR1_X}
            y2={Y_CORE_ROUTERS - NODE_H / 2}
          />
          {/* core-to-core */}
          <Link
            x1={MR1_X + NODE_W / 2}
            y1={Y_CORE_ROUTERS}
            x2={MR2_X - NODE_W / 2}
            y2={Y_CORE_ROUTERS}
          />
          {/* MR1 down to the access switch */}
          <Link
            x1={MR1_X}
            y1={Y_CORE_ROUTERS + NODE_H / 2}
            x2={SWITCH_X}
            y2={Y_SWITCH - NODE_H / 2}
          />

          {SEGMENTS.map((seg) => {
            const fromX =
              seg.parent === 'CORE' ? SWITCH_X : seg.parent === 'MR1' ? MR1_X : MR2_X;
            const fromY =
              seg.parent === 'CORE'
                ? Y_SWITCH + NODE_H / 2
                : Y_CORE_ROUTERS + NODE_H / 2;
            return (
              <Link
                key={seg.name}
                x1={fromX}
                y1={fromY}
                x2={seg.x}
                y2={Y_SEGMENT - BOX_H / 2}
              />
            );
          })}

          {/* ── Link annotations ─────────────────────────────── */}
          <LinkLabel x={(MR1_X + MR2_X) / 2} y={Y_CORE_ROUTERS - 10}>
            192.168.6.0/30
          </LinkLabel>
          {/* Sits on the horizontal run between MR1 and the access switch. */}
          <LinkLabel x={230} y={277}>
            802.1Q trunk
          </LinkLabel>
          <LinkLabel x={MR1_X + 10} y={Y_EDGE + 58} anchor="start">
            static routes only
          </LinkLabel>
          {/* Anchored clear of the vertical drop into each staff-room box. */}
          <LinkLabel x={82} y={396} anchor="end">
            VLAN 10
          </LinkLabel>
          <LinkLabel x={222} y={396} anchor="end">
            VLAN 20
          </LinkLabel>

          {/* OSPF boundary — everything below the firewall is one area. */}
          <rect
            x={26}
            y={Y_CORE_ROUTERS - 44}
            width={968}
            height={H - (Y_CORE_ROUTERS - 44) - 24}
            rx={12}
            fill="none"
            stroke="var(--color-accent)"
            strokeOpacity="0.25"
            strokeDasharray="5 5"
          />
          <text
            x={36}
            y={Y_CORE_ROUTERS - 26}
            fontSize="10.5"
            fontFamily="var(--font-mono)"
            fill="var(--color-accent)"
          >
            OSPF process 10 · area 0
          </text>

          {/* ── Nodes ────────────────────────────────────────── */}
          <Node
            x={560}
            y={Y_EDGE}
            w={NODE_W}
            h={NODE_H}
            label="Internet server"
            sub="209.165.0.2"
          />
          <Node
            x={MR1_X}
            y={Y_EDGE}
            w={NODE_W}
            h={NODE_H}
            label="Internet router"
          />
          <Node
            x={MR1_X}
            y={Y_FIREWALL}
            w={NODE_W}
            h={NODE_H}
            label="Firewall"
            accent
          />
          <Node x={MR1_X} y={Y_CORE_ROUTERS} w={NODE_W} h={NODE_H} label="Core MR1" accent />
          <Node x={MR2_X} y={Y_CORE_ROUTERS} w={NODE_W} h={NODE_H} label="Core MR2" accent />
          <Node
            x={SWITCH_X}
            y={Y_SWITCH}
            w={NODE_W}
            h={NODE_H}
            label="Core switch"
          />

          {SEGMENTS.map((seg) => (
            <Node
              key={seg.name}
              x={seg.x}
              y={Y_SEGMENT}
              w={BOX_W}
              h={BOX_H}
              label={seg.name}
              sub={subnetOf(seg.name)}
            />
          ))}
        </svg>
      </div>

      <figcaption className="mt-3 font-mono text-xs text-muted">
        // logical topology — department routers and per-room access switches
        collapsed into their segment
      </figcaption>
    </figure>
  );
}
