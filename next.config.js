/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASE_PATH || '',
  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}'
    }
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: `https://taoniu.kuuy.com/api/:path*`,
  //       basePath: false
  //     },
  //   ]
  // },
  // output: 'export',
  distDir: 'dist'
}

module.exports = nextConfig
