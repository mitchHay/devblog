/**
 * @type {import('next-export-optimize-images').Config}
 */
const config = {
  outDir: 'dist',
  convertFormat: [
    ['png', 'webp']
  ]
}

module.exports = config;