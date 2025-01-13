import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
  //       port: '',
  //       pathname: '/**',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 'images.unsplash.com',
  //       port: '',
  //       pathname: '/**',
  //     },
  //   ],
  // },
  typescript: {
    ignoreBuildErrors: true, // TypeScript 오류를 무시하고 빌드 진행
  },
};

export default nextConfig;
