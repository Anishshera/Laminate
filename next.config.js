/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    srcDir: true,  // Ye src/app ko root samajhega
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
