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
function videoThumbUrl(publicId) {
  return `https://res.cloudinary.com/${CLOUD}/video/upload/so_0,w_640,h_360,c_fill,q_auto,f_jpg/${publicId}`
}
function videoPlayUrl(publicId) {
  return `https://res.cloudinary.com/${CLOUD}/video/upload/q_auto,f_auto/${publicId}.mp4`
}

/* ---- Local photo lists ---- */
const sessionPhotos = [
  { src: '/Gallery/Photos/IMG_2865.jpg', alt: 'Session photo' },
  { src: '/Gallery/Photos/IMG_2878.jpg', alt: 'Session photo' },
  { src: '/Gallery/Photos/IMG_3191.jpg', alt: 'Session photo' },
  { src: '/Gallery/Photos/IMG_3378.jpg', alt: 'Session photo' },
  { src: '/Gallery/Photos/IMG_3388.jpg', alt: 'Session photo' },
  { src: '/Gallery/Photos/IMG_7480.jpg', alt: 'Session photo' },
  { src: '/Gallery/Photos/RON00726.jpg', alt: 'Session photo' },
  { src: '/Gallery/Photos/RON00732.jpg', alt: 'Session photo' },
]

const momentPhotos = [
  { src: '/Gallery/Moments/IMG-20260418-WA0327.jpg', alt: 'Moment of laughter' },
  { src: '/Gallery/Moments/IMG-20260418-WA0342.jpg', alt: 'Moment of laughter' },
  { src: '/Gallery/Moments/IMG-20260418-WA0504.jpg', alt: 'Moment of laughter' },
  { src: '/Gallery/Moments/IMG-20260418-WA0554(1).jpg', alt: 'Moment of laughter' },
  { src: '/Gallery/Moments/IMG-20260418-WA0555.jpg', alt: 'Moment of laughter' },
  { src: '/Gallery/Moments/IMG-20260418-WA0568(1).jpg', alt: 'Moment of laughter' },
  { src: '/Gallery/Moments/IMG_2733.jpg', alt: 'Moment of laughter' },
  { src: '/Gallery/Moments/IMG_3358.jpg', alt: 'Moment of laughter' },
  { src: '/Gallery/Moments/IMG_3366.jpg', alt: 'Moment of laughter' },
  { src: '/Gallery/Moments/IMG_3369.jpg', alt: 'Moment of laughter' },
  { src: '/Gallery/Moments/IMG_6069.jpg', alt: 'Moment of laughter' },
  { src: '/Gallery/Moments/IMG_7440.jpg', alt: 'Moment of laughter' },
  { src: '/Gallery/Moments/IMG_7452.jpg', alt: 'Moment of laughter' },
  { src: '/Gallery/Moments/IMG_7865.jpg', alt: 'Moment of laughter' },
  { src: '/Gallery/Moments/IMG_7961.JPG.jpeg', alt: 'Moment of laughter' },
  { src: '/Gallery/Moments/IMG_7989.jpg', alt: 'Moment of laughter' },
  { src: '/Gallery/Moments/IMG_E8052.JPG', alt: 'Moment of laughter' },
  { src: '/Gallery/Moments/pic 1.jpg', alt: 'Moment of laughter' },
  { src: '/Gallery/Moments/pic 2.jpg', alt: 'Moment of laughter' },
  { src: '/Gallery/Moments/pic 3.jpg', alt: 'Moment of laughter' },
  { src: '/Gallery/Moments/pic 4.jpg', alt: 'Moment of laughter' },
  { src: '/Gallery/Moments/pic 5.jpg', alt: 'Moment of laughter' },
  { src: '/Gallery/Moments/pic 6.jpg', alt: 'Moment of laughter' },
  { src: '/Gallery/Moments/pic 7.jpg', alt: 'Moment of laughter' },
  { src: '/Gallery/Moments/pic 8.jpg', alt: 'Moment of laughter' },
]

/* ---- Play icon SVG ---- */
const playSvg = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`

/* ---- Build HTML ---- */
function renderPhotoGrid(photos, glightboxClass) {
  return photos.map(p => `
    <a href="${p.src}" class="photo-grid-item glightbox-${glightboxClass}" data-gallery="${glightboxClass}">
      <img src="${p.src}" alt="${p.alt}" loading="lazy"
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
        <div class="photo-grid reveal up">
          ${renderPhotoGrid(sessionPhotos, 'sessions')}
        </div>
      </section>

      <!-- Moments of Laughter -->
      <section class="gallery-section" id="gallery-moments" data-section="moments">
        <div class="gallery-section-title reveal up">
          <div class="line"></div>
          <h3>Moments of Laughter</h3>
        </div>
        <div class="photo-grid reveal up">
          ${renderPhotoGrid(momentPhotos, 'moments')}
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

    // Initialize GLightbox for session photos
    const photoLightbox1 = GLightbox({
      selector: '.glightbox-sessions',
      touchNavigation: true,
      loop: true,
      zoomable: true,
      draggable: true,
      openEffect: 'fade',
      closeEffect: 'fade',
    })

    // Initialize GLightbox for moment photos
    const photoLightbox2 = GLightbox({
      selector: '.glightbox-moments',
      touchNavigation: true,
      loop: true,
      zoomable: true,
      draggable: true,
      openEffect: 'fade',
      closeEffect: 'fade',
    })

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
