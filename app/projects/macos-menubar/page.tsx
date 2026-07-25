import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import Kicker from '@/components/Kicker';
import TechTag from '@/components/TechTag';
import { menuBarApps } from '@/lib/content';

export const metadata: Metadata = {
  title: 'macOS menu-bar utilities',
  description:
    'Three native, zero-dependency Swift menu-bar apps — a Claude session-usage gauge, a Mach-kernel RAM monitor, and a procedurally generated pixel hiker.',
};

export default function MenuBarPage() {
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
            macOS menu-bar utilities
          </h1>
          <p className="mt-3 font-mono text-sm text-muted">
            Personal projects · Swift + AppKit
          </p>
          <p className="mt-6 max-w-3xl text-lg text-muted">{menuBarApps.intro}</p>
        </Container>
      </section>

      {/* ── The three apps ───────────────────────────────────── */}
      <section>
        <Container className="py-16 sm:py-20">
          <Kicker>the apps</Kicker>
          <div className="mt-8 space-y-5">
            {menuBarApps.apps.map((app, i) => (
              <article
                key={app.name}
                className="rounded-[var(--radius-card)] border border-hairline bg-card p-6"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-lg font-semibold tracking-tight">{app.name}</h2>
                  <span className="rounded-full border border-hairline px-2 py-0.5 font-mono text-[0.625rem] text-muted">
                    {app.tagline}
                  </span>
                </div>

                <p className="mt-3 text-muted">{app.summary}</p>

                <ul className="mt-4 space-y-1.5">
                  {app.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm">
                      <span aria-hidden="true" className="font-mono text-accent">
                        ·
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  {app.stack.map((tech) => (
                    <TechTag key={tech}>{tech}</TechTag>
                  ))}
                </div>

                <a
                  href={app.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block font-mono text-xs text-accent transition-colors hover:text-accent-hover"
                >
                  view source ↗
                </a>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
