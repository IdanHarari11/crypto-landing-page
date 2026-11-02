/** @type {import('next').NextConfig} */
const nextConfig = {
  // The site is the static page in public/, served at the main address.
  async rewrites() {
    return { beforeFiles: [{ source: '/', destination: '/index.html' }] };
  },
  images: {
    domains: [
      'upload.wikimedia.org',
      'cryptologos.cc',
      'images.unsplash.com',
      'png.pngtree.com',
      'static.vecteezy.com'
    ],
  },
};

export default nextConfig;
