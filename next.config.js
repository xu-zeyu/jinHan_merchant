/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
  async rewrites() {
    const target = process.env.API_PROXY_TARGET || 'http://127.0.0.1:8081';
    return [
      {
        source: '/api/admin/:path*',
        destination: `${target}/api/admin/:path*`,
      },
    ];
  },
}

module.exports = nextConfig
