/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "ssl.pstatic.net",
      "avatars.githubusercontent.com",
      "k.kakaocdn.net",
      "tailwindui.com",
      "images.unsplash.com",
      "cdn.sanity.io",
    ],
  },
};

module.exports = nextConfig;
