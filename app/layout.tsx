import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Fraunces } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { personalInfo } from '@/lib/content';
import './globals.css';

// Fraunces is reserved for the single Wilderfarer pull-quote only (brief §10).
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://qingyee.my'),
  title: {
    default: `${personalInfo.fullName} — ${personalInfo.tagline}`,
    template: `%s — ${personalInfo.fullName}`,
  },
  description:
    'Test Solutions Engineer at Micron Technology, Singapore — wafer-level probe test, test programs, and test data.',
  keywords: [
    'Test Solutions Engineer',
    'Semiconductor Test',
    'Wafer Probe',
    'Wafer Sort',
    'Test Program',
    'C++',
    'Python',
    'Linux',
    'Micron',
    'Singapore',
    'Chan Qing Yee',
    'Network Security',
    'CCNA',
    'Zero Trust',
  ],
  authors: [{ name: personalInfo.fullName, url: 'https://qingyee.my' }],
  creator: personalInfo.fullName,
  // og:title / og:description fall back to each page's title + description.
  openGraph: {
    type: 'website',
    siteName: 'qingyee.my',
    locale: 'en_US',
    url: 'https://qingyee.my',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  themeColor: '#0c0d0f',
};

// JSON-LD Person schema (brief §11).
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: personalInfo.fullName,
  url: 'https://qingyee.my',
  jobTitle: personalInfo.tagline,
  worksFor: { '@type': 'Organization', name: 'Micron Technology' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: personalInfo.university },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Singapore',
    addressCountry: 'SG',
  },
  email: `mailto:${personalInfo.email}`,
  sameAs: [personalInfo.github, personalInfo.linkedin],
  knowsAbout: [
    'Wafer Probe Test',
    'Semiconductor Test Engineering',
    'Test Program Development',
    'Test Data Analysis',
    'C++',
    'Python',
    'Linux',
    'Computer Networking',
    'Network Security',
    'Zero Trust Architecture',
    'Network Automation',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <div className="scroll-progress" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
