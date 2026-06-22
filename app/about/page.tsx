import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import Kicker from '@/components/Kicker';
import TechTag from '@/components/TechTag';
import { getAssetPresence } from '@/lib/assetPresence.server';
import { about, wilderfarer, personalInfo, runningLog } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Chan Qing Yee — a Computer Science (Networks & Security) graduand from UTM targeting network-security engineering roles in Singapore.',
};

export default function AboutPage() {
  const { hasHeadshot } = getAssetPresence();

  return (
    <>
      {/* ── Bio ──────────────────────────────────────────────── */}
      <section className="border-b border-hairline">
        <Container className="py-16 sm:py-20">
          <Kicker>about</Kicker>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {personalInfo.fullName}
              </h1>
              <p className="mt-2 font-mono text-sm text-muted">
                {personalInfo.programme} · {personalInfo.gradYear}
              </p>
              <div className="mt-6 space-y-4 text-lg text-muted">
                {about.bio.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>

              <dl className="mt-8 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-hairline sm:grid-cols-2">
                {about.details.map((d) => (
                  <div key={d.label} className="bg-card p-4">
                    <dt className="font-mono text-xs text-muted">{d.label}</dt>
                    <dd className="mt-1 text-sm">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {hasHeadshot && (
              <div className="order-first lg:order-none">
                {/* Static export: Image Optimization is off, so a plain img with
                    explicit dimensions (no layout shift) is the right call. */}
                <img
                  src="/headshot.jpg"
                  alt={`Portrait of ${personalInfo.fullName}`}
                  width={787}
                  height={1400}
                  className="w-full max-w-xs rounded-[var(--radius-card)] border border-hairline object-cover"
                />
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ── Wilderfarer ──────────────────────────────────────── */}
      <section>
        <Container className="py-16 sm:py-20">
          <Kicker>off the keyboard — Wilderfarer</Kicker>
          <blockquote className="mt-6 max-w-3xl font-serif text-2xl leading-snug sm:text-3xl">
            “{wilderfarer.pullQuote}”
          </blockquote>
          <p className="mt-6 max-w-3xl text-lg text-muted">{wilderfarer.narrative}</p>

          <div className="mt-8 flex flex-col gap-5">
            <ul className="flex flex-wrap gap-2">
              {personalInfo.identity.map((trait) => (
                <li key={trait}>
                  <TechTag>{trait}</TechTag>
                </li>
              ))}
            </ul>
            <dl className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted">
              {runningLog.map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-1.5">
                  <dt>{stat.label}</dt>
                  <dd className="text-ink">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <Link
            href="/contact"
            className="mt-10 inline-block font-medium text-accent transition-colors hover:text-accent-hover"
          >
            Get in touch →
          </Link>
        </Container>
      </section>
    </>
  );
}
