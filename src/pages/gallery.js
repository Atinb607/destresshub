/**
 * Gallery Page — Session Photos, Moments, and HR Video Testimonials
 */

import { renderNavbar, initNavbar } from '../components/navbar.js'
import { renderFooter } from '../components/footer.js'
import { sectionHeader } from '../components/section-header.js'
import { initRevealAnimations } from '../utils/animations.js'
import { refreshCursorHovers } from '../components/cursor.js'
import { updateSEO, injectBreadcrumbs } from '../utils/seo.js'
import testimonials from '../data/testimonials.json'
import GLightbox from 'glightbox'
import 'glightbox/dist/css/glightbox.min.css'

/* ---- Cloudinary URL builders ---- */
const CLOUD = 'oyzd4zsd'

// Video builders (unchanged — manual config, w_720 cap)
function videoThumbUrl(publicId) {
  return `https://res.cloudinary.com/${CLOUD}/video/upload/so_0,w_640,h_360,c_fill,q_auto,f_jpg/${publicId}`
}
function videoPlayUrl(publicId) {
  return `https://res.cloudinary.com/${CLOUD}/video/upload/q_auto,f_auto/${publicId}.mp4`
}

// Photo builders — capped transformations to control credit usage
function photoThumbUrl(publicId) {
  return `https://res.cloudinary.com/${CLOUD}/image/upload/w_400,h_400,c_fill,q_auto,f_auto/${publicId}`
}
function photoFullUrl(publicId) {
  return `https://res.cloudinary.com/${CLOUD}/image/upload/w_1600,q_auto,f_auto/${publicId}`
}

