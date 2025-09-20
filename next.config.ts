/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['encrypted-tbn0.gstatic.com', 'images.unsplash.com'],
    remotePatterns: [new URL('https://assets.example.com/account123/**')],
  },
};
  


module.exports = nextConfig;