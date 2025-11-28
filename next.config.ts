import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'uuypavxadszssptaicvt.supabase.co',
//         pathname: '/storage/**',
//       },
//     ],
//   },
// };
// https://uuypavxadszssptaicvt.supabase.co
// export default nextConfig;

/** 
 * @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;

