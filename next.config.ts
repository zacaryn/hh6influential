import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**', pathname: '/**' },
    ],
  },
  // Prevent CSS optimization issues in production
  experimental: {
    optimizeCss: false,
  },
  // Ensure CSS is properly handled
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Ensure CSS is not overly optimized in production
      config.optimization.splitChunks.cacheGroups.styles = {
        name: 'styles',
        test: /\.(css|scss)$/,
        chunks: 'all',
        enforce: true,
      };
    }
    return config;
  },
};

export default nextConfig;
