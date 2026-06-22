import type { Metadata } from 'next';
import Container from '@/components/Container';
import Kicker from '@/components/Kicker';
import ContactForm from '@/components/ContactForm';
import { personalInfo, findMe } from '@/lib/content';
import { isUsableKey } from '@/lib/assetPresence';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${personalInfo.fullName} — open to network-security engineering roles in Singapore.`,
};

const formKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export default function ContactPage() {
  const hasFormKey = isUsableKey(formKey);

  return (
    <section>
      <Container className="py-16 sm:py-20">
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
          {/* Direct channels */}
          <div>
            <ul className="space-y-3">
              {findMe.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex items-center justify-between rounded-[var(--radius-card)] border border-hairline bg-card px-4 py-3 transition-colors hover:border-accent/40"
                  >
                    <span className="text-sm font-medium">{link.label}</span>
                    <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Form (or fallback when no key is configured yet) */}
          <div>
            {hasFormKey ? (
              <ContactForm accessKey={formKey!} />
            ) : (
              <div className="rounded-[var(--radius-card)] border border-dashed border-hairline bg-card p-6">
                <p className="text-sm text-muted">
                  The message form will appear here once the contact endpoint is
                  configured. In the meantime, please reach me by{' '}
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-accent underline underline-offset-2 hover:text-accent-hover"
                  >
                    email
                  </a>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
