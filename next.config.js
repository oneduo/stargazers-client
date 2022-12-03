const { withSentryConfig } = require("@sentry/nextjs")

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  sentry: {
    hideSourceMaps: true,
    excludeServerRoutes: ["/api/og", "/og"],
  },
}

const sentryWebpackPluginOptions = {
  silent: true,
}

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)
