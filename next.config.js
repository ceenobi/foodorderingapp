/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com'],
    deviceSizes: [320, 768, 960, 1200, 1536],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
