/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
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
