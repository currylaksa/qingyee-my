import { campusNetwork } from '@/lib/content';

/* Logical topology of the two-storey campus design, drawn from the report's
   addressing table. Per-room access switches are collapsed into their room
   box — the one switch that matters is the trunk carrying the four staff-room
   VLANs, so that one is drawn. Coordinates are hand-placed; subnets are read
   from lib/content.ts so the diagram can never drift from the address table.
   The first floor sits above its routers and the ground floor below, so the
   drawing reads the way the building does. */

const W = 1080;
const H = 540;

type Room = {
  /** Must match a `name` in campusNetwork.segments. */
  name: string;
  short: string;
  x: number;
  w: number;
  /** VLAN annotation floated above the box, staff rooms only. */
  vlan?: string;
};

const FIRST_FLOOR: (Room & { parent: 'FF-A' | 'FF-B' })[] = [
  { name: 'General Purpose Lab', short: 'GP Lab', x: 160, w: 128, parent: 'FF-A' },
  { name: 'Computer Security Lab', short: 'Security Lab', x: 340, w: 128, parent: 'FF-A' },
  { name: 'Network Lab', short: 'Network Lab', x: 740, w: 128, parent: 'FF-B' },
  { name: 'IoT Lab', short: 'IoT Lab', x: 920, w: 128, parent: 'FF-B' },
];

const GROUND_FLOOR: Room[] = [
  { name: 'Video Conferencing Room 1', short: 'VC Room 1', x: 340, w: 128 },
  { name: 'Video Conferencing Room 2', short: 'VC Room 2', x: 520, w: 128 },
];

const STAFF_ROOMS: Room[] = [
  { name: 'Staff Room 1 · VLAN 10', short: 'Staff Room 1', x: 680, w: 104, vlan: 'VLAN 10' },
  { name: 'Staff Room 2 · VLAN 20', short: 'Staff Room 2', x: 790, w: 104, vlan: 'VLAN 20' },
  { name: 'Staff Room 3 · VLAN 30', short: 'Staff Room 3', x: 900, w: 104, vlan: 'VLAN 30' },
  { name: 'Staff Room 4 · VLAN 40', short: 'Staff Room 4', x: 1010, w: 104, vlan: 'VLAN 40' },
];

const Y_LABS = 60; // first-floor labs, above their routers
const Y_ROUTERS = 190; // FF-A and FF-B
const Y_GROUND = 330; // Router-GF, the ISP, and the VLAN trunk switch
const Y_VC = 450;
const Y_STAFF = 470;

const FF_A_X = 250;
const FF_B_X = 830;
const GF_X = 430;
const ISP_X = 110;
const SWITCH_X = 830;

const BOX_H = 54;
const NODE_W = 132;
const NODE_H = 38;

const subnetOf = (name: string) =>
  campusNetwork.segments.find((s) => s.name === name)?.subnet ?? '';

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

/** Orthogonal link. Turns at the midpoint unless `corridorY` names a clear
    lane to run along — needed where the default midpoint would cut a box. */
