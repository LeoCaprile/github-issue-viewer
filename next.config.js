/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    GH_TOKEN: process.env.GH_TOKEN,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'github.githubassets.com',
      },
    ],
  },
};

module.exports = nextConfig;
