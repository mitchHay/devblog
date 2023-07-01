const million = require('million/compiler');
const path = require('path');
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
  output: 'export',
  distDir: 'dist',
  swcMinify: true,
  compress: true,
  experimental: {
    nextScriptWorkers: true
  }
}

module.exports = million.next(
  withExportImages(
    withBundleAnalyzer(nextConfig), 
    {
      configPath: 'export-images.config.js',
    }
  )
);
