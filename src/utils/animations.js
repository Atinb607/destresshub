/**
 * Scroll-reveal animations using IntersectionObserver
 * Call initRevealAnimations() after each page render to observe new .reveal elements
 */

let revealObserver = null

export function initRevealAnimations() {
  // Disconnect previous observer
  if (revealObserver) revealObserver.disconnect()

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('in')
    })
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' })

  document.querySelectorAll('.reveal').forEach(el => {
    // Reset state for fresh animations
    el.classList.remove('in')
    revealObserver.observe(el)
  })
}

/**
 * Animated counter - counts up from 0 to target number
 * Usage: <span data-count="5000">0</span>
 */
export function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-count]')
  if (!counters.length) return

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      const el = entry.target
      if (el.dataset.counted) return
      el.dataset.counted = 'true'

      const target = parseInt(el.dataset.count, 10)
      const suffix = el.dataset.suffix || ''
      const prefix = el.dataset.prefix || ''
      const duration = 2000
      const start = performance.now()

      function step(now) {
        const progress = Math.min((now - start) / duration, 1)
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = Math.floor(eased * target)
        el.textContent = prefix + current.toLocaleString('en-IN') + suffix
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    })
  }, { threshold: 0.3 })

  counters.forEach(el => counterObserver.observe(el))
}

/**
 * Re-trigger reveal animations for elements inside a container
 * Used for tab switching (e.g., pricing tabs)
 */
export function retriggerReveals(container) {
  container.querySelectorAll('.reveal').forEach(el => {
    el.classList.remove('in')
    requestAnimationFrame(() => {
      requestAnimationFrame(() => el.classList.add('in'))
    })
  })
}
