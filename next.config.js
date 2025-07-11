/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // GitHub Pages configuration
  basePath: process.env.NODE_ENV === 'production' ? '/tutoring' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/tutoring/' : '',
  trailingSlash: true,
  output: 'export', // Enable static export
  distDir: 'out', // Output directory
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/webp', 'image/avif'],
    unoptimized: true, // Required for static export
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig 