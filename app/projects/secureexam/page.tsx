import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import Kicker from '@/components/Kicker';
import TechTag from '@/components/TechTag';
import ZeroTrustDiagram from '@/components/ZeroTrustDiagram';
import { secureexam, personalInfo } from '@/lib/content';
import { projectLinks } from '@/lib/projectLinks';

export const metadata: Metadata = {
  title: 'SecureExam UTM — zero-trust exam platform',
  description:
    'A production zero-trust examination platform with 26 mapped security controls and an interactive 8-layer defense-in-depth architecture diagram. DIGITEX 2026 Silver.',
};

const links = projectLinks({ liveUrl: secureexam.liveUrl, repoUrl: secureexam.repoUrl });

export default function SecureExamPage() {
  return (
    <>
      {/* ── Header ───────────────────────────────────────────── */}
      <section className="border-b border-hairline">
        <Container className="py-16 sm:py-20">
          <Link
            href="/projects"
            className="font-mono text-xs text-muted transition-colors hover:text-accent"
          >
            ← all projects
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {secureexam.title}
            </h1>
            <span className="rounded-full border border-secure/30 bg-secure/5 px-2.5 py-0.5 font-mono text-xs text-secure">
              {secureexam.award}
            </span>
          </div>

          <p className="mt-3 text-sm text-muted">{secureexam.role}</p>

          <p className="mt-6 max-w-2xl text-lg text-muted">{secureexam.teaser}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {links.map((link) => (
              <a
                key={link.kind}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-hairline px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                {link.kind === 'live' ? 'Live site' : 'Source'} ↗
              </a>
            ))}
          </div>

          {/* At a glance */}
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-hairline sm:grid-cols-4">
            {secureexam.glance.map((stat) => (
              <div key={stat.label} className="bg-card p-4">
                <dd className="text-2xl font-semibold tracking-tight">{stat.value}</dd>
                <dt className="font-mono text-xs text-muted">{stat.label}</dt>
              </div>
            ))}
          </dl>

          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            {secureexam.stack.map((tech) => (
              <TechTag key={tech}>{tech}</TechTag>
            ))}
            <span className="ml-1 font-mono text-xs text-muted">
              · deployed on {secureexam.deployedOn}
            </span>
          </div>
        </Container>
      </section>

      {/* ── Threat model ─────────────────────────────────────── */}
      <section className="border-b border-hairline">
        <Container className="py-16 sm:py-20">
          <Kicker>the threat model</Kicker>
          <p className="mt-6 max-w-3xl text-lg">{secureexam.threatModel.intro}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {secureexam.threatModel.threats.map((threat) => (
              <div
                key={threat.title}
                className="rounded-[var(--radius-card)] border border-hairline bg-card p-5"
              >
                <h3 className="text-base font-semibold">{threat.title}</h3>
                <p className="mt-2 text-sm text-muted">{threat.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── The wow moment: interactive diagram ──────────────── */}
      <section id="diagram" className="scroll-mt-24 border-b border-hairline">
        <Container className="py-16 sm:py-20">
          <Kicker>zero-trust architecture</Kicker>
          <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
            Trace a request through eight defense-in-depth layers
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Select a layer to see the control it enforces and the threats it stops.
            Each layer is linkable directly.
          </p>
          <div className="mt-10">
            <ZeroTrustDiagram />
          </div>
        </Container>
      </section>

      {/* ── Deployment & hardening ───────────────────────────── */}
      <section className="border-b border-hairline">
        <Container className="py-16 sm:py-20">
          <Kicker>deployment &amp; hardening</Kicker>
          <p className="mt-6 max-w-3xl text-lg">
            I didn’t just build SecureExam — I shipped and operated it. The platform
            runs on a hardened DigitalOcean Singapore droplet:
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {secureexam.deployment.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-[var(--radius-card)] border border-hairline bg-card p-4 text-sm"
              >
                <span aria-hidden="true" className="font-mono text-secure">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── What I'd do next ─────────────────────────────────── */}
      <section className="border-b border-hairline">
        <Container className="py-16 sm:py-20">
          <Kicker>what I’d do next</Kicker>
          <ul className="mt-6 max-w-2xl space-y-3">
            {secureexam.whatsNext.map((item) => (
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
        <Container className="py-16 text-center sm:py-20">
          <p className="text-muted">
            Want to walk through any layer in an interview?
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
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
