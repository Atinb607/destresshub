/**
 * DeStressHub - SEO & Analytics Utilities
 * Manages per-page meta tags, Open Graph, Twitter Cards, canonical URLs,
 * structured data (JSON-LD), and Google Analytics 4.
 */

const SITE_URL = 'https://www.destresshub.com'
const SITE_NAME = 'DeStress Hub'
const DEFAULT_IMAGE = 'https://www.destresshub.com/logo%20new.png'
const GA_MEASUREMENT_ID = 'G-1D783SSKW5'

/**
 * Update document <head> with page-specific SEO metadata.
 * @param {Object} config
 * @param {string} config.title - Page title
 * @param {string} config.description - Meta description
 * @param {string} config.path - Canonical path (e.g. '/corporate')
 * @param {string} [config.image] - OG/Twitter image URL
 * @param {string} [config.type] - OG type (default: 'website')
 */
export function updateSEO({ title, description, path, image, type = 'website' }) {
  const canonicalUrl = `${SITE_URL}${path === '/' ? '' : path}`
  const ogImage = image || DEFAULT_IMAGE

  // Title
  document.title = title

  // Standard meta
  setMeta('description', description)
  setMeta('robots', 'index, follow')

  // Canonical
  setLink('canonical', canonicalUrl)

  // Open Graph
  setMetaProperty('og:title', title)
  setMetaProperty('og:description', description)
  setMetaProperty('og:url', canonicalUrl)
  setMetaProperty('og:image', ogImage)
  setMetaProperty('og:type', type)
  setMetaProperty('og:site_name', SITE_NAME)

  // Twitter Card
  setMeta('twitter:card', 'summary_large_image')
  setMeta('twitter:title', title)
  setMeta('twitter:description', description)
  setMeta('twitter:image', ogImage)
}

/** Helper: set or create a <meta name="..."> tag */
function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Helper: set or create a <meta property="..."> tag */
function setMetaProperty(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Helper: set or create a <link rel="..."> tag */
function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/* ============================================================
   JSON-LD Structured Data
   ============================================================ */

/** Inject or update a JSON-LD script block */
function setJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

/** Inject Organization + WebSite structured data (called once on app init) */
export function injectStructuredData() {
  // Organization
  setJsonLd('ld-organization', {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DeStress Hub',
    url: SITE_URL,
    logo: DEFAULT_IMAGE,
    description: 'DeStress Hub helps organizations improve employee wellbeing through stress management workshops, laughter wellness sessions, emotional intelligence training, employee engagement programs and corporate wellness initiatives.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9417765533',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi']
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'SCO 75, Second Floor, Sector 40 C',
      addressLocality: 'Chandigarh',
      addressCountry: 'IN'
    },
    sameAs: [
      'https://www.linkedin.com/company/destresshub',
      'https://www.youtube.com/@D-StressHub',
      'https://www.instagram.com/dstresshub/'
    ]
  })

  // WebSite (enables sitelinks search box)
  setJsonLd('ld-website', {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DeStress Hub',
    url: SITE_URL
  })
}

/** Inject BreadcrumbList structured data for a page */
export function injectBreadcrumbs(items) {
  setJsonLd('ld-breadcrumb', {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url ? `${SITE_URL}${item.url}` : undefined
    }))
  })
}

/* ============================================================
   Google Analytics 4
   ============================================================ */

let ga4Initialized = false

/** Load the GA4 gtag.js script and initialize */
export function initGA4() {
  if (ga4Initialized) return
  ga4Initialized = true

  // Load gtag.js
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || []
  window.gtag = function() { window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false  // We manually send page views on SPA navigation
  })
}

/** Track a page view in GA4 (call on every SPA route change) */
export function trackPageView(path, title) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
      page_location: `${SITE_URL}${path}`
    })
  }
}
