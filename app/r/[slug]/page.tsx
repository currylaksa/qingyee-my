import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import { trackedLinks } from '@/lib/content';

// Kept out of search results: these paths exist only to be counted, and a
// duplicate of the home page in the index would be worse than useless.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return trackedLinks.map(({ slug }) => ({ slug }));
}

export default async function TrackedEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const link = trackedLinks.find((l) => l.slug === slug);
  if (!link) notFound();

  return (
    <section>
      {/*
        A 1s meta refresh rather than an instant redirect: the Cloudflare
        beacon is injected into this HTML and needs the page to actually load
        before it reports, which is the whole point of the route. React 19
        hoists this into <head>. No JS involved, so it still works if the
        beacon is blocked.
      */}
      <meta httpEquiv="refresh" content={`1;url=${link.target}`} />
      <Container className="py-20">
        <p className="font-mono text-xs tracking-widest text-muted uppercase">
          redirecting
        </p>
        <p className="mt-4 text-lg">
          Taking you to qingyee.my —{' '}
          <a href={link.target} className="text-accent underline underline-offset-4">
            continue now
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
