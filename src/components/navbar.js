/**
 * Shared Navbar component
 * Includes desktop nav, mobile hamburger, and mobile nav overlay
 */

export function renderNavbar() {
  return `
    <nav id="navbar">
      <a href="/" data-link class="nav-logo"><img src="/logo new.png" alt="DeStressHub" class="brand-logo-img"></a>
      <ul class="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="/rajat-avasthi" data-link>Wellness Coordinator</a></li>
        <li><a href="#sessions">Sessions</a></li>
        <li><a href="#how">How It Works</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="/gallery" data-link>Gallery</a></li>
        <li><a href="/corporate" data-link>Corporate</a></li>
        <li><a href="/careers" data-link>Careers</a></li>
        <li><a href="https://wa.me/9464663405?text=Hi!%20I%27d%20like%20to%20book%20a%20session." target="_blank" class="nav-cta">Book Now</a></li>
      </ul>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </nav>

    <div class="mobile-nav" id="mobile-nav">
      <a href="#about" class="mob-link">About</a>
      <a href="/rajat-avasthi" data-link class="mob-link">Wellness Coordinator</a>
      <a href="#sessions" class="mob-link">Sessions</a>
      <a href="#how" class="mob-link">How It Works</a>
      <a href="#pricing" class="mob-link">Pricing</a>
      <a href="/gallery" data-link class="mob-link">Gallery</a>
      <a href="/corporate" data-link class="mob-link">Corporate</a>
      <a href="/careers" data-link class="mob-link">Careers</a>
      <a href="https://wa.me/9464663405" target="_blank" class="mob-link mob-cta">Book Now →</a>
    </div>
  `
}

export function initNavbar() {
  const ham = document.getElementById('hamburger')
  const mobNav = document.getElementById('mobile-nav')
  const nav = document.getElementById('navbar')
  if (!ham || !mobNav) return

  const closeMenu = () => {
    ham.classList.remove('open')
    mobNav.classList.remove('open')
    document.body.style.overflow = ''
  }

  // Hamburger toggle
  ham.addEventListener('click', () => {
    const willOpen = !mobNav.classList.contains('open')
    ham.classList.toggle('open', willOpen)
    mobNav.classList.toggle('open', willOpen)
    document.body.style.overflow = willOpen ? 'hidden' : ''
  })

  // Close mobile nav on link click
  mobNav.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu()
    })
  })

  // Close when clicking directly on the overlay backdrop
  mobNav.addEventListener('click', (e) => {
    if (e.target === mobNav) {
      closeMenu()
    }
  })

  // Close on Escape key (global handler once)
  if (!window._navEscBound) {
    window._navEscBound = true
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const mNav = document.getElementById('mobile-nav')
        const h = document.getElementById('hamburger')
        if (mNav && mNav.classList.contains('open')) {
          h?.classList.remove('open')
          mNav.classList.remove('open')
          document.body.style.overflow = ''
        }
      }
    })
  }

  // Close when resized to desktop (global handler once)
  if (!window._navResizeBound) {
    window._navResizeBound = true
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1200) {
        const mNav = document.getElementById('mobile-nav')
        const h = document.getElementById('hamburger')
        if (mNav && mNav.classList.contains('open')) {
          h?.classList.remove('open')
          mNav.classList.remove('open')
          document.body.style.overflow = ''
        }
      }
    })
  }

  // Scroll effect
  const scrollHandler = () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 60)
  }
  window.addEventListener('scroll', scrollHandler, { passive: true })
  scrollHandler() // Set initial state
}
