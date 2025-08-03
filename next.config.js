/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    domains: [],
  },
  // Ensure static files are properly handled
  trailingSlash: false,
  // Optimize for production deployment
  experimental: {
    outputFileTracingRoot: undefined,
  },
}

module.exports = nextConfig
