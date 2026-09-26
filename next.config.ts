import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder images come from picsum.photos (which redirects to fastly.picsum.photos).
    // Add your own image host here when you swap in real photos.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
};

export default nextConfig;
