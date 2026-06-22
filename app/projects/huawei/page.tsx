import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import Kicker from '@/components/Kicker';
import TechTag from '@/components/TechTag';
import { huawei } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Huawei automation suite',
  description:
    'Five sanitized automation tools built during a Project Engineer internship at Huawei Malaysia — secure credential handling, record correlation, and validation across network-site data.',
};

export default function HuaweiPage() {
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

          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
            Huawei automation suite
          </h1>
          <p className="mt-3 font-mono text-sm text-muted">{huawei.role}</p>
          <p className="mt-6 max-w-3xl text-lg text-muted">{huawei.intro}</p>

          <p className="mt-6 max-w-3xl rounded-[var(--radius-card)] border border-hairline bg-card p-4 text-sm text-muted">
            <span className="font-mono text-xs text-accent">// note · </span>
            {huawei.note}
          </p>
        </Container>
      </section>

      {/* ── The five tools ───────────────────────────────────── */}
      <section className="border-b border-hairline">
        <Container className="py-16 sm:py-20">
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
                  className="mt-4 inline-block font-mono text-xs text-accent transition-colors hover:text-accent-hover"
                >
                  view sanitized source ↗
                </a>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Network-security relevance ───────────────────────── */}
      <section>
        <Container className="py-16 sm:py-20">
          <Kicker>why it matters for network security</Kicker>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {huawei.securityRelevance.map((item) => (
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
    </>
  );
}
