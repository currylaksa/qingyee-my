import Link from 'next/link';
import Container from '@/components/Container';
import Kicker from '@/components/Kicker';
import SectionLabel from '@/components/SectionLabel';
import TechTag from '@/components/TechTag';
import ProjectCard from '@/components/ProjectCard';
import ZeroTrustPreview from '@/components/ZeroTrustPreview';
import TestFlowDiagram from '@/components/TestFlowDiagram';
import { getAssetPresence } from '@/lib/assetPresence.server';
import { orgMark } from '@/lib/orgMark';
import {
  personalInfo,
  valueProp,
  now,
  pillars,
  projects,
  secureexam,
  certs,
  wilderfarer,
  runningLog,
} from '@/lib/content';

// Home "selected work": Huawei (automation), Xiangqi Shifu (test-heavy
// software), and the macOS utilities (low-level systems work). Chosen to lead
// with the coding and debugging skills closest to test engineering; the rest
// of the archive lives on /projects.
const featuredSlugs = ['huawei-automation', 'xiangqi-shifu', 'macos-menubar'];

export default function Home() {
  const { hasCv } = getAssetPresence();
  const selected = featuredSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-hairline">
        <div
          aria-hidden="true"
          className="dot-grid pointer-events-none absolute inset-0 opacity-50"
        />

        <Container className="relative py-14 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-12">
            <div>
              <Kicker>test engineering · singapore</Kicker>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
                {valueProp}
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted">
                {personalInfo.fullName} — I test memory at the wafer level,
                debugging test programs and reading test data so bad die are
                caught before packaging. I’m still learning the product and
                process from the engineers around me.
              </p>

              {/* On a phone the pillars push the CTAs off the first screen, so
                  the order flips below sm: act first, then read the proof. */}
              <div className="mt-8 flex flex-col gap-8 sm:mt-10 sm:gap-10">
                <ul className="order-2 grid gap-4 sm:order-1 sm:grid-cols-3">
                  {pillars.map((pillar) => (
                    <li
                      key={pillar.label}
                      className="rounded-[var(--radius-card)] border border-hairline bg-card p-4"
                    >
                      <p className="font-mono text-xs text-accent">
                        {pillar.label}
                      </p>
                      <p className="mt-2 text-sm text-ink">{pillar.text}</p>
                    </li>
                  ))}
                </ul>

                <div className="order-1 flex flex-col gap-3 sm:order-2 sm:flex-row sm:flex-wrap sm:items-center">
                  <Link
                    href="/experience"
                    className="w-full rounded-md bg-accent px-5 py-3 text-center text-sm font-medium text-paper transition-colors hover:bg-accent-hover sm:w-auto sm:py-2.5"
                  >
                    See my experience
                  </Link>
                  <Link
                    href="/projects"
                    className="w-full rounded-md border border-hairline px-5 py-3 text-center text-sm font-medium transition-colors hover:border-accent hover:text-accent sm:w-auto sm:py-2.5"
                  >
                    View projects
                  </Link>
                  {hasCv && (
                    <a
                      href="/cv.pdf"
                      className="w-full rounded-md border border-hairline px-5 py-3 text-center text-sm font-medium transition-colors hover:border-accent hover:text-accent sm:w-auto sm:py-2.5"
                    >
                      Download CV
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:pt-2">
              <TestFlowDiagram />
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-hairline py-3 font-mono text-xs text-muted">
            <span className="text-accent">// now</span>
            <span>
              {now.role} · {now.org}
            </span>
            <span>{now.location}</span>
            <span className="hidden sm:inline">{now.focus}</span>
          </div>

          <a
            href="#selected-work"
            className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
          >
            scroll to selected work <span aria-hidden="true">↓</span>
          </a>
        </Container>
      </section>

      {/* ── Selected projects ────────────────────────────────── */}
      <section
        id="selected-work"
        className="scroll-mt-20 border-b border-hairline"
      >
        <Container className="py-12 sm:py-20">
          <div className="flex items-end justify-between gap-4">
            <SectionLabel index="01">selected work</SectionLabel>
            <Link
              href="/projects"
              className="tap text-sm text-muted transition-colors hover:text-accent"
            >
              See all projects →
            </Link>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="reveal sm:col-span-2 lg:col-span-2 lg:row-span-2">
              <ProjectCard project={selected[0]} featured />
            </div>
            <div className="reveal">
              <ProjectCard project={selected[1]} />
            </div>
            <div className="reveal">
              <ProjectCard project={selected[2]} />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Featured case study ──────────────────────────────── */}
      <section className="border-b border-hairline">
        <Container className="py-12 sm:py-20">
          <SectionLabel index="02">featured case study</SectionLabel>
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
                className="mt-6 inline-block font-medium text-accent transition-colors hover:text-accent-hover max-lg:min-h-11"
              >
                Read the full case study →
              </Link>
            </div>

            <div className="reveal">
              <ZeroTrustPreview />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Credentials strip ────────────────────────────────── */}
      <section className="border-b border-hairline">
        <Container className="py-12 sm:py-20">
          <div className="flex items-end justify-between gap-4">
            <SectionLabel index="03">credentials</SectionLabel>
            <Link
              href="/credentials"
              className="tap text-sm text-muted transition-colors hover:text-accent"
            >
              See all →
            </Link>
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {certs.map((cert) => (
              <li
                key={cert.name}
                className="reveal rounded-[var(--radius-card)] border border-hairline bg-card p-4"
              >
                <span className="grid h-8 w-8 place-items-center rounded-md border border-hairline bg-paper font-mono text-[0.625rem] text-accent">
                  {orgMark(cert.org)}
                </span>
                <p className="mt-3 text-sm font-medium leading-snug">
                  {cert.name}
                </p>
                <p className="mt-1 font-mono text-xs text-muted">{cert.org}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── Wilderfarer strip ────────────────────────────────── */}
      <section className="border-b border-hairline">
        <Container className="py-12 sm:py-20">
          <SectionLabel index="04">off the keyboard</SectionLabel>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <blockquote className="reveal font-serif text-2xl leading-snug text-ink sm:text-3xl">
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

              <dl className="reveal grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-hairline sm:grid-cols-4">
                {runningLog.map((stat) => (
                  <div key={stat.label} className="bg-card p-3">
                    <dt className="font-mono text-[0.625rem] text-muted">
                      {stat.label}
                    </dt>
                    <dd className="mt-1 text-sm text-ink">{stat.value}</dd>
                  </div>
                ))}
              </dl>

              <Link
                href="/about"
                className="tap text-sm text-muted transition-colors hover:text-accent"
              >
                More about me →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Contact CTA ──────────────────────────────────────── */}
      <section>
        <Container className="py-14 text-center sm:py-24">
          <div className="flex justify-center">
            <Kicker>05 · contact</Kicker>
          </div>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Questions about test engineering, automation, or a project here?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            I’m always happy to talk through the work, the tooling, or the
            projects on this site.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
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
