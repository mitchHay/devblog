/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  output: 'export',
  outDir: './dist',
  exclude: [
    "/blog/test"
  ]
}