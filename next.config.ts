import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Own photos are served from /public/images. Japan Guide entries temporarily
    // borrow freely licensed photos from Wikimedia Commons (credited on the page).
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "thumb.wikimedia.org" },
    ],
  },
};

export default nextConfig;
