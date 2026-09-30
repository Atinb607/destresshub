import { BUSINESS_INFO } from '../src/config/business-info.js'
import { generateVCard } from '../src/utils/vcard.js'

/**
 * Vercel Serverless Function - /api/vcard
 * Serves real-time vCard 3.0 generated from the single source of truth (BUSINESS_INFO)
 * with required headers for direct iOS and Android contact saving.
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const vcard = generateVCard(BUSINESS_INFO)

    res.setHeader('Content-Type', 'text/vcard; charset=utf-8')
    res.setHeader('Content-Disposition', 'inline; filename="destresshub.vcf"')
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400')

    return res.status(200).send(vcard)
  } catch (err) {
    console.error('Error generating vCard:', err)
    return res.status(500).json({ error: 'Failed to generate vCard' })
  }
}
