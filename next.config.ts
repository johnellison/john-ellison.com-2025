import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // output: 'standalone', // disabled for development testing
  poweredByHeader: false,

  // 301 Redirects for deprecated routes
  async redirects() {
    return [
      // Sprint page redirects to AI Transformation
      {
        source: '/sprint',
        destination: '/ai-transformation',
        permanent: true,
      },
      {
        source: '/sprint.html',
        destination: '/ai-transformation',
        permanent: true,
      },
      // Case studies redirect to Work page
      {
        source: '/case-studies',
        destination: '/work',
        permanent: true,
      },
    ];
  },

  // Rewrites for backwards compatibility with .html URLs
  async rewrites() {
    return [
      { source: '/contact.html', destination: '/contact' },
      { source: '/splash.html', destination: '/splash' },
      { source: '/ai-transformation.html', destination: '/ai-transformation' },
      { source: '/case-studies/toucan.html', destination: '/case-studies/toucan' },
      { source: '/case-studies/interbeing-case-study.html', destination: '/case-studies/interbeing' },
      { source: '/case-studies/interbeing-claude-4.5.html', destination: '/case-studies/interbeing-claude-4.5' },
      { source: '/podcast/index.html', destination: '/podcast' },
      { source: '/podcast/guest/index.html', destination: '/podcast/guest' },
    ];
  },

  // Cache headers for static assets
  async headers() {
    return [
      {
        source: '/:path*.css',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/:path*.js',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/:path*.(jpg|jpeg|png|gif|webp|avif|svg|ico)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/:path*.(woff|woff2|ttf|otf|eot)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
