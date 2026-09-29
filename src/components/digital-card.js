/**
 * DeStressHub - Digital Business Card Component
 * Includes Floating Action Button, Interactive Modal, Client-Side QR Code,
 * and High-Resolution PNG Export via html-to-image.
 */

import { BUSINESS_INFO } from '../config/business-info.js'
import { refreshCursorHovers } from './cursor.js'

let qrCodeGenerated = false
let isExporting = false
let lastFocusedElement = null

// Lazy loaded module references
let qrCodeLib = null
let exportLib = null

/**
 * Lazy load the QR code generator library
 */
async function getQRCodeLib() {
  if (!qrCodeLib) {
    const mod = await import('qrcode')
    qrCodeLib = mod.default || mod
  }
  return qrCodeLib
}

/**
 * Lazy load the html-to-image export library
 */
async function getExportLib() {
  if (!exportLib) {
    exportLib = await import('html-to-image')
  }
  return exportLib
}

/**
 * Render HTML for the Digital Card FAB and Modal
 */
export function renderDigitalCard() {
  const { name, tagline, logo, phone, phoneTel, whatsapp, whatsappUrl, email, address, website, websiteDisplay, socials } = BUSINESS_INFO

  return `
    <!-- Floating Action Button -->
    <button 
      type="button" 
      id="digital-card-btn" 
      class="digital-card-fab" 
      aria-label="Open Digital Business Card" 
      aria-haspopup="dialog" 
      aria-expanded="false" 
      title="Digital Card"
    >
      <div class="dc-fab-ring" aria-hidden="true"></div>
      <span class="dc-fab-tooltip" aria-hidden="true">Digital Card</span>
      <svg class="dc-fab-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="3"></rect>
        <circle cx="9" cy="10" r="2"></circle>
        <line x1="15" y1="8" x2="17" y2="8"></line>
        <line x1="15" y1="12" x2="17" y2="12"></line>
        <line x1="7" y1="16" x2="17" y2="16"></line>
      </svg>
    </button>

    <!-- Modal Backdrop -->
    <div id="digital-card-backdrop" class="dc-backdrop" aria-hidden="true"></div>

    <!-- Modal Dialog -->
    <div 
      id="digital-card-modal" 
      class="dc-modal" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="dc-card-title" 
      aria-hidden="true" 
      tabindex="-1"
    >
      <!-- Mobile Bottom-Sheet Drag Indicator -->
      <div class="dc-drag-handle dc-no-export" aria-hidden="true"></div>

      <!-- Close Button -->
      <button type="button" class="dc-close-btn dc-no-export" id="dc-close-btn" aria-label="Close digital business card">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <!-- Printable / Exportable Card Body -->
      <div id="digital-card-exportable" class="dc-card-body">
        
        <!-- Header: Logo, Name, Tagline -->
        <div class="dc-header">
          <div class="dc-logo-container">
            <img src="${logo}" alt="${name}" class="dc-logo-img" crossorigin="anonymous">
          </div>
          <h2 id="dc-card-title" class="dc-title">${name}</h2>
          ${tagline ? `<p class="dc-tagline">“${tagline}”</p>` : ''}
        </div>

        <div class="dc-ornament-divider">
          <span class="dc-line"></span>
          <span class="dc-dot"></span>
          <span class="dc-line"></span>
        </div>

        <!-- QR Code Section -->
        <div class="dc-qr-section">
          <div class="dc-qr-frame">
            <img id="dc-qr-img" class="dc-qr-img" alt="QR code linking to ${websiteDisplay}" width="140" height="140" />
          </div>
          <span class="dc-qr-caption">Scan to visit ${websiteDisplay}</span>
        </div>

        <!-- Contact Info Rows -->
        <div class="dc-contact-group">
          ${phone ? `
            <a href="tel:${phoneTel || phone}" class="dc-contact-row" title="Call ${phone}">
              <span class="dc-row-icon" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </span>
              <div class="dc-row-content">
                <span class="dc-row-label">Phone</span>
                <span class="dc-row-value">${phone}</span>
              </div>
            </a>
          ` : ''}

          ${whatsapp ? `
            <a href="${whatsappUrl || `https://wa.me/${whatsapp}`}" target="_blank" rel="noopener noreferrer" class="dc-contact-row" title="WhatsApp">
              <span class="dc-row-icon" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </span>
              <div class="dc-row-content">
                <span class="dc-row-label">WhatsApp</span>
                <span class="dc-row-value">${whatsapp}</span>
              </div>
            </a>
          ` : ''}

          ${email ? `
            <a href="mailto:${email}" class="dc-contact-row" title="Email">
              <span class="dc-row-icon" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </span>
              <div class="dc-row-content">
                <span class="dc-row-label">Email</span>
                <span class="dc-row-value">${email}</span>
              </div>
            </a>
          ` : ''}

          ${website ? `
            <a href="${website}" target="_blank" rel="noopener noreferrer" class="dc-contact-row" title="Website">
              <span class="dc-row-icon" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </span>
              <div class="dc-row-content">
                <span class="dc-row-label">Website</span>
                <span class="dc-row-value">${websiteDisplay || website}</span>
              </div>
            </a>
          ` : ''}

          ${address && address.full ? `
            <div class="dc-contact-row dc-address-row">
              <span class="dc-row-icon" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </span>
              <div class="dc-row-content">
                <span class="dc-row-label">Address</span>
                <span class="dc-row-value">${address.full}</span>
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Social Media Buttons -->
        ${socials ? `
          <div class="dc-socials-block">
            <span class="dc-socials-heading">Follow & Connect</span>
            <div class="dc-socials-grid">
              ${socials.instagram ? `
                <a href="${socials.instagram.url}" target="_blank" rel="noopener noreferrer" class="dc-social-pill" aria-label="Instagram">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                  <span>Instagram</span>
                </a>
              ` : ''}

              ${socials.linkedin ? `
                <a href="${socials.linkedin.url}" target="_blank" rel="noopener noreferrer" class="dc-social-pill" aria-label="LinkedIn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              ` : ''}

              ${socials.youtube ? `
                <a href="${socials.youtube.url}" target="_blank" rel="noopener noreferrer" class="dc-social-pill" aria-label="YouTube">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.555A3.002 3.002 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>YouTube</span>
                </a>
              ` : ''}
            </div>
          </div>
        ` : ''}

        <!-- Card Bottom Watermark -->
        <div class="dc-card-footer">
          <span>DeStressHub • Wellness & Joy</span>
        </div>

      </div>

      <!-- Modal Bottom Actions (Excluded from downloaded PNG) -->
      <div class="dc-modal-footer dc-no-export">
        <button type="button" id="dc-download-btn" class="btn-gold dc-download-action">
          <svg class="dc-dl-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span class="dc-dl-text">Download Card</span>
        </button>
        <div id="dc-export-status" class="dc-export-status" role="status" aria-live="polite"></div>
      </div>

    </div>
  `
}

/**
 * Initialize event listeners, modal transitions, and focus management
 */
export function initDigitalCard() {
  const fab = document.getElementById('digital-card-btn')
  const backdrop = document.getElementById('digital-card-backdrop')
  const modal = document.getElementById('digital-card-modal')
  const closeBtn = document.getElementById('dc-close-btn')
  const downloadBtn = document.getElementById('dc-download-btn')

  if (!fab || !backdrop || !modal) return

  // Smooth entrance for FAB
  setTimeout(() => {
    fab.classList.add('dc-fab-visible')
  }, 1200)

  const updateOrigin = () => {
    const fabRect = fab.getBoundingClientRect()
    const fabCenterX = fabRect.left + fabRect.width / 2
    const fabCenterY = fabRect.top + fabRect.height / 2

    const targetCenterX = window.innerWidth / 2
    const targetCenterY = window.innerHeight / 2

    const dx = fabCenterX - targetCenterX
    const dy = fabCenterY - targetCenterY
    const modalWidth = modal.offsetWidth || (window.innerWidth < 480 ? window.innerWidth - 24 : 440)
    const initialScale = Math.max(0.06, fabRect.width / modalWidth)

    modal.style.setProperty('--dc-dx', `${Math.round(dx)}px`)
    modal.style.setProperty('--dc-dy', `${Math.round(dy)}px`)
    modal.style.setProperty('--dc-scale', `${initialScale.toFixed(3)}`)
  }

  // Open Modal (expands from the button)
  const openModal = async () => {
    lastFocusedElement = document.activeElement

    updateOrigin()

    fab.setAttribute('aria-expanded', 'true')
    backdrop.classList.add('dc-active')
    backdrop.setAttribute('aria-hidden', 'false')
    modal.setAttribute('aria-hidden', 'false')
    document.body.classList.add('dc-modal-open')

    // Force layout reflow before triggering expand transition
    void modal.offsetHeight
    requestAnimationFrame(() => {
      modal.classList.add('dc-active')
    })

    // Generate QR code on first open
    if (!qrCodeGenerated) {
      try {
        const QRCode = await getQRCodeLib()
        const qrDataUrl = await QRCode.toDataURL(BUSINESS_INFO.website, {
          width: 320,
          margin: 1,
          color: {
            dark: '#0a2224',
            light: '#ffffff'
          }
        })
        const qrImg = document.getElementById('dc-qr-img')
        if (qrImg) {
          qrImg.src = qrDataUrl
        }
        qrCodeGenerated = true
      } catch (err) {
        console.error('Failed to generate digital card QR code:', err)
      }
    }

    // Refresh custom cursor hovers inside modal
    refreshCursorHovers()

    // Focus close button
    if (closeBtn) {
      setTimeout(() => closeBtn.focus(), 150)
    }
  }

  // Close Modal (collapses back into the button)
  const closeModal = () => {
    updateOrigin()
    fab.setAttribute('aria-expanded', 'false')
    modal.classList.remove('dc-active')
    backdrop.classList.remove('dc-active')
    document.body.classList.remove('dc-modal-open')

    setTimeout(() => {
      backdrop.setAttribute('aria-hidden', 'true')
      modal.setAttribute('aria-hidden', 'true')
    }, 480)

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus()
    }
  }

  // Focus trap inside modal
  const handleKeydown = (e) => {
    if (!modal.classList.contains('dc-active')) return

    if (e.key === 'Escape') {
      e.preventDefault()
      closeModal()
      return
    }

    if (e.key === 'Tab') {
      const focusables = modal.querySelectorAll('button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      if (focusables.length === 0) return

      const firstEl = focusables[0]
      const lastEl = focusables[focusables.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault()
          lastEl.focus()
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault()
          firstEl.focus()
        }
      }
    }
  }

  // Download Card as PNG
  const handleDownload = async () => {
    if (isExporting) return
    isExporting = true

    const statusEl = document.getElementById('dc-export-status')
    const dlText = downloadBtn?.querySelector('.dc-dl-text')
    const dlIcon = downloadBtn?.querySelector('.dc-dl-icon')
    const originalText = dlText ? dlText.textContent : 'Download Card'

    if (downloadBtn) downloadBtn.disabled = true
    if (dlText) dlText.textContent = 'Generating Card...'
    if (dlIcon) dlIcon.classList.add('dc-spin')
    if (statusEl) {
      statusEl.textContent = 'Preparing high-resolution image...'
      statusEl.className = 'dc-export-status dc-status-info'
    }

    try {
      const { toPng } = await getExportLib()
      const cardEl = document.getElementById('digital-card-exportable')
      if (!cardEl) throw new Error('Card element not found')

      // Ensure fonts and images are settled
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready
      }

      // Generate PNG with 2.5x pixel ratio for retina-sharp clarity
      const dataUrl = await toPng(cardEl, {
        pixelRatio: 2.5,
        backgroundColor: '#0a2224',
        cacheBust: true,
        skipFonts: true,
        filter: (node) => {
          if (node.classList && (node.classList.contains('dc-no-export') || node.classList.contains('dc-close-btn'))) {
            return false
          }
          return true
        }
      })

      // Trigger download
      const link = document.createElement('a')
      link.download = 'destresshub-digital-card.png'
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      if (dlText) dlText.textContent = 'Downloaded!'
      if (statusEl) {
        statusEl.textContent = 'Card saved successfully!'
        statusEl.className = 'dc-export-status dc-status-success'
      }

      setTimeout(() => {
        if (dlText) dlText.textContent = originalText
        if (statusEl) statusEl.textContent = ''
      }, 3000)

    } catch (err) {
      console.error('Failed to export digital card:', err)
      if (dlText) dlText.textContent = 'Export Failed'
      if (statusEl) {
        statusEl.textContent = 'Unable to export card. Please take a screenshot.'
        statusEl.className = 'dc-export-status dc-status-error'
      }
      setTimeout(() => {
        if (dlText) dlText.textContent = originalText
        if (statusEl) statusEl.textContent = ''
      }, 4000)
    } finally {
      isExporting = false
      if (downloadBtn) downloadBtn.disabled = false
      if (dlIcon) dlIcon.classList.remove('dc-spin')
    }
  }

  // Attach event handlers
  fab.addEventListener('click', openModal)
  if (closeBtn) closeBtn.addEventListener('click', closeModal)
  backdrop.addEventListener('click', closeModal)
  document.addEventListener('keydown', handleKeydown)
  if (downloadBtn) downloadBtn.addEventListener('click', handleDownload)
}
