'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems, personalInfo } from '@/lib/content';

/**
 * Phone navigation (below md). A native <dialog> in modal mode, so focus
 * trapping, Escape-to-close and background inertness come from the platform
 * rather than hand-rolled listeners. Replaces the wrapping link row that used
 * to cost 65px of sticky header on every screen.
 */
export default function MobileMenu({ hasCv }: { hasCv: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Navigating within the app doesn't unmount the dialog — close it ourselves.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Open menu"
        className="grid h-11 w-11 place-items-center rounded-md text-ink transition-colors hover:text-accent"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          className="h-6 w-6"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      <dialog
        ref={ref}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === ref.current) setOpen(false);
        }}
        aria-label="Site menu"
        className="m-0 h-full max-h-none w-full max-w-none bg-paper p-0 text-ink backdrop:bg-ink/40"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-hairline px-5">
            <span className="font-mono text-sm text-muted">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="-mr-2 grid h-11 w-11 place-items-center rounded-md text-ink transition-colors hover:text-accent"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                className="h-6 w-6"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav aria-label="Primary" className="flex-1 overflow-y-auto px-5">
            <ul>
              {navItems.map((item) => {
                const active =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href} className="border-b border-hairline">
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`flex min-h-14 items-center justify-between text-lg transition-colors ${
                        active ? 'text-accent' : 'text-ink'
                      }`}
                    >
                      {item.label}
                      <span aria-hidden="true" className="font-mono text-xs text-muted">
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="shrink-0 border-t border-hairline px-5 py-5">
            <span className="inline-flex items-center gap-2 font-mono text-xs text-secure">
              <span
                className="h-1.5 w-1.5 rounded-full bg-secure"
                aria-hidden="true"
              />
              {personalInfo.status}
            </span>
            {hasCv && (
              <a
                href="/cv.pdf"
                className="mt-4 flex min-h-12 items-center justify-center rounded-md bg-accent px-5 text-sm font-medium text-paper transition-colors hover:bg-accent-hover"
              >
                Download CV
              </a>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}
