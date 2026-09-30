/**
 * DeStressHub - vCard 3.0 Generation Utility
 * Builds compliant .vcf files (RFC 2426) directly from BUSINESS_INFO.
 * Zero external dependencies.
 */

import { BUSINESS_INFO } from '../config/business-info.js'

/**
 * Escapes characters for vCard 3.0 text values per RFC 2426 section 2.4.2:
 * Backslashes, semicolons, commas, and newlines must be backslash-escaped.
 *
 * @param {string|null|undefined} text
 * @returns {string}
 */
export function escapeVCard(text) {
  if (text === null || text === undefined) return ''
  return String(text)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n')
}

/**
 * Generate a standard vCard 3.0 string from a business info object.
 * Uses CRLF line endings (\r\n) per specification.
 *
 * @param {Object} [info=BUSINESS_INFO] - Business info data source
 * @returns {string} Compliant vCard 3.0 content
 */
export function generateVCard(info = BUSINESS_INFO) {
  const CRLF = '\r\n'
  const lines = []

  // Envelope
  lines.push('BEGIN:VCARD')
  lines.push('VERSION:3.0')
  lines.push('PRODID:-//DeStress Hub//Digital Business Card//EN')

  // Organization & Full Name
  const name = info.name || info.legalName || 'DeStress Hub'
  lines.push(`FN:${escapeVCard(name)}`)
  lines.push(`ORG:${escapeVCard(name)}`)
  lines.push(`N:;;;;`)
  
  // Apple iOS Contacts Business Card identification
  lines.push('X-ABShowAs:COMPANY')

  // Title / Tagline
  if (info.tagline) {
    lines.push(`TITLE:${escapeVCard(info.tagline)}`)
  }

  // Work Number 1 (Primary: 9464663405)
  const phone1 = (info.phoneTel || info.phone || '+919464663405').replace(/\s+/g, '')
  lines.push(`TEL;TYPE=WORK,VOICE;TYPE=pref:${phone1}`)

  // Work Number 2 (Secondary: 9417765533)
  const phone2 = (info.phone2Tel || info.phone2 || '+919417765533').replace(/\s+/g, '')
  lines.push(`item1.TEL;TYPE=WORK,VOICE:${phone2}`)
  lines.push('item1.X-ABLabel:Work 2')

  // Email (Omit if null or missing)
  if (info.email) {
    lines.push(`EMAIL;TYPE=WORK,INTERNET:${escapeVCard(info.email)}`)
  }

  // Address (RFC 2426: ADR;TYPE=WORK:;;street;city;state;postalCode;country)
  if (info.address) {
    const street = escapeVCard(info.address.street || '')
    const city = escapeVCard(info.address.city || '')
    const country = escapeVCard(info.address.country || '')
    lines.push(`ADR;TYPE=WORK:;;${street};${city};;;${country}`)
  }

  // Google Maps Location Link
  let itemIdx = 2
  if (info.address && info.address.mapUrl) {
    lines.push(`item${itemIdx}.URL:${info.address.mapUrl}`)
    lines.push(`item${itemIdx}.X-ABLabel:Google Maps`)
    itemIdx++
  }

  // Website URL
  if (info.website) {
    lines.push(`URL:${info.website}`)
  }

  // Shareable Digital Card URL
  const cardUrl = `${info.website}/card`
  lines.push(`item${itemIdx}.URL:${cardUrl}`)
  lines.push(`item${itemIdx}.X-ABLabel:Digital Card`)
  itemIdx++

  // Social Profile URLs with iOS X-ABLabel
  if (info.socials) {
    if (info.socials.instagram && info.socials.instagram.url) {
      lines.push(`item${itemIdx}.URL:${info.socials.instagram.url}`)
      lines.push(`item${itemIdx}.X-ABLabel:Instagram`)
      itemIdx++
    }
    if (info.socials.linkedin && info.socials.linkedin.url) {
      lines.push(`item${itemIdx}.URL:${info.socials.linkedin.url}`)
      lines.push(`item${itemIdx}.X-ABLabel:LinkedIn`)
      itemIdx++
    }
    if (info.socials.youtube && info.socials.youtube.url) {
      lines.push(`item${itemIdx}.URL:${info.socials.youtube.url}`)
      lines.push(`item${itemIdx}.X-ABLabel:YouTube`)
      itemIdx++
    }
  }

  // Note with Tagline & Brief Summary
  const noteParts = []
  if (info.tagline) noteParts.push(info.tagline)
  if (info.description) noteParts.push(info.description)
  if (noteParts.length > 0) {
    lines.push(`NOTE:${escapeVCard(noteParts.join(' • '))}`)
  }

  // End Envelope
  lines.push('END:VCARD')
  lines.push('') // Trailing CRLF

  return lines.join(CRLF)
}

/**
 * Client-side fallback to download a vCard file as a Blob.
 *
 * @param {string} [vcardString] - Optional raw vCard string; defaults to generateVCard()
 * @param {string} [filename='destresshub.vcf'] - Target file name
 */
export function downloadVCardBlob(vcardString = generateVCard(), filename = 'destresshub.vcf') {
  const blob = new Blob([vcardString], { type: 'text/x-vcard;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
