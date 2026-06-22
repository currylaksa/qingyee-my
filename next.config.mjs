/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hardened static site: export to out/ for Cloudflare Pages.
  output: 'export',
  // Static export serves /route as /route/index.html — trailing slash keeps
  // CF Pages routing and relative asset paths consistent.
  trailingSlash: true,
  images: {
    // No Image Optimization server in a static export.
    unoptimized: true,
  },
};

export default nextConfig;
