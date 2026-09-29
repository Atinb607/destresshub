/**
 * Parallax effects - hero background and strip backgrounds
 * Call initParallax() after page render, and cleanupParallax() on page leave
 */

let parallaxHandler = null
let heroHandler = null

export function initParallax() {
  cleanupParallax()

  const heroBg = document.getElementById('hero-bg')
  if (heroBg) {
    heroHandler = () => {
      heroBg.style.transform = `scale(1.08) translateY(${window.scrollY * 0.35}px)`
    }
    window.addEventListener('scroll', heroHandler, { passive: true })
  }

  const strips = document.querySelectorAll('[data-parallax] .strip-bg')
  if (strips.length) {
    parallaxHandler = () => {
      strips.forEach(bg => {
        const rect = bg.parentElement.getBoundingClientRect()
        const prog = (window.innerHeight / 2 - rect.top - rect.height / 2) / window.innerHeight
        bg.style.transform = `translateY(${prog * 60}px)`
      })
    }
    window.addEventListener('scroll', parallaxHandler, { passive: true })
  }
}

export function cleanupParallax() {
  if (heroHandler) {
    window.removeEventListener('scroll', heroHandler)
    heroHandler = null
  }
  if (parallaxHandler) {
    window.removeEventListener('scroll', parallaxHandler)
    parallaxHandler = null
  }
}

/**
 * Gallery drag-to-scroll
 * Call initGalleryDrag() after the gallery track is in the DOM
 */
export function initGalleryDrag() {
  const track = document.getElementById('gallery-track')
  if (!track) return

  let isDown = false, startX, scrollLeft

  const onDown = (e) => {
    isDown = true
    track.classList.add('dragging')
    startX = (e.pageX || e.touches?.[0]?.pageX) - track.offsetLeft
    scrollLeft = track.scrollLeft
  }
  const onUp = () => {
    isDown = false
    track.classList.remove('dragging')
  }
  const onMove = (e) => {
    if (!isDown) return
    e.preventDefault()
    const x = (e.pageX || e.touches?.[0]?.pageX) - track.offsetLeft
    track.scrollLeft = scrollLeft - (x - startX) * 1.5
  }

  track.addEventListener('mousedown', onDown)
  track.addEventListener('touchstart', onDown, { passive: true })
  track.addEventListener('mouseleave', onUp)
  track.addEventListener('mouseup', onUp)
  track.addEventListener('touchend', onUp)
  track.addEventListener('mousemove', onMove)
  track.addEventListener('touchmove', onMove, { passive: false })
}
