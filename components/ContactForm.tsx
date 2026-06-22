'use client';

import { useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm({ accessKey }: { accessKey: string }) {
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: accessKey, ...data }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-[var(--radius-card)] border border-secure/30 bg-secure/5 p-6"
      >
        <p className="font-medium text-secure">Message sent.</p>
        <p className="mt-1 text-sm text-muted">
          Thanks — I’ll get back to you shortly.
        </p>
      </div>
    );
  }

  const field =
    'mt-1 w-full rounded-md border border-hairline bg-card px-3 py-2 text-sm outline-none focus:border-accent';

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {/* Honeypot — bots fill this; humans never see it. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
      />

      <div>
        <label htmlFor="name" className="font-mono text-xs text-muted">
          Name
        </label>
        <input id="name" name="name" type="text" required className={field} />
      </div>

      <div>
        <label htmlFor="email" className="font-mono text-xs text-muted">
          Email
        </label>
        <input id="email" name="email" type="email" required className={field} />
      </div>

      <div>
        <label htmlFor="message" className="font-mono text-xs text-muted">
          Message
        </label>
        <textarea id="message" name="message" rows={5} required className={field} />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent-hover disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>

      <p aria-live="polite" className="min-h-5 text-sm text-threat">
        {status === 'error' && 'Something went wrong — please email me directly.'}
      </p>
    </form>
  );
}
