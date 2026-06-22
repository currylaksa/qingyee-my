import Link from 'next/link';
import Container from '@/components/Container';
import Kicker from '@/components/Kicker';
import TechTag from '@/components/TechTag';
import ProjectCard from '@/components/ProjectCard';
import ZeroTrustPreview from '@/components/ZeroTrustPreview';
import { getAssetPresence } from '@/lib/assetPresence.server';
import {
  personalInfo,
  valueProp,
  pillars,
  projects,
  secureexam,
  certs,
  wilderfarer,
  runningLog,
} from '@/lib/content';

// Home "selected work": SecureExam (centerpiece) + real network-relevant
// internship work + a security-flavoured side project. All shipped/live.
const featuredSlugs = ['secureexam', 'huawei-automation', 'duodrop'];

export default function Home() {
  const { hasCv } = getAssetPresence();
  const selected = featuredSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="border-b border-hairline">
        <Container className="py-20 sm:py-28">
          <Kicker>{personalInfo.tagline.toLowerCase()}</Kicker>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
            {valueProp}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            {personalInfo.fullName} — {personalInfo.programme} graduand,{' '}
            {personalInfo.gradYear}. Application-layer zero trust meets
            network-layer security: defense-in-depth, built and operated end to
            end.
          </p>

          {/* Proof pillars — quiet mono-labelled badges */}
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {pillars.map((pillar) => (
              <li
                key={pillar.label}
                className="rounded-[var(--radius-card)] border border-hairline bg-card p-4"
              >
                <p className="font-mono text-xs text-accent">{pillar.label}</p>
                <p className="mt-2 text-sm text-ink">{pillar.text}</p>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/projects/secureexam"
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent-hover"
            >
              View SecureExam case study
            </Link>
            {hasCv && (
              <a
                href="/cv.pdf"
                className="rounded-md border border-hairline px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                Download CV
              </a>
            )}
          </div>

          <p className="mt-8 font-mono text-xs text-muted">
            // {personalInfo.status.toLowerCase()} · Johor Bahru → Singapore
          </p>
        </Container>
      </section>

      {/* ── Featured case study teaser ───────────────────────── */}
      <section className="border-b border-hairline">
        <Container className="py-16 sm:py-20">
          <Kicker>featured case study</Kicker>
          <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-semibold tracking-tight">
                  {secureexam.title}
                </h2>
                <span className="rounded-full border border-secure/30 bg-secure/5 px-2.5 py-0.5 font-mono text-xs text-secure">
                  {secureexam.award}
                </span>
              </div>
              <p className="mt-4 text-muted">{secureexam.teaser}</p>

              <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-hairline sm:grid-cols-4">
                {secureexam.glance.map((stat) => (
                  <div key={stat.label} className="bg-card p-3">
                    <dd className="text-lg font-semibold tracking-tight">
                      {stat.value}
                    </dd>
                    <dt className="font-mono text-xs text-muted">{stat.label}</dt>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {secureexam.stack.map((tech) => (
                  <TechTag key={tech}>{tech}</TechTag>
                ))}
              </div>

              <Link
                href="/projects/secureexam"
                className="mt-6 inline-block font-medium text-accent transition-colors hover:text-accent-hover"
              >
                Read the full case study →
              </Link>
            </div>

            <ZeroTrustPreview />
          </div>
        </Container>
      </section>

      {/* ── Selected projects ────────────────────────────────── */}
      <section className="border-b border-hairline">
        <Container className="py-16 sm:py-20">
          <div className="flex items-end justify-between gap-4">
            <Kicker>selected work</Kicker>
            <Link
              href="/projects"
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              See all projects →
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {selected.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>

      {/* ── Credentials strip ────────────────────────────────── */}
      <section className="border-b border-hairline">
        <Container className="py-16 sm:py-20">
          <div className="flex items-end justify-between gap-4">
            <Kicker>credentials</Kicker>
            <Link
              href="/credentials"
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              See all →
            </Link>
          </div>
          <ul className="mt-6 flex flex-wrap gap-3">
            {certs.map((cert) => (
              <li
                key={cert.name}
                className="rounded-[var(--radius-card)] border border-hairline bg-card px-4 py-3"
              >
                <p className="text-sm font-medium">{cert.name}</p>
                <p className="font-mono text-xs text-muted">{cert.org}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── Wilderfarer strip ────────────────────────────────── */}
      <section className="border-b border-hairline">
        <Container className="py-16 sm:py-20">
          <Kicker>off the keyboard</Kicker>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <blockquote className="font-serif text-2xl leading-snug text-ink sm:text-3xl">
              “{wilderfarer.pullQuote}”
            </blockquote>
            <div className="flex flex-col gap-4">
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
              <Link
                href="/about"
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                More about me →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Contact CTA ──────────────────────────────────────── */}
      <section>
        <Container className="py-20 text-center sm:py-24">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Looking for a network-security engineer in Singapore?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            I’m open to roles and happy to walk through any of this in detail.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent-hover"
            >
              Get in touch
            </Link>
            <a
              href={`mailto:${personalInfo.email}`}
              className="rounded-md border border-hairline px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              {personalInfo.email}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
