/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { 
        protocol: "https",
        hostname: "th.bing.com", 
        pathname: "/th/id/**"
      }
    ]
  }
};

export default nextConfig;
