// storage-adapter-import-placeholder
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import nodemailerSendgrid from 'nodemailer-sendgrid'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { BlogPosts } from './collections/BlogPosts'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  debug: process.env.NODE_ENV === 'development',
  upload: {
    limits: {
      fileSize: 50000000, // 5MB, adjust as needed
    },
  },
  secret: process.env.PAYLOAD_SECRET || 'ABCD1234efgh',
  collections: [Users, Media, BlogPosts],
  editor: lexicalEditor(),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      max: 10,
    },
    schemaName: 'payload',
  }),
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  sharp,
  email: nodemailerAdapter({
    defaultFromAddress: 'chris@bookschrisreads.com',
    defaultFromName: 'Chris',
    transportOptions: nodemailerSendgrid({
      apiKey: process.env.SENDGRID_API_KEY!,
    }),
  }),
  plugins: [
    //payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
