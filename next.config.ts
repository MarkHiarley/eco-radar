import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        port: '',
        pathname: '/vetores-premium/**',
      }
    ]
  }
};

export default nextConfig;