function Link({
  x1,
  y1,
  x2,
  y2,
  corridorY,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  corridorY?: number;
}) {
  const mid = corridorY ?? y1 + (y2 - y1) / 2;
  const d =
    x1 === x2
      ? `M ${x1} ${y1} L ${x2} ${y2}`
      : y1 === y2
        ? `M ${x1} ${y1} L ${x2} ${y2}`
        : `M ${x1} ${y1} L ${x1} ${mid} L ${x2} ${mid} L ${x2} ${y2}`;
  return (
    <path
      d={d}
      fill="none"
      stroke="var(--color-muted)"
      strokeOpacity="0.4"
      strokeWidth="1.25"
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

/** One tier of the phone layout: a labelled group of nodes. */
function Tier({
  label,
  note,
  children,
}: {
  label: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <li className="relative pl-6">
      {/* connector into the next tier */}
      <span
        aria-hidden="true"
        className="absolute left-[3px] top-2 h-full w-px bg-hairline"
      />
      <span
        aria-hidden="true"
        className="absolute left-0 top-1.5 h-[7px] w-[7px] rounded-full bg-accent"
      />
      <p className="font-mono text-xs text-accent">{label}</p>
      {note && <p className="mt-1 font-mono text-[0.7rem] text-muted">{note}</p>}
      <div className="mt-2 flex flex-col gap-2">{children}</div>
    </li>
  );
}

function TierNode({ name, sub }: { name: string; sub?: string }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-hairline bg-card px-3 py-2">
      <p className="text-sm font-medium">{name}</p>
      {sub && <p className="font-mono text-xs text-muted">{sub}</p>}
    </div>
  );
}

/** Phone layout: the same topology read as tiers, top to bottom. A 1080px-wide
    SVG can only be swiped on a phone, which is not "clear" — so below lg the
    diagram becomes this list instead. Only one of the two is ever in the
    accessibility tree, since the other is display:none. */
function StackedTopology() {
  const under = (parent: 'FF-A' | 'FF-B') =>
    FIRST_FLOOR.filter((r) => r.parent === parent);

  return (
    // The trailing connector on the final tier would dangle into nothing.
    <ol className="flex flex-col gap-5 rounded-[var(--radius-card)] border border-hairline bg-paper p-5 [&>li:last-child>span:first-child]:hidden">
      <Tier label="internet edge" note="static default route · outside EIGRP">
        <TierNode name="ISP" />
      </Tier>

      <Tier
        label="routers"
        note="EIGRP 1 + static routes · /30 serial links between all three"
      >
        <TierNode name="Router-FF-A" sub="first floor" />
        <TierNode name="Router-FF-B" sub="first floor" />
        <TierNode name="Router-GF" sub="ground floor · all 10 DHCP pools" />
      </Tier>

      <Tier label="first floor · Router-FF-A">
        {under('FF-A').map((r) => (
          <TierNode key={r.name} name={r.short} sub={subnetOf(r.name)} />
        ))}
      </Tier>

      <Tier label="first floor · Router-FF-B">
        {under('FF-B').map((r) => (
          <TierNode key={r.name} name={r.short} sub={subnetOf(r.name)} />
        ))}
      </Tier>

      <Tier label="ground floor · Router-GF">
        {GROUND_FLOOR.map((r) => (
          <TierNode key={r.name} name={r.short} sub={subnetOf(r.name)} />
        ))}
      </Tier>

      <Tier
        label="staff rooms"
        note="802.1Q trunk off Router-FF-B · fa1/0.10 – fa1/0.40"
      >
        {STAFF_ROOMS.map((r) => (
          <TierNode
            key={r.name}
            name={r.short}
            sub={`${r.vlan} · ${subnetOf(r.name)}`}
          />
        ))}
      </Tier>
    </ol>
  );
}

export default function CampusTopology() {
  return (
    <figure className="m-0">
      {/* Phones get the stacked tiers; lg and up get the drawn topology. */}
      <div className="lg:hidden">
        <StackedTopology />
      </div>

      <div className="hidden overflow-x-auto rounded-[var(--radius-card)] border border-hairline bg-paper lg:block">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-labelledby="campus-topo-title campus-topo-desc"
          className="h-auto w-full min-w-[50rem]"
        >
          <title id="campus-topo-title">
            Logical network topology of the two-storey campus design
          </title>
          <desc id="campus-topo-desc">
            Three routers joined pairwise by /30 serial links. Router-FF-A and
            Router-FF-B carry two first-floor labs each; Router-GF carries both
            ground-floor conferencing rooms, the link to the ISP, and all ten
            DHCP pools. A trunk off Router-FF-B carries the four staff-room
            VLANs.
          </desc>

          {/* ── Links (drawn first so nodes sit on top) ──────── */}
          {/* labs up to their first-floor router */}
          {FIRST_FLOOR.map((room) => (
            <Link
              key={room.name}
              x1={room.parent === 'FF-A' ? FF_A_X : FF_B_X}
              y1={Y_ROUTERS - NODE_H / 2}
              x2={room.x}
              y2={Y_LABS + BOX_H / 2}
            />
          ))}

          {/* the triangle: FF-A ↔ FF-B, and both down to GF */}
          <Link
            x1={FF_A_X + NODE_W / 2}
            y1={Y_ROUTERS}
            x2={FF_B_X - NODE_W / 2}
            y2={Y_ROUTERS}
          />
          <Link
            x1={FF_A_X}
            y1={Y_ROUTERS + NODE_H / 2}
            x2={GF_X}
            y2={Y_GROUND - NODE_H / 2}
            corridorY={262}
          />
          <Link
            x1={FF_B_X}
            y1={Y_ROUTERS + NODE_H / 2}
            x2={GF_X}
            y2={Y_GROUND - NODE_H / 2}
            corridorY={262}
          />

          {/* ISP sits beside Router-GF, reached statically */}
          <Link
            x1={ISP_X + NODE_W / 2}
            y1={Y_GROUND}
            x2={GF_X - NODE_W / 2}
            y2={Y_GROUND}
          />

          {/* conferencing rooms below Router-GF */}
          {GROUND_FLOOR.map((room) => (
            <Link
              key={room.name}
              x1={GF_X}
              y1={Y_GROUND + NODE_H / 2}
              x2={room.x}
              y2={Y_VC - BOX_H / 2}
            />
          ))}

          {/* the 802.1Q trunk, straight down between the two right-hand labs */}
          <Link
            x1={FF_B_X}
            y1={Y_ROUTERS + NODE_H / 2}
            x2={SWITCH_X}
            y2={Y_GROUND - NODE_H / 2}
          />
          {STAFF_ROOMS.map((room) => (
            <Link
              key={room.name}
              x1={SWITCH_X}
              y1={Y_GROUND + NODE_H / 2}
              x2={room.x}
              y2={Y_STAFF - BOX_H / 2}
            />
          ))}

          {/* ── Link annotations ─────────────────────────────── */}
          <LinkLabel x={(FF_A_X + FF_B_X) / 2} y={Y_ROUTERS - 10}>
            172.16.36.208/30
          </LinkLabel>
          <LinkLabel x={GF_X + 118} y={274} anchor="start">
            .212/30 · .216/30
          </LinkLabel>
          <LinkLabel x={(ISP_X + GF_X) / 2} y={Y_GROUND - 12}>
            static default route
          </LinkLabel>
          <LinkLabel x={SWITCH_X + 10} y={264} anchor="start">
            802.1Q trunk
          </LinkLabel>
          {/* Anchored clear of the vertical drop into each staff-room box. */}
          {STAFF_ROOMS.map((room) => (
            <LinkLabel key={room.name} x={room.x - 8} y={Y_STAFF - 38} anchor="end">
              {room.vlan!}
            </LinkLabel>
          ))}

          {/* ── Nodes ────────────────────────────────────────── */}
          {FIRST_FLOOR.map((room) => (
            <Node
              key={room.name}
              x={room.x}
              y={Y_LABS}
              w={room.w}
              h={BOX_H}
              label={room.short}
              sub={subnetOf(room.name)}
            />
          ))}

          <Node
            x={FF_A_X}
            y={Y_ROUTERS}
            w={NODE_W}
            h={NODE_H}
            label="Router-FF-A"
            accent
          />
          <Node
            x={FF_B_X}
            y={Y_ROUTERS}
            w={NODE_W}
            h={NODE_H}
            label="Router-FF-B"
            accent
          />
          <Node x={ISP_X} y={Y_GROUND} w={NODE_W} h={NODE_H} label="ISP" />
          <Node
            x={GF_X}
            y={Y_GROUND}
            w={NODE_W}
            h={NODE_H}
            label="Router-GF"
            sub="10 DHCP pools"
            accent
          />
          <Node
            x={SWITCH_X}
            y={Y_GROUND}
            w={NODE_W}
            h={NODE_H}
            label="Trunk switch"
          />

          {GROUND_FLOOR.map((room) => (
            <Node
              key={room.name}
              x={room.x}
              y={Y_VC}
              w={room.w}
              h={BOX_H}
              label={room.short}
              sub={subnetOf(room.name)}
            />
          ))}
          {STAFF_ROOMS.map((room) => (
            <Node
              key={room.name}
              x={room.x}
              y={Y_STAFF}
              w={room.w}
              h={BOX_H}
              label={room.short}
              sub={subnetOf(room.name)}
            />
          ))}
        </svg>
      </div>

      <figcaption className="mt-3 font-mono text-xs text-muted">
        // logical topology — first floor above its routers, ground floor below;
        per-room access switches collapsed into their room
      </figcaption>
    </figure>
  );
}
