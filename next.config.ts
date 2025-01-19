import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.onlinescoutmanager.co.uk',
        port: '',
        search: '',
      },
    ],
  },
};

export default nextConfig;
