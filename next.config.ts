import fs from 'node:fs';
import path from 'node:path';
import type { NextConfig } from 'next';
import dotenv from 'dotenv';

// const envPath = path.resolve(__dirname, `.env.${process.env.NEXT_ENV}`);

// if (fs.existsSync(envPath)) dotenv.config({ path: envPath });

const nextConfig: NextConfig = {
  reactStrictMode: false,

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_REQUEST_DOMAIN}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
