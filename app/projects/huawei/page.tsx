import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import Kicker from '@/components/Kicker';
import TechTag from '@/components/TechTag';
import PracticeMatrix from '@/components/PracticeMatrix';
import { huawei } from '@/lib/content';

export const metadata: Metadata = {
  title: 'U Mobile 5G network upgrade — Huawei Malaysia',
  description:
    'Project Engineer internship on Huawei Malaysia’s U Mobile 5G RAN and Microwave network upgrade — deployment coordination across 100+ subcontractor teams and 1,000+ site acceptance deliverables, plus five automation tools that cut daily reporting by 93%.',
};

export default function HuaweiPage() {
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
            U Mobile 5G network upgrade
          </h1>
          <p className="mt-3 font-mono text-sm text-muted">{huawei.role}</p>
          <p className="mt-6 max-w-3xl text-lg text-muted">{huawei.intro}</p>

          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-hairline sm:grid-cols-4">
            {huawei.impact.map((stat) => (
              <div key={stat.label} className="bg-card p-4">
                <dd className="text-2xl font-semibold tracking-tight">{stat.value}</dd>
                <dt className="font-mono text-xs text-muted">{stat.label}</dt>
              </div>
            ))}
          </dl>

          <p className="mt-6 max-w-3xl rounded-[var(--radius-card)] border border-hairline bg-card p-4 text-sm text-muted">
            <span className="font-mono text-xs text-accent">// note · </span>
            {huawei.note}
          </p>
        </Container>
      </section>

      {/* ── The five tools ───────────────────────────────────── */}
      <section className="border-b border-hairline">
        <Container className="py-12 sm:py-20">
          <Kicker>the tools</Kicker>
          <div className="mt-8 space-y-5">
            {huawei.tools.map((tool, i) => (
              <article
                key={tool.name}
                className="rounded-[var(--radius-card)] border border-hairline bg-card p-6"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-lg font-semibold tracking-tight">{tool.name}</h2>
                  <span className="rounded-full border border-hairline px-2 py-0.5 font-mono text-[0.625rem] text-muted">
                    {tool.usage}
                  </span>
                </div>

                <p className="mt-3 text-muted">{tool.summary}</p>

                <ul className="mt-4 space-y-1.5">
                  {tool.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm">
                      <span aria-hidden="true" className="font-mono text-accent">
                        ·
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  {tool.skills.map((skill) => (
                    <TechTag key={skill}>{skill}</TechTag>
                  ))}
                </div>

                <a
                  href={tool.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block font-mono text-xs text-accent transition-colors hover:text-accent-hover max-lg:min-h-11"
                >
                  view sanitized source ↗
                </a>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Practices, cross-referenced to the tools ─────────── */}
      <section>
        <Container className="py-12 sm:py-20">
          <Kicker>engineering practices carried forward</Kicker>
          <p className="mt-4 max-w-3xl text-muted">{huawei.practicesNote}</p>
          <div className="mt-8">
            <PracticeMatrix tools={huawei.tools} practices={huawei.practices} />
          </div>
        </Container>
      </section>
    </>
  );
}
