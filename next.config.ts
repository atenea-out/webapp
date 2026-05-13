import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const baseConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
}

// withPayload generates Windows absolute paths for @payload-config
// which Turbopack rejects with "windows imports are not implemented yet".
// We intercept and replace with a relative path after the fact.
const config = withPayload(baseConfig) as NextConfig

if (config.experimental && 'enableServerFastRefresh' in config.experimental) {
  delete (config.experimental as Record<string, unknown>).enableServerFastRefresh
}

if (config.experimental && 'turbopackServerFastRefresh' in config.experimental) {
  delete (config.experimental as Record<string, unknown>).turbopackServerFastRefresh
}

if (config.turbopack && (config.turbopack as Record<string, unknown>).resolveAlias) {
  const alias = (config.turbopack as Record<string, unknown>).resolveAlias as Record<string, string>
  alias['@payload-config'] = './payload.config.ts'
}

export default config
