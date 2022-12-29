const path =  require('path');
const withExportImages = require('next-export-optimize-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE_BUNDLE == 'true',
  openAnalyzer: false
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  swcMinify: true,
  compress: true
}

module.exports = withExportImages(
  withBundleAnalyzer(nextConfig), 
  {
    configPath: 'export-images.config.js',
  }
);
