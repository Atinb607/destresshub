/**
 * DeStressHub - Standalone Digital Business Card Page (/card)
 * Mobile-first, centered layout without main site navigation clutter.
 */

import { BUSINESS_INFO } from '../config/business-info.js'
import { renderCardVisual, renderCardActionsMarkup, initCardActions } from '../components/digital-card.js'
import { updateSEO } from '../utils/seo.js'
import { refreshCursorHovers } from '../components/cursor.js'

export async function cardPage() {
  const html = `
    <div class="dc-standalone-page">
      <div class="dc-standalone-wrap">
        
        <!-- Clean Back Header -->
        <header class="dc-back-bar">
          <a href="/" data-link class="dc-back-link" aria-label="Return to DeStress Hub Homepage">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>destresshub.com</span>
          </a>
          <span class="dc-verified-badge" title="Official Verified Card">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span>Official Card</span>
          </span>
        </header>

        <!-- Full-Page Digital Card & Action Controls -->
        <main class="dc-standalone-card">
          ${renderCardVisual({ idPrefix: 'page' })}
          ${renderCardActionsMarkup({ idPrefix: 'page' })}
        </main>

        <!-- Minimal Footnote -->
        <footer class="dc-standalone-footer">
          <p class="dc-helper-note">Scan with camera or tap <strong>Save Contact</strong> to add DeStress Hub to your phone.</p>
          <span class="dc-copyright">© ${new Date().getFullYear()} ${BUSINESS_INFO.legalName || BUSINESS_INFO.name}. All rights reserved.</span>
        </footer>

      </div>
    </div>
  `

  const init = () => {
    // Hide persistent floating FAB and mobile CTA bar while on the standalone card page
    document.body.classList.add('dc-page-active')

    // SEO, Open Graph & Twitter meta tags
    updateSEO({
      title: 'DeStress Hub | Digital Business Card',
      description: 'Official Digital Business Card of DeStress Hub. Healing through laughter, one joyful session at a time. Save contact details, phone, address, and connect on social media.',
      path: '/card',
      image: BUSINESS_INFO.logoFullUrl,
      type: 'profile'
    })

    // Initialize QR code, vCard, export, share, and copy buttons
    initCardActions({ idPrefix: 'page' })

    // Refresh custom cursor
    refreshCursorHovers()
  }

  const cleanup = () => {
    // Restore persistent floating elements when navigating to other routes
    document.body.classList.remove('dc-page-active')
  }

  return { html, init, cleanup }
}
