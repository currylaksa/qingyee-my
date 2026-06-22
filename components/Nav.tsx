import Link from 'next/link';
import Container from './Container';
import NavLinks from './NavLinks';
import { personalInfo } from '@/lib/content';
import { getAssetPresence } from '@/lib/assetPresence.server';

export default function Nav() {
  const { hasCv } = getAssetPresence();

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm font-medium tracking-tight"
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-ink text-xs text-paper">
            {personalInfo.initials}
          </span>
          <span className="sr-only sm:not-sr-only">qingyee.my</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-3">
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
              className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-paper transition-colors hover:bg-accent-hover"
            >
              Download CV
            </a>
          )}
        </div>
      </Container>

      {/* Mobile nav row */}
      <nav aria-label="Primary mobile" className="border-t border-hairline md:hidden">
        <Container className="py-1">
          <NavLinks />
        </Container>
      </nav>
    </header>
  );
}
