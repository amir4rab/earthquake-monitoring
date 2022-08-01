/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const nextTranslate = require('next-translate');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withPlugins(
  [
    nextTranslate,
    withBundleAnalyzer
  ],
  {
    reactStrictMode: true,
    swcMinify: true,
    async redirects() {
      return [
        {
          source: '/:locale*/marker-icon.png',
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
          source: '/:locale*/marker-icon-2x.png',
          destination: '/assets/leaflet/marker-icon.svg',
          permanent: false,
          locale: false
        }
      ]
    }
  }
);