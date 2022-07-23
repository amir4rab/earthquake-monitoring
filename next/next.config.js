/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const nextTranslate = require('next-translate');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const config = {
  reactStrictMode: true,
  swcMinify: true,
}

// module.exports = withPlugins(
//   [
//     nextTranslate,
//     withBundleAnalyzer
//   ],
//   process.env.IS_DOCKER_BUILD === 'true' ? 
//     {
//       ...config,
//       output: 'standalone'
//     } :
//     config
// );

module.exports = nextTranslate( config )