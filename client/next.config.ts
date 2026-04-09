import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "discoverholidaysbd.com",
      "ozvxzsjtzdrrwejjiomf.supabase.co",
      "i.pravatar.cc",
      "example.com",
      "res.cloudinary.com",
      "img.examplecdn.com",
      "www.gravatar.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Add other Next.js config options if needed
};

export default nextConfig;
