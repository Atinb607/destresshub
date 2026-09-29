import { defineConfig } from 'vite'
import { v2 as cloudinary } from 'cloudinary'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Load .env into process.env for the dev server middleware.
// Vite only auto-exposes VITE_-prefixed vars; the Cloudinary secrets
// intentionally don't use that prefix (they must stay server-only).
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
 * Vite dev plugin that intercepts /api/gallery-photos requests locally,
 * so `npm run dev` works without needing the Vercel CLI.
 * The same Cloudinary Admin API logic as the serverless function runs inline.
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

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    port: 3000,
    open: true
  },
  plugins: [galleryPhotosDevPlugin()],
})