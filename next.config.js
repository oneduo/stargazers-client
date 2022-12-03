const { withSentryConfig } = require("@sentry/nextjs")

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  sentry: {
    hideSourceMaps: true,
    excludeServerRoutes: ["/api/og", "/og"],
  },

  images: {
    domains: ["avatars.githubusercontent.com"],
  },
}

const sentryWebpackPluginOptions = {
  silent: true,
}

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)
