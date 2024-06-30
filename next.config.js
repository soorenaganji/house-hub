/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "buasqibyaroyxebuqtsw.supabase.co",
        pathname: "/storage/v1/object/public/HouseHub/Posts/**",
      },
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
        pathname: "/**",
      },
    ],
  },
};
