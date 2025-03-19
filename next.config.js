/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'joy-fortune.com', 'res.cloudinary.com', 'www.tarot.com'],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig; 