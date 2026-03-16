/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wzcittbasbjwmegplnih.supabase.co",
        pathname: "/storage/v1/object/public/ppdhome-pic/**",
      },
    ],
  },
};

export default nextConfig;