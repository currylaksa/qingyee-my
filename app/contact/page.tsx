import type { Metadata } from 'next';
import Container from '@/components/Container';
import Kicker from '@/components/Kicker';
import { personalInfo, contactChannels, contactFacts } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${personalInfo.fullName} — open to network and security engineering roles in Singapore.`,
};

export default function ContactPage() {
  return (
    <section>
      <Container className="py-12 sm:py-20">
        <Kicker>contact</Kicker>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Let’s talk
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-secure" aria-hidden="true" />
            {personalInfo.status}
          </span>{' '}
          — based in {personalInfo.location}, ready for Singapore. The fastest way
          to reach me is below.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Direct channels — label above the real address so a recruiter can
              read and copy it without clicking through. */}
          <div>
            <h2 className="font-mono text-sm text-accent">// direct channels</h2>
            <ul className="mt-4 space-y-3">
              {contactChannels.map((link) => {
                const external = link.href.startsWith('http');
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="group flex items-center justify-between gap-4 rounded-[var(--radius-card)] border border-hairline bg-card px-4 py-3 transition-colors hover:border-accent/40"
                    >
                      <span className="min-w-0">
                        <span className="block font-mono text-xs text-muted">
                          {link.label}
                        </span>
                        <span className="mt-0.5 block truncate text-sm font-medium transition-colors group-hover:text-accent">
                          {link.value} ↗
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Good to know — sets expectations and balances the column. */}
          <div>
            <h2 className="font-mono text-sm text-accent">// good to know</h2>
            <dl className="mt-4 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-hairline sm:grid-cols-2">
              {contactFacts.map((fact) => (
                <div key={fact.label} className="bg-card p-4">
                  <dt className="font-mono text-xs text-muted">{fact.label}</dt>
                  <dd className="mt-1 text-sm">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-muted">
              Hiring for a network or security role? A line about the team and
              the stack is enough — I’ll reply with availability and a CV.
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="mt-6 inline-flex items-center rounded-md bg-accent px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent-hover"
            >
              Email me
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
