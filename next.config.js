/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // React strict mode on
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // sabhi domains allow
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false, // agar TypeScript me error hua to build fail
  },
};

module.exports = nextConfig;
