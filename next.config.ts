import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  redirects() {
    return [
      {
        source: "/",
        destination: "/user/home",
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
