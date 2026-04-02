/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // For easy asset loading without remote patterns
  },
};

module.exports = nextConfig;
