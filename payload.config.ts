import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Collections
import { Posts } from './collections/Posts'
import { Services } from './collections/Services'
import { Industries } from './collections/Industries'
import { Team } from './collections/Team'
import { Media } from './collections/Media'
import { Users } from './collections/Users'

// Globals
import { SiteSettings } from './globals/SiteSettings'
import { Navigation } from './globals/Navigation'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const payloadSecret = process.env.PAYLOAD_SECRET
const databaseUri = process.env.DATABASE_URI
const isProduction = process.env.NODE_ENV === 'production'
const isProductionBuild = process.env.NEXT_PHASE === 'phase-production-build'
const shouldEnforceProductionDatabase = isProduction && !isProductionBuild
const isPostgresUri =
  databaseUri?.startsWith('postgres://') || databaseUri?.startsWith('postgresql://')

if (isProduction && !payloadSecret) {
  throw new Error('PAYLOAD_SECRET is required in production.')
}

if (shouldEnforceProductionDatabase && !databaseUri) {
  throw new Error('DATABASE_URI is required in production.')
}

if (shouldEnforceProductionDatabase && !isPostgresUri) {
  throw new Error('DATABASE_URI must be a Postgres connection string in production.')
}

const db = isPostgresUri
  ? postgresAdapter({
      pool: {
        connectionString: databaseUri,
      },
    })
  : sqliteAdapter({
      client: {
        url: databaseUri || 'file:./atenea.db',
      },
    })

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- Atenea CMS',
    },
  },
  collections: [Posts, Services, Industries, Team, Media, Users],
  globals: [SiteSettings, Navigation],
  editor: lexicalEditor({}),
  sharp,
  secret: payloadSecret || 'atenea-dev-secret',
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db,
  plugins: [
    seoPlugin({
      collections: ['posts', 'services', 'industries'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc?.title} - Atenea Outsourcing`,
      generateDescription: ({ doc }) => doc?.excerpt || doc?.shortDescription || '',
    }),
  ],
  upload: {
    limits: {
      fileSize: 5000000,
    },
  },
})
