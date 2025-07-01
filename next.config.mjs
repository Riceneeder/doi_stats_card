/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['cheerio', 'node-fetch']
  },
  // 只保留API路由，其他路径将通过vercel.json重定向
  async redirects() {
    return [
      {
        source: '/((?!api).*)',
        destination: 'https://github.com/Riceneeder/doi_stats_card',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
