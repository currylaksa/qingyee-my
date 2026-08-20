import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import Kicker from '@/components/Kicker';
import TechTag from '@/components/TechTag';
import CampusTopology from '@/components/CampusTopology';
import AddressSpaceBar from '@/components/AddressSpaceBar';
import SubnetFit from '@/components/SubnetFit';
import ConnectivityMatrix from '@/components/ConnectivityMatrix';
import { campusNetwork, personalInfo } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Two-storey campus network — VLSM, EIGRP, VLANs & DHCP relay',
  description:
    'A campus network for a new two-storey faculty building, designed from the floor plan up in Cisco Packet Tracer: one 172.16.36.0/23 cut by VLSM into 13 right-sized subnets, static and EIGRP routing compared on the same three routers, four staff-room VLANs on one router-on-a-stick, and 10 DHCP pools reached across routed boundaries by relay agents.',
};

export default function TwoStoreyNetworkPage() {
  return (
    <>
      {/* ── Header ───────────────────────────────────────────── */}
      <section className="border-b border-hairline">
        <Container className="py-12 sm:py-20">
          <Link
            href="/projects"
            className="tap font-mono text-xs text-muted transition-colors hover:text-accent"
          >
            ← all projects
          </Link>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
            {campusNetwork.title}
          </h1>
          <p className="mt-3 text-sm text-muted">{campusNetwork.role}</p>
          <p className="mt-1 font-mono text-xs text-muted">
            {campusNetwork.course}
          </p>
          {/* Named explicitly as a teaching brief — never as a commission. */}
          <p className="mt-1 font-mono text-xs text-muted">
            case-study subject · {campusNetwork.subject}
          </p>

          <p className="mt-6 max-w-3xl text-lg text-muted">
            {campusNetwork.teaser}
          </p>

          {/* At a glance */}
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-hairline sm:grid-cols-4">
            {campusNetwork.glance.map((stat) => (
              <div key={stat.label} className="bg-card p-4">
                <dd className="text-2xl font-semibold tracking-tight">
                  {stat.value}
                </dd>
                <dt className="font-mono text-xs text-muted">{stat.label}</dt>
              </div>
            ))}
          </dl>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {campusNetwork.stack.map((tech) => (
              <TechTag key={tech}>{tech}</TechTag>
            ))}
          </div>
        </Container>
      </section>

      {/* ── The brief ────────────────────────────────────────── */}
      <section className="border-b border-hairline">
        <Container className="py-12 sm:py-20">
          <Kicker>the brief</Kicker>
          <p className="mt-6 max-w-3xl text-lg text-muted">
            {campusNetwork.brief}
          </p>
        </Container>
      </section>

      {/* ── Topology ─────────────────────────────────────────── */}
      <section className="border-b border-hairline">
        <Container className="py-12 sm:py-20">
          <Kicker>topology</Kicker>
          <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
            Three routers, two floors, no single point of failure
          </h2>
          <p className="mt-4 max-w-3xl text-muted">
            The two first-floor routers carry a large lab and a small one each;
            the ground-floor router carries both conferencing rooms, the link
            out to the ISP, and every DHCP pool. All three are joined pairwise,
            so a broken serial link costs a hop rather than a floor. The ISP is
            deliberately left outside the routing protocol and reached by a
            static default route instead.
          </p>
          <div className="mt-10">
            <CampusTopology />
          </div>
        </Container>
      </section>

      {/* ── Address plan ─────────────────────────────────────── */}
      <section className="border-b border-hairline">
        <Container className="py-12 sm:py-20">
          <Kicker>the address plan</Kicker>
          <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
            One /23, thirteen subnets, five masks
          </h2>
          <p className="mt-4 max-w-3xl text-muted">
            {campusNetwork.addressPlanNote} {campusNetwork.transitNote}
          </p>

          <div className="mt-10">
            <AddressSpaceBar
              parent={campusNetwork.parentBlock}
              label={`${campusNetwork.parentBlock} · every subnet at its true share`}
              blocks={[
                ...campusNetwork.segments.map((s) => ({
                  name: s.name,
                  subnet: s.subnet,
                })),
                ...campusNetwork.transitLinks,
              ]}
            />
          </div>

          {/* Phones get a card per segment — a 4-column table can only be
              swiped at that width. sm and up get the real table. */}
          <ul className="mt-10 flex flex-col gap-3 sm:hidden">
            {campusNetwork.segments.map((segment) => (
              <li
                key={segment.name}
                className="rounded-[var(--radius-card)] border border-hairline bg-card p-4"
              >
                <p className="font-medium">{segment.name}</p>
                <dl className="mt-2 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs">
                  <div className="flex items-baseline gap-1.5">
                    <dt className="text-muted">subnet</dt>
                    <dd className="text-accent">{segment.subnet}</dd>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <dt className="text-muted">gateway</dt>
                    <dd className="text-ink">{segment.gateway}</dd>
                  </div>
                </dl>
                {segment.hosts !== undefined && (
                  <div className="mt-3">
                    <SubnetFit hosts={segment.hosts} subnet={segment.subnet} />
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-10 hidden overflow-x-auto rounded-[var(--radius-card)] border border-hairline sm:block">
            <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-card">
                  <th className="p-4 font-mono text-xs font-normal text-muted">
                    Segment
                  </th>
                  <th className="p-4 font-mono text-xs font-normal text-muted">
                    Subnet
                  </th>
                  <th className="p-4 font-mono text-xs font-normal text-muted">
                    Gateway
                  </th>
                  <th className="p-4 font-mono text-xs font-normal text-muted">
                    Fit
                  </th>
                </tr>
              </thead>
              <tbody>
                {campusNetwork.segments.map((segment) => (
                  <tr key={segment.name} className="border-t border-hairline">
                    <td className="p-4 font-medium">{segment.name}</td>
                    <td className="p-4 font-mono text-xs text-accent">
                      {segment.subnet}
                    </td>
                    <td className="p-4 font-mono text-xs text-muted">
                      {segment.gateway}
                    </td>
                    <td className="p-4">
                      {segment.hosts !== undefined && (
                        <SubnetFit hosts={segment.hosts} subnet={segment.subnet} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* ── Design decisions ─────────────────────────────────── */}
      <section className="border-b border-hairline">
        <Container className="py-12 sm:py-20">
          <Kicker>design decisions</Kicker>
          <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
            Five choices that shape the network
          </h2>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {campusNetwork.decisions.map((decision) => (
              <article
                key={decision.title}
                className="flex flex-col rounded-[var(--radius-card)] border border-hairline bg-card p-5"
              >
                <p className="font-mono text-xs text-accent">{decision.tag}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">
                  {decision.title}
                </h3>
                <p className="mt-3 text-sm text-muted">{decision.body}</p>
                <ul className="mt-4 space-y-2 border-t border-hairline pt-4">
                  {decision.details.map((detail) => (
                    <li key={detail} className="flex gap-3 text-sm text-muted">
                      <span aria-hidden="true" className="font-mono text-accent">
                        →
                      </span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {/* The routing card argues that static and EIGRP coexist; this is
              that argument's evidence, straight off the device. */}
          <figure className="mt-8 m-0 overflow-hidden rounded-[var(--radius-card)] border border-hairline">
            <figcaption className="border-b border-hairline bg-card px-4 py-2.5 font-mono text-xs text-muted">
              // {campusNetwork.routingProof.caption}
            </figcaption>
            <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-muted">
              <code>
                {campusNetwork.routingProof.lines.map((line) => {
                  const code = line.trimStart()[0];
                  const tone =
                    code === 'S'
                      ? 'text-accent'
                      : code === 'D'
                        ? 'text-secure'
                        : undefined;
                  return (
                    <span key={line} className={`block ${tone ?? ''}`}>
                      {line || ' '}
                    </span>
                  );
                })}
              </code>
            </pre>
          </figure>
          <p className="mt-4 max-w-3xl text-muted">
            {campusNetwork.routingProof.readout}
          </p>
        </Container>
      </section>

      {/* ── Verification ─────────────────────────────────────── */}
      <section className="border-b border-hairline">
        <Container className="py-12 sm:py-20">
          <Kicker>verification</Kicker>
          <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
            Every room against every room
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-muted">
            {campusNetwork.verification.intro}
          </p>

          <div className="mt-8">
            <ConnectivityMatrix matrix={campusNetwork.verification} />
          </div>

          <ul className="mt-8 max-w-3xl space-y-3">
            {campusNetwork.verification.readout.map((line) => (
              <li key={line} className="flex gap-3 text-muted">
                <span aria-hidden="true" className="font-mono text-accent">
                  →
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-3xl rounded-[var(--radius-card)] border border-hairline bg-card p-4 text-sm text-muted">
            <span className="font-mono text-xs text-accent">// note · </span>
            {campusNetwork.verificationNote}
          </p>
        </Container>
      </section>

      {/* ── What I'd do next ─────────────────────────────────── */}
      <section className="border-b border-hairline">
        <Container className="py-12 sm:py-20">
          <Kicker>what I’d do next</Kicker>
          <ul className="mt-6 max-w-2xl space-y-3">
            {campusNetwork.whatsNext.map((item) => (
              <li key={item} className="flex gap-3 text-muted">
                <span aria-hidden="true" className="font-mono text-accent">
                  →
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section>
        <Container className="py-12 text-center sm:py-20">
          <p className="text-muted">
            Happy to walk through the subnetting or the routing tables in an
            interview.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-md bg-accent px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent-hover sm:py-2.5"
            >
              Get in touch
            </Link>
            <a
              href={`mailto:${personalInfo.email}`}
              className="rounded-md border border-hairline px-5 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent sm:py-2.5"
            >
              {personalInfo.email}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
