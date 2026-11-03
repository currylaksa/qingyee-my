'use client';

import { useState } from 'react';

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="rounded-md border border-hairline px-5 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
    >
      {copied ? 'Copied' : 'Copy email'}
    </button>
  );
}
