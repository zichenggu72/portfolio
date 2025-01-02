/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['savee.it'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'savee.it',
        pathname: '/i/**',
      },
    ],
  },
  images: {
    localPatterns: [
      {
        pathname: '/assets/images/**',
        search: '',
      },
    ],
  },
};

module.exports = nextConfig;