/* ---- Play icon SVG ---- */
const playSvg = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`

/* ---- Skeleton placeholder for loading state ---- */
function renderPhotoSkeleton(count, glightboxClass) {
  return Array.from({ length: count }, () => `
    <div class="photo-grid-item photo-skeleton" data-gallery="${glightboxClass}">
      <div class="skeleton-shimmer"></div>
    </div>
  `).join('')
}

/* ---- Build photo grid from Cloudinary data ---- */
function renderPhotoGrid(photos, glightboxClass, altText) {
  return photos.map(p => `
    <a href="${photoFullUrl(p.public_id)}" class="photo-grid-item glightbox-${glightboxClass}" data-gallery="${glightboxClass}">
      <img src="${photoThumbUrl(p.public_id)}" alt="${altText}" loading="lazy"
           sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 280px">
    </a>
  `).join('')
}

function renderVideoGrid() {
  return testimonials.map(t => {
    const caption = t.name ? `${t.name}, ${t.company}` : t.company
    const titleAttr = t.name || t.company
    return `
      <div class="video-card glightbox-videos"
           data-gallery="videos"
           data-href="${videoPlayUrl(t.public_id)}"
           data-type="video"
           data-title="${titleAttr}"
           data-description="${t.company}"
           role="button"
           tabindex="0"
           aria-label="Play testimonial from ${caption}">
        <div class="video-thumb-wrap">
          <img src="${videoThumbUrl(t.public_id)}" alt="Testimonial from ${caption}" loading="lazy">
          <div class="video-play-icon">${playSvg}</div>
        </div>
        <div class="video-caption">
          ${t.name ? `<div class="video-caption-name">${t.name}</div>` : ''}
          <div class="video-caption-role">${t.company}</div>
        </div>
      </div>
    `
  }).join('')
}

export function galleryPage() {
  const html = `
    ${renderNavbar()}

    <div class="gallery-page">
      <!-- Hero -->
      <div class="gallery-hero">
        <div class="gallery-hero-inner reveal up">
          ${sectionHeader({ tag: 'Gallery', title: 'Moments of<br/><em>pure joy.</em>', theme: 'dark' })}
          <p class="body" style="max-width:560px;margin-top:16px;text-align:center;">Glimpses from our wellness sessions, workshops, and the genuine laughter that transforms teams across organizations.</p>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="gallery-tabs reveal up">
        <button class="gallery-tab active" data-tab="all">All</button>
        <button class="gallery-tab" data-tab="photos">Session Photos</button>
        <button class="gallery-tab" data-tab="moments">Moments of Laughter</button>
        <button class="gallery-tab" data-tab="videos">Testimonials and Feedbacks</button>
      </div>

      <!-- Session Photos -->
      <section class="gallery-section" id="gallery-photos" data-section="photos">
        <div class="gallery-section-title reveal up">
          <div class="line"></div>
          <h3>Session Photos</h3>
        </div>
        <div class="photo-grid reveal up" id="photos-grid">
          ${renderPhotoSkeleton(8, 'sessions')}
        </div>
      </section>

      <!-- Moments of Laughter -->
      <section class="gallery-section" id="gallery-moments" data-section="moments">
        <div class="gallery-section-title reveal up">
          <div class="line"></div>
          <h3>Moments of Laughter</h3>
        </div>
        <div class="photo-grid reveal up" id="moments-grid">
          ${renderPhotoSkeleton(12, 'moments')}
        </div>
      </section>

      <!-- Testimonials and Feedbacks -->
      <section class="gallery-section" id="gallery-testimonials" data-section="videos">
        <div class="gallery-section-title reveal up">
          <div class="line"></div>
          <h3>Testimonials and Feedbacks</h3>
        </div>
        <div class="video-grid reveal up">
          ${renderVideoGrid()}
        </div>
      </section>
    </div>

    ${renderFooter()}
  `

  const init = () => {
    updateSEO({
      title: 'Gallery | DeStress Hub — Session Photos & Testimonials',
      description: 'Browse photos and video testimonials from DeStress Hub wellness sessions across organizations like iOTA, iCuerious, Punjab University, and more.',
      path: '/gallery'
    })
    injectBreadcrumbs([
      { name: 'Home', url: '/' },
      { name: 'Gallery' }
    ])

    initNavbar()
    initRevealAnimations()
    refreshCursorHovers()

    // ── Photo lightbox instances (will be initialized after photos load) ──
    let photoLightbox1 = null
    let photoLightbox2 = null

    /**
     * Fetch photos from the serverless API and populate both grids.
     * On failure, the skeleton placeholders are replaced with a brief message.
     */
    async function loadPhotos() {
      try {
        const resp = await fetch('/api/gallery-photos')
        if (!resp.ok) throw new Error(`API returned ${resp.status}`)
        const data = await resp.json()

        // Populate Session Photos grid
        const photosGrid = document.getElementById('photos-grid')
        if (photosGrid && data.photos && data.photos.length > 0) {
          photosGrid.innerHTML = renderPhotoGrid(data.photos, 'sessions', 'Session photo')
        } else if (photosGrid) {
          photosGrid.innerHTML = '<p class="gallery-empty">Session photos are currently unavailable.</p>'
        }

        // Populate Moments grid
        const momentsGrid = document.getElementById('moments-grid')
        if (momentsGrid && data.moments && data.moments.length > 0) {
          momentsGrid.innerHTML = renderPhotoGrid(data.moments, 'moments', 'Moment of laughter')
        } else if (momentsGrid) {
          momentsGrid.innerHTML = '<p class="gallery-empty">Moment photos are currently unavailable.</p>'
        }
      } catch (err) {
        console.warn('Gallery photo load failed, showing fallback:', err.message)
        const photosGrid = document.getElementById('photos-grid')
        const momentsGrid = document.getElementById('moments-grid')
        if (photosGrid) photosGrid.innerHTML = '<p class="gallery-empty">Photos could not be loaded. Please try again later.</p>'
        if (momentsGrid) momentsGrid.innerHTML = '<p class="gallery-empty">Photos could not be loaded. Please try again later.</p>'
      }

      // Initialize (or re-initialize) GLightbox for the freshly inserted photos
      if (photoLightbox1) { try { photoLightbox1.destroy() } catch (_) { /* noop */ } }
      if (photoLightbox2) { try { photoLightbox2.destroy() } catch (_) { /* noop */ } }

      photoLightbox1 = GLightbox({
        selector: '.glightbox-sessions',
        touchNavigation: true,
        loop: true,
        zoomable: true,
        draggable: true,
        openEffect: 'fade',
        closeEffect: 'fade',
      })

      photoLightbox2 = GLightbox({
        selector: '.glightbox-moments',
        touchNavigation: true,
        loop: true,
        zoomable: true,
        draggable: true,
        openEffect: 'fade',
        closeEffect: 'fade',
      })
    }

    // Fire the async photo load
    loadPhotos()

    // ── Video lightbox (unchanged) ──
    // Initialize GLightbox for video testimonials
    // Build elements array manually from the video cards
    const videoElements = []
    document.querySelectorAll('.glightbox-videos').forEach(card => {
      videoElements.push({
        href: card.dataset.href,
        type: 'video',
        source: 'local',
        title: card.dataset.title,
        description: card.dataset.description,
        width: '90vw',
      })
    })

    const videoLightbox = GLightbox({
      elements: videoElements,
      touchNavigation: true,
      loop: true,
      autoplayVideos: true,
      openEffect: 'fade',
      closeEffect: 'fade',
    })

    // Wire up video card clicks to open the correct slide
    document.querySelectorAll('.glightbox-videos').forEach((card, index) => {
      const handler = (e) => {
        e.preventDefault()
        videoLightbox.openAt(index)
      }
      card.addEventListener('click', handler)
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          videoLightbox.openAt(index)
        }
      })
    })

    // Tab filtering
    const tabs = document.querySelectorAll('.gallery-tab')
    const sections = document.querySelectorAll('.gallery-section')

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab

        // Update active tab
        tabs.forEach(t => t.classList.remove('active'))
        tab.classList.add('active')

        // Show/hide sections
        sections.forEach(section => {
          if (target === 'all' || section.dataset.section === target) {
            section.style.display = ''
          } else {
            section.style.display = 'none'
          }
        })
      })
    })
  }

  return { html, init }
}
