import type { Metadata } from 'next';
import Container from '@/components/Container';
import Kicker from '@/components/Kicker';
import SkillIcon from '@/components/SkillIcon';
import TechTag from '@/components/TechTag';
import { certs, education, achievements, skillGroups } from '@/lib/content';
import { orgMark } from '@/lib/orgMark';

export const metadata: Metadata = {
  title: 'Credentials',
  description:
    'Test Solutions Engineer at Micron Singapore. Certifications, skills, and achievements: Cisco CCNA (Switching, Routing & Wireless Essentials, Enterprise Networking, Security & Automation, DevNet Associate), Google Cybersecurity, Oracle OCI AI Foundations Associate, DIGITEX 2026 Silver, and a B.Sc. in Computer Science, UTM.',
};

const testStack = ['Wafer', 'Probe', 'Test program', 'Data', 'Yield'];

function MedalIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <circle cx="12" cy="9" r="5" />
      <path d="M8.5 13L7 21l5-2 5 2-1.5-8" />
      <path d="M10 9l1.5 1.5L14 8" />
    </svg>
  );
}

export default function CredentialsPage() {
  return (
    <section>
      <Container className="py-12 sm:py-20">
        <Kicker>credentials</Kicker>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Certifications, skills &amp; achievements
        </h1>

        {/* Test stack */}
        <div className="reveal mt-8 rounded-[var(--radius-card)] border border-hairline bg-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-xs text-muted">// test stack</p>
            <span className="font-mono text-[0.625rem] text-accent">
              wafer sort
            </span>
          </div>

          <div className="relative mt-5">
            <div
              aria-hidden="true"
              className="absolute left-[10%] right-[10%] top-4 h-px bg-hairline"
            />
            <ol className="relative grid grid-cols-5 gap-1">
              {testStack.map((step, i) => (
                <li key={step} className="flex flex-col items-center text-center">
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-hairline bg-paper font-mono text-[0.625rem] text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-2 font-mono text-[0.5625rem] text-muted">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <p className="mt-3 text-xs text-muted">
            The part of the flow I work in now: die still on the wafer,
            debugged before packaging.
          </p>
        </div>

        {/* Certifications grid */}
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certs.map((cert) => (
            <li
              key={cert.name}
              className="reveal flex flex-col rounded-[var(--radius-card)] border border-hairline bg-card p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-md border border-hairline bg-paper font-mono text-[0.625rem] text-accent">
                  {orgMark(cert.org)}
                </span>
                <span className="font-mono text-[0.625rem] text-muted">
                  certification
                </span>
              </div>

              <p className="mt-4 text-base font-semibold">{cert.name}</p>
              <p className="mt-1 font-mono text-xs text-muted">{cert.org}</p>

              <div className="mt-auto pt-4">
                {cert.date && (
                  <p className="font-mono text-xs text-muted">{cert.date}</p>
                )}
                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap font-mono text-xs text-accent transition-colors hover:text-accent-hover"
                  >
                    verify ↗
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Technical skills */}
        <div className="mt-12">
          <Kicker>technical skills</Kicker>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <div
                key={group.label}
                className="reveal rounded-[var(--radius-card)] border border-hairline bg-card p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-hairline bg-paper text-accent">
                    <SkillIcon label={group.label} />
                  </span>
                  <div>
                    <p className="font-mono text-xs text-accent">{group.label}</p>
                    {group.blurb && (
                      <p className="mt-1 text-sm text-muted">{group.blurb}</p>
                    )}
                  </div>
                </div>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item}>
                      <TechTag>{item}</TechTag>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-12">
          <Kicker>achievements</Kicker>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {achievements.map((a) => (
              <li
                key={a.title}
                className="reveal rounded-[var(--radius-card)] border border-hairline bg-card p-5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-accent/30 bg-accent/5 text-accent">
                    <MedalIcon />
                  </span>
                  <span className="font-mono text-xs text-muted">{a.date}</span>
                </div>
                <p className="mt-4 text-base font-semibold">{a.title}</p>
                <p className="mt-1 text-sm text-muted">{a.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Education */}
        <div className="mt-12">
          <Kicker>education</Kicker>
          <div className="reveal mt-6 rounded-[var(--radius-card)] border border-hairline bg-card p-6">
            <div className="grid gap-6 sm:grid-cols-[1.5fr_1fr] sm:items-start">
              <div>
                <p className="font-mono text-xs text-accent">// formal degree</p>
                <h2 className="mt-2 text-lg font-semibold">
                  {education.formalDegree}
                </h2>
                <p className="mt-1 text-muted">{education.university}</p>
                <p className="mt-1 font-mono text-xs text-muted">
                  Specialisation: {education.specialisation}
                </p>
                {education.verifyUrl && (
                  <a
                    href={education.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap mt-4 inline-block font-mono text-xs text-accent transition-colors hover:text-accent-hover"
                  >
                    Verify degree ↗
                  </a>
                )}
              </div>

              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-hairline">
                <div className="bg-card p-3">
                  <dt className="font-mono text-[0.625rem] text-muted">
                    Graduated
                  </dt>
                  <dd className="mt-1 text-sm">{education.year}</dd>
                </div>
                <div className="bg-card p-3">
                  <dt className="font-mono text-[0.625rem] text-muted">CGPA</dt>
                  <dd className="mt-1 text-sm">{education.cgpa}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
