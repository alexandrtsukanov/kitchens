import type { NextConfig } from "next";
const path = require('path');

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    // Sets the absolute path for module resolution
    root: path.join(__dirname, '..'), 
  },
};

export default nextConfig;
