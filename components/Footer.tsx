import Container from './Container';
import { personalInfo, findMe } from '@/lib/content';

// Static, verifiable security-posture badge (brief §9). Each claim links to a
// real third-party scan rather than a fragile client-side check.
const securityBadges = [
  { label: 'Security headers', value: 'A', href: 'https://securityheaders.com/?q=qingyee.my' },
  { label: 'TLS', value: 'A', href: 'https://www.ssllabs.com/ssltest/analyze.html?d=qingyee.my' },
  { label: 'Client trackers', value: '0', href: undefined },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline">
      <Container className="flex flex-col gap-6 py-10">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-xs text-muted">
          <span className="text-secure" aria-hidden="true">
            ●
          </span>
          {securityBadges.map((b, i) => {
            const body = (
              <>
                {b.label}: <span className="text-ink">{b.value}</span>
              </>
            );
            return (
              <span key={b.label} className="flex items-center gap-2">
                {b.href ? (
                  <a
                    href={b.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent"
                  >
                    {body}
                  </a>
                ) : (
                  <span>{body}</span>
                )}
                {i < securityBadges.length - 1 && (
                  <span aria-hidden="true" className="text-hairline">
                    ·
                  </span>
                )}
              </span>
            );
          })}
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-hairline pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">
            © {year} {personalInfo.fullName}. {personalInfo.location}.
          </p>
          <ul className="flex flex-wrap gap-4 text-sm">
            {findMe.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-muted transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
