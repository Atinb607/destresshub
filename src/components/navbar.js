/**
 * Shared Navbar component
 * Includes desktop nav, mobile hamburger, and mobile nav overlay
 */

export function renderNavbar() {
  return `
    <nav id="navbar">
      <a href="/" data-link class="nav-logo"><img src="/logo new.png" alt="DeStressHub" class="brand-logo-img"></a>
      <ul class="nav-links">
        <li class="nav-dropdown">
          <a href="/" data-link class="dropdown-trigger" id="nav-home-trigger" aria-haspopup="true" aria-expanded="false">
            <span>Home</span>
            <svg class="dropdown-chevron" width="9" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <ul class="dropdown-menu" aria-label="Home Submenu">
            <li><a href="#about" class="dropdown-item">About</a></li>
            <li><a href="#sessions" class="dropdown-item">Sessions</a></li>
            <li><a href="#how" class="dropdown-item">How It Works</a></li>
            <li><a href="#pricing" class="dropdown-item">Pricing</a></li>
          </ul>
        </li>
        <li><a href="/rajat-avasthi" data-link>About Founder</a></li>
        <li><a href="/gallery" data-link>Gallery</a></li>
        <li><a href="/corporate" data-link>Corporate</a></li>
        <li><a href="/careers" data-link>Careers</a></li>
        <li><a href="/stress-quiz" data-link class="nav-quiz-btn"><span class="nav-quiz-dot"></span>Stress Quiz</a></li>
        <li><a href="https://wa.me/9464663405?text=Hi!%20I%27d%20like%20to%20book%20a%20session." target="_blank" class="nav-cta">Book Now</a></li>
      </ul>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </nav>

    <div class="mobile-nav" id="mobile-nav">
      <div class="mob-dropdown" id="mob-dropdown">
        <div class="mob-dropdown-header">
          <a href="/" data-link class="mob-link mob-home-link">Home</a>
          <button type="button" class="mob-dropdown-toggle" id="mob-dropdown-toggle" aria-label="Toggle Home Submenu" aria-expanded="false">
            <svg class="mob-chevron" width="12" height="8" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="mob-submenu" id="mob-submenu">
          <a href="#about" class="mob-link mob-sublink">About</a>
          <a href="#sessions" class="mob-link mob-sublink">Sessions</a>
          <a href="#how" class="mob-link mob-sublink">How It Works</a>
          <a href="#pricing" class="mob-link mob-sublink">Pricing</a>
        </div>
      </div>
      <a href="/rajat-avasthi" data-link class="mob-link">About Founder</a>
      <a href="/gallery" data-link class="mob-link">Gallery</a>
      <a href="/corporate" data-link class="mob-link">Corporate</a>
      <a href="/careers" data-link class="mob-link">Careers</a>
      <a href="/stress-quiz" data-link class="mob-link" style="color: var(--gold);">Stress Quiz ✨</a>
      <a href="https://wa.me/9464663405" target="_blank" class="mob-link mob-cta">Book Now →</a>
    </div>
  `
}

export function initNavbar() {
  const ham = document.getElementById('hamburger')
  const mobNav = document.getElementById('mobile-nav')
  const nav = document.getElementById('navbar')
  const mobDropdown = document.getElementById('mob-dropdown')
  const mobDropdownToggle = document.getElementById('mob-dropdown-toggle')
  if (!ham || !mobNav) return

  const closeMenu = () => {
    ham.classList.remove('open')
    mobNav.classList.remove('open')
    document.body.style.overflow = ''
    if (mobDropdown) {
      mobDropdown.classList.remove('open')
      mobDropdownToggle?.setAttribute('aria-expanded', 'false')
    }
  }

  // Hamburger toggle
  ham.addEventListener('click', () => {
    const willOpen = !mobNav.classList.contains('open')
    ham.classList.toggle('open', willOpen)
    mobNav.classList.toggle('open', willOpen)
    document.body.style.overflow = willOpen ? 'hidden' : ''
    if (!willOpen && mobDropdown) {
      mobDropdown.classList.remove('open')
      mobDropdownToggle?.setAttribute('aria-expanded', 'false')
    }
  })

  // Mobile submenu accordion toggle
  if (mobDropdownToggle && mobDropdown) {
    mobDropdownToggle.addEventListener('click', (e) => {
      e.stopPropagation()
      const isOpen = mobDropdown.classList.toggle('open')
      mobDropdownToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
    })
  }

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

  // Desktop dropdown close on click / outside click
  const navDropdown = nav?.querySelector('.nav-dropdown')
  if (navDropdown) {
    document.addEventListener('click', (e) => {
      if (!navDropdown.contains(e.target)) {
        navDropdown.classList.remove('open')
        navDropdown.querySelector('.dropdown-trigger')?.setAttribute('aria-expanded', 'false')
      }
    })

    navDropdown.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        navDropdown.classList.remove('open')
        navDropdown.querySelector('.dropdown-trigger')?.setAttribute('aria-expanded', 'false')
        document.activeElement?.blur()
      })
    })
  }

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
        const activeNavDropdown = document.querySelector('.nav-dropdown.open')
        if (activeNavDropdown) {
          activeNavDropdown.classList.remove('open')
          activeNavDropdown.querySelector('.dropdown-trigger')?.setAttribute('aria-expanded', 'false')
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
