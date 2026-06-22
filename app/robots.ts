import type { MetadataRoute } from 'next';

// Required for metadata routes under output: 'export'.
export const dynamic = 'force-static';

const SITE = 'https://qingyee.my';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
