import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import Kicker from '@/components/Kicker';
import { networkingLabs } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Networking lab portfolio',
  description:
    'Network-layer security labs — enterprise simulation (OSPF, VLANs, ACLs), pfSense + Snort IDS, and BGP peering. The network-layer companion to SecureExam.',
};

export default function NetworkingLabsPage() {
  return (
    <section>
      <Container className="py-16 sm:py-20">
        <Link
          href="/projects"
          className="font-mono text-xs text-muted transition-colors hover:text-accent"
        >
          ← all projects
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Networking lab portfolio
          </h1>
          <span className="rounded-full border border-hairline px-2.5 py-0.5 font-mono text-xs text-muted">
            {networkingLabs.status}
          </span>
        </div>

        <p className="mt-6 max-w-3xl text-lg text-muted">{networkingLabs.intro}</p>

        <div className="mt-10 space-y-5">
          {networkingLabs.labs.map((lab) => (
            <article
              key={lab.name}
              className="rounded-[var(--radius-card)] border border-hairline bg-card p-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-lg font-semibold tracking-tight">{lab.name}</h2>
                <span className="rounded-full border border-hairline px-2 py-0.5 font-mono text-[0.625rem] text-muted">
                  {lab.status}
                </span>
                <span className="font-mono text-xs text-muted">· {lab.tool}</span>
              </div>

              <p className="mt-3 text-muted">{lab.description}</p>

              {/* Topology/screenshot placeholder — replaced once the lab is built */}
              <div className="mt-4 grid h-40 place-items-center rounded-md border border-dashed border-hairline bg-paper">
                <p className="font-mono text-xs text-muted">topology / screenshot — coming soon</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
