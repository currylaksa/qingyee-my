import type { MetadataRoute } from 'next';

// Required for metadata routes under output: 'export'.
export const dynamic = 'force-static';

const SITE = 'https://qingyee.my';

// Trailing slashes to match next.config trailingSlash + CF Pages routing.
const routes = [
  '/',
  '/projects/',
  '/projects/secureexam/',
  '/projects/huawei/',
  '/projects/networking-labs/',
  '/credentials/',
  '/about/',
  '/contact/',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${SITE}${route}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }));
}
