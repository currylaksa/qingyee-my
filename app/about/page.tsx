import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import Kicker from '@/components/Kicker';
import TechTag from '@/components/TechTag';
import CareerPath from '@/components/CareerPath';
import RunningStats from '@/components/RunningStats';
import { getAssetPresence } from '@/lib/assetPresence.server';
import {
  about,
  wilderfarer,
  personalInfo,
  runningLog,
  experience,
  now,
} from '@/lib/content';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Chan Qing Yee — Test Solutions Engineer at Micron Technology, Singapore, working in wafer-level probe test. Computer Science graduate from UTM, specialising in Networks & Security, CCNA-certified, former Huawei intern, and DIGITEX 2026 Silver Medalist.',
};

export default function AboutPage() {
  const { hasHeadshot } = getAssetPresence();

  return (
    <>
      {/* ── Bio ──────────────────────────────────────────────── */}
      <section className="border-b border-hairline">
        <Container className="py-12 sm:py-20">
          <Kicker>about</Kicker>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {personalInfo.fullName}
              </h1>
              <p className="mt-2 font-mono text-sm text-muted">
                {personalInfo.status}
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

            <div>
              {hasHeadshot && (
                <div className="relative mx-auto w-full max-w-xs">
                  <div
                    aria-hidden="true"
                    className="absolute -inset-2 rounded-[calc(var(--radius-card)+4px)] border border-accent/25"
                  />
                  {/* Static export: Image Optimization is off, so a plain img with
                      explicit dimensions (no layout shift) is the right call. */}
                  <img
                    src="/headshot.jpg"
                    alt={`Portrait of ${personalInfo.fullName}`}
                    width={787}
                    height={1400}
                    className="relative w-full rounded-[var(--radius-card)] border border-hairline object-cover"
                  />
                </div>
              )}

              <div className="mx-auto mt-6 w-full max-w-xs rounded-[var(--radius-card)] border border-hairline bg-card p-4">
                <p className="font-mono text-xs text-accent">// now</p>
                <p className="mt-1 text-sm font-medium">
                  {now.role} · {now.org}
                </p>
                <p className="mt-1 font-mono text-xs text-muted">
                  {now.location}
                </p>
                <p className="mt-2 text-xs text-muted">{now.focus}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Path ─────────────────────────────────────────────── */}
      <section className="border-b border-hairline">
        <Container className="py-10 sm:py-14">
          <Kicker>path</Kicker>
          <CareerPath entries={experience} className="mt-6" />
        </Container>
      </section>

      {/* ── Wilderfarer ──────────────────────────────────────── */}
      <section>
        <Container className="py-12 sm:py-20">
          <Kicker>off the keyboard — Wilderfarer</Kicker>
          <blockquote className="reveal mt-6 max-w-3xl font-serif text-2xl leading-snug sm:text-3xl">
            “{wilderfarer.pullQuote}”
          </blockquote>
          <p className="mt-6 max-w-3xl text-lg text-muted">{wilderfarer.narrative}</p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
            <div>
              <ul className="flex flex-wrap gap-2">
                {personalInfo.identity.map((trait) => (
                  <li key={trait}>
                    <TechTag>{trait}</TechTag>
                  </li>
                ))}
              </ul>
            </div>
            <RunningStats stats={runningLog} />
          </div>

          <Link
            href="/contact"
            className="mt-10 inline-block font-medium text-accent transition-colors hover:text-accent-hover max-lg:min-h-11"
          >
            Get in touch →
          </Link>
        </Container>
      </section>
    </>
  );
}
