import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['static.kolable.com'],
  },
  allowedDevOrigins: ['172.16.7.78'],
};

export default nextConfig;
