import type { Metadata } from 'next';
import Container from '@/components/Container';
import Kicker from '@/components/Kicker';
import TechTag from '@/components/TechTag';
import { certs, education, achievements, skillGroups } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Credentials',
  description:
    'Certifications, skills, and achievements: Cisco CCNA (Switching, Routing & Wireless Essentials, Enterprise Networking, Security & Automation, DevNet Associate), Google Cybersecurity, Oracle OCI AI Foundations Associate, DIGITEX 2026 Silver, and a B.Sc. in Computer Science, UTM.',
};

export default function CredentialsPage() {
  return (
    <section>
      <Container className="py-12 sm:py-20">
        <Kicker>credentials</Kicker>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Certifications, skills &amp; achievements
        </h1>

        {/* Certifications grid */}
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certs.map((cert) => (
            <li
              key={cert.name}
              className="flex flex-col rounded-[var(--radius-card)] border border-hairline bg-card p-5"
            >
              <p className="font-mono text-xs text-muted">{cert.org}</p>
              <p className="mt-1 text-base font-semibold">{cert.name}</p>
              <div className="mt-auto pt-3">
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
                className="rounded-[var(--radius-card)] border border-hairline bg-card p-5"
              >
                <p className="font-mono text-xs text-accent">{group.label}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
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
          <ul className="mt-6 space-y-3">
            {achievements.map((a) => (
              <li
                key={a.title}
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-[var(--radius-card)] border border-hairline bg-card p-5"
              >
                <span className="text-base font-semibold">{a.title}</span>
                <span className="font-mono text-xs text-muted">{a.date}</span>
                <span className="w-full text-sm text-muted">{a.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Education */}
        <div className="mt-12">
          <Kicker>education</Kicker>
          <div className="mt-6 rounded-[var(--radius-card)] border border-hairline bg-card p-6">
            <h2 className="text-lg font-semibold">{education.degree}</h2>
            <p className="mt-1 text-muted">{education.university}</p>
            <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 font-mono text-sm">
              <div className="flex items-baseline gap-2">
                <dt className="text-muted">Graduated</dt>
                <dd>{education.year}</dd>
              </div>
              <div className="flex items-baseline gap-2">
                <dt className="text-muted">CGPA</dt>
                <dd>{education.cgpa}</dd>
              </div>
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
