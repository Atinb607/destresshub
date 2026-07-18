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
        <li><a href="#sessions">Sessions</a></li>
        <li><a href="#how">How It Works</a></li>
        <li><a href="#pricing">Pricing</a></li>
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
      <a href="#sessions" class="mob-link">Sessions</a>
      <a href="#how" class="mob-link">How It Works</a>
      <a href="#pricing" class="mob-link">Pricing</a>
      <a href="/corporate" data-link class="mob-link">Corporate</a>
      <a href="/careers" data-link class="mob-link">Careers</a>
      <a href="https://wa.me/9464663405" target="_blank" style="color:var(--gold)">Book Now →</a>
    </div>
  `
}

export function initNavbar() {
  const ham = document.getElementById('hamburger')
  const mobNav = document.getElementById('mobile-nav')
  const nav = document.getElementById('navbar')
  if (!ham || !mobNav) return

  // Hamburger toggle
  ham.addEventListener('click', () => {
    ham.classList.toggle('open')
    mobNav.classList.toggle('open')
    document.body.style.overflow = mobNav.classList.contains('open') ? 'hidden' : ''
  })

  // Close mobile nav on link click
  mobNav.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      ham.classList.remove('open')
      mobNav.classList.remove('open')
      document.body.style.overflow = ''
    })
  })

  // Scroll effect
  const scrollHandler = () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 60)
  }
  window.addEventListener('scroll', scrollHandler, { passive: true })
  scrollHandler() // Set initial state
}
