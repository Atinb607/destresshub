import { v2 as cloudinary } from 'cloudinary'

/**
 * Vercel Serverless Function — /api/gallery-photos
 *
 * Lists photo assets from Cloudinary folders Gallery/Photos and Gallery/Moments
 * using the Admin API. Credentials are read exclusively from environment variables.
 *
 * Caching: s-maxage=3600 (1 hour CDN cache), stale-while-revalidate=86400 (serve
 * stale for up to 24h if origin is down or slow).
 */

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

/**
 * Fetch all resources from a Cloudinary asset_folder, handling pagination.
 * Returns an array of { public_id, format } objects.
 */
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

  // Deduplicate: when the same base image exists as both .heic and .jpg,
  // keep only the non-heic version (avoids redundant transformation).
  // Base name = public_id up to the last underscore (Cloudinary suffix).
  const byBase = new Map()
  for (const item of results) {
    // Strip the Cloudinary random suffix (e.g. IMG_7452_zag7cq → IMG_7452)
    const base = item.public_id.replace(/_[a-z0-9]+$/i, '')
    const existing = byBase.get(base)
    if (!existing) {
      byBase.set(base, item)
    } else if (existing.format === 'heic' && item.format !== 'heic') {
      // Prefer non-heic over heic
      byBase.set(base, item)
    }
    // else keep existing (first non-heic wins, or first heic if both heic)
  }

  return Array.from(byBase.values())
}

export default async function handler(req, res) {
  // Only allow GET
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const [photos, moments] = await Promise.all([
      listFolder('Gallery/Photos'),
      listFolder('Gallery/Moments'),
    ])

    // CDN cache for 1 hour, serve stale for up to 24h during revalidation
    res.setHeader(
      'Cache-Control',
      's-maxage=3600, stale-while-revalidate=86400'
    )
    res.setHeader('Content-Type', 'application/json')

    return res.status(200).json({ photos, moments })
  } catch (err) {
    console.error('Cloudinary Admin API error:', (err && err.error && err.error.message) || (typeof err.message === 'string' ? err.message : 'Unknown error'))
    return res.status(502).json({ photos: [], moments: [], error: 'upstream_error' })
  }
}
