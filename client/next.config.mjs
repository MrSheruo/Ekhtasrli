/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
      allowedOrigins: ["http://localhost:4000"],
    },
  },
};

export default nextConfig;
