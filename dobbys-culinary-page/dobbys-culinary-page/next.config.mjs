/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produce a fully static site in ./out so it can run offline with any static server.
  output: 'export',
  // Static export can't use the Image Optimization server, so serve images as-is.
  images: { unoptimized: true },
  // Emit /recipe/x/index.html style paths so the export works when opened directly.
  trailingSlash: true,
};

export default nextConfig;
