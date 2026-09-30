import { defineConfig } from 'vite'
import { v2 as cloudinary } from 'cloudinary'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'
import { BUSINESS_INFO } from './src/config/business-info.js'
import { generateVCard } from './src/utils/vcard.js'

// Load .env into process.env for the dev server middleware.
try {
  const envPath = resolve(process.cwd(), '.env')
  const envContent = readFileSync(envPath, 'utf-8')
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim()
    if (!process.env[key]) process.env[key] = val
  }
} catch (_) { /* .env may not exist in CI */ }

/**
 * Vite dev plugin that intercepts /api/gallery-photos requests locally.
 */
function galleryPhotosDevPlugin() {
  return {
    name: 'gallery-photos-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/gallery-photos', async (req, res) => {
        if (req.method !== 'GET') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        try {
          cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
          })

          async function listFolder(folderPath) {
            const results = []
            let nextCursor = undefined
            do {
              const resp = await cloudinary.api.resources_by_asset_folder(folderPath, {
                max_results: 500,
                resource_type: 'image',
                ...(nextCursor && { next_cursor: nextCursor }),
              })
              for (const r of resp.resources) {
                results.push({ public_id: r.public_id, format: r.format })
              }
              nextCursor = resp.next_cursor
            } while (nextCursor)

            // Deduplicate heic/jpg pairs - prefer non-heic
            const byBase = new Map()
            for (const item of results) {
              const base = item.public_id.replace(/_[a-z0-9]+$/i, '')
              const existing = byBase.get(base)
              if (!existing) {
                byBase.set(base, item)
              } else if (existing.format === 'heic' && item.format !== 'heic') {
                byBase.set(base, item)
              }
            }
            return Array.from(byBase.values())
          }

          const [photos, moments] = await Promise.all([
            listFolder('Gallery/Photos'),
            listFolder('Gallery/Moments'),
          ])

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ photos, moments }))
        } catch (err) {
          const safeMsg = (err && err.error && err.error.message) || (typeof err.message === 'string' ? err.message : 'Unknown error')
          console.error('Dev API - Cloudinary error:', safeMsg)
          res.statusCode = 502
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ photos: [], moments: [], error: 'upstream_error' }))
        }
      })
    },
  }
}

/**
 * Plugin to automatically maintain public/destresshub.vcf from single source of truth (BUSINESS_INFO)
 * and serve /destresshub.vcf and /api/vcard with proper headers during local development.
 */
function vcardPlugin() {
  const syncVCardFile = () => {
    try {
      const vcard = generateVCard(BUSINESS_INFO)
      const publicDir = resolve(process.cwd(), 'public')
      if (!existsSync(publicDir)) {
        mkdirSync(publicDir, { recursive: true })
      }
      writeFileSync(resolve(publicDir, 'destresshub.vcf'), vcard, 'utf-8')
    } catch (err) {
      console.warn('Unable to write static public/destresshub.vcf:', err)
    }
  }

  // Sync on startup
  syncVCardFile()

  return {
    name: 'vcard-plugin',
    buildStart() {
      syncVCardFile()
    },
    configureServer(server) {
      const serveVCard = (req, res) => {
        const vcard = generateVCard(BUSINESS_INFO)
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/vcard; charset=utf-8')
        res.setHeader('Content-Disposition', 'inline; filename="destresshub.vcf"')
        res.setHeader('Cache-Control', 'public, max-age=3600')
        res.end(vcard)
      }

      server.middlewares.use('/destresshub.vcf', serveVCard)
      server.middlewares.use('/api/vcard', serveVCard)
    }
  }
}

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        card: resolve(process.cwd(), 'card.html'),
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  plugins: [galleryPhotosDevPlugin(), vcardPlugin()],
})