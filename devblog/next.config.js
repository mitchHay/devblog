const path =  require('path');
const withExportImages = require('next-export-optimize-images');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  swcMinify: true,
  compress: true
}

module.exports = withExportImages(
  nextConfig, {
  configPath: 'optimize.config.js',
});
