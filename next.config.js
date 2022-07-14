/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GOOGLE_SHEETS_CLIENT_EMAIL: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    GOOGLE_SHEETS_PRIVATE_KEY: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
  },
  async redirects() {
    return [
      {
        source: '/computation-limits-deep-learning',
        destination: '/computation-limits-deep-learning/image-classification-on-imagenet',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
