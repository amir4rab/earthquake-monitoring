/** @type {import('next').NextConfig} */

const nextTranslate = require('next-translate');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ['pages', 'src']
  },
  async redirects() {
    return [
      {
        source: '/:locale*/marker-icon.png',
        destination: '/assets/leaflet/marker-icon.svg',
        permanent: false,
        locale: false
      },
      {
        source: '/:locale*/marker-icon-2x.png',
        destination: '/assets/leaflet/marker-icon.svg',
        permanent: false,
        locale: false
      },
      {
        source: '/:locale*/marker-shadow.png',
        destination: '/assets/leaflet/shadow.png',
        permanent: false,
        locale: false
      },
      {
        source: '/:locale*/layers.png',
        destination: '/assets/leaflet/layers.svg',
        permanent: false,
        locale: false
      },
      {
        source: '/:locale*/layers-2x.png',
        destination: '/assets/leaflet/layers.svg',
        permanent: false,
        locale: false
      }
    ];
  }
};

module.exports = (_phase, { _ }) => {
  const plugins = [nextTranslate, withBundleAnalyzer];
  return plugins.reduce((acc, plugin) => plugin(acc), { ...nextConfig });
};
