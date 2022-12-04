const { withSentryConfig } = require("@sentry/nextjs")

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  sentry: {
    hideSourceMaps: true,
    excludeServerRoutes: ["/api/og", "/og"],
  },

  async redirects() {
    return [
      process.env.MAINTENANCE_MODE === "1" ? { source: "/", destination: "/maintenance", permanent: false } : null,
    ].filter(Boolean)
  },

  images: {
    domains: [
      "avatars.githubusercontent.com",
      "github.com",
      "stargazers.localhost",
      "localhost",
      "stargazers.app",
      "www.stargazers.app",
    ],
  },
}

const sentryWebpackPluginOptions = {
  silent: true,
}

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)
