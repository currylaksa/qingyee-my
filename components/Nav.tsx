import Link from 'next/link';
import Container from './Container';
import NavLinks from './NavLinks';
import MobileMenu from './MobileMenu';
import { personalInfo } from '@/lib/content';
import { getAssetPresence } from '@/lib/assetPresence.server';

export default function Nav() {
  const { hasCv } = getAssetPresence();

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper/85 backdrop-blur">
      <Container className="flex h-14 items-center justify-between gap-3 md:h-16 md:gap-4">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 font-mono text-sm font-medium tracking-tight max-sm:min-h-11"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-ink text-xs text-paper">
            {personalInfo.initials}
          </span>
          <span className="truncate">{personalInfo.fullName}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <NavLinks />
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <span className="hidden items-center gap-2 font-mono text-xs text-secure sm:inline-flex">
            <span
              className="h-1.5 w-1.5 rounded-full bg-secure"
              aria-hidden="true"
            />
            {personalInfo.status}
          </span>
          {hasCv && (
            <a
              href="/cv.pdf"
              aria-label="Download CV"
              className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-paper transition-colors hover:bg-accent-hover max-sm:flex max-sm:min-h-11 max-sm:items-center"
            >
              {/* The full label needs room the phone header doesn't have. */}
              <span className="sm:hidden">CV</span>
              <span className="hidden sm:inline">Download CV</span>
            </a>
          )}
          <MobileMenu hasCv={hasCv} />
        </div>
      </Container>
    </header>
  );
}
