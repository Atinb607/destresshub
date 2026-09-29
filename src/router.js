/**
 * DeStressHub - Client-side SPA Router
 * Uses History API for clean URLs with popstate handling
 */

import { trackPageView } from './utils/seo.js'

let routes = []
let currentCleanup = null

/**
 * Register a route
 * @param {string} path - Route pattern (supports :param for dynamic segments)
 * @param {Function} handler - Async function returning { html, init?, cleanup? }
 */
export function route(path, handler) {
  routes.push({
    path,
    pattern: pathToRegex(path),
    handler
  })
}

/**
 * Convert route path to regex pattern
 * /careers/job/:slug → /^\/careers\/job\/([^/]+)$/
 */
function pathToRegex(path) {
  const pattern = path
    .replace(/\//g, '\\/')
    .replace(/:(\w+)/g, '([^/]+)')
  return new RegExp(`^${pattern}$`)
}

/**
 * Extract params from URL based on route pattern
 */
function extractParams(path, routePath) {
  const paramNames = [...routePath.matchAll(/:(\w+)/g)].map(m => m[1])
  const match = path.match(pathToRegex(routePath))
  if (!match) return {}
  const params = {}
  paramNames.forEach((name, i) => {
    params[name] = decodeURIComponent(match[i + 1])
  })
  return params
}

/**
 * Find matching route for a given path
 */
function matchRoute(path) {
  // Remove trailing slash (except for root)
  const cleanPath = path === '/' ? '/' : path.replace(/\/$/, '')
  
  for (const r of routes) {
    if (r.pattern.test(cleanPath)) {
      return {
        route: r,
        params: extractParams(cleanPath, r.path)
      }
    }
  }
  return null
}

/**
 * Navigate to a new route
 */
export async function navigate(path, pushState = true) {
  if (pushState) {
    window.history.pushState({}, '', path)
  }
  await render(path)
}

/**
 * Render the current route
 */
async function render(path) {
  const app = document.getElementById('app')
  if (!app) return

  // Cleanup previous page
  if (currentCleanup) {
    currentCleanup()
    currentCleanup = null
  }

  const match = matchRoute(path)

  if (!match) {
    // Try 404 route
    const notFound = matchRoute('/404')
    if (notFound) {
      const result = await notFound.route.handler({})
      app.innerHTML = result.html
      if (result.init) result.init()
      if (result.cleanup) currentCleanup = result.cleanup
    } else {
      app.innerHTML = '<div style="padding:200px 72px;text-align:center;"><h1 style="font-family:Cormorant Garamond,serif;font-size:4rem;color:var(--gold);">404</h1><p style="color:var(--text-muted);margin-top:16px;">Page not found</p></div>'
    }
    return
  }

  // Show a subtle loading state for async pages
  app.style.opacity = '0'
  
  try {
    const result = await match.route.handler(match.params)
    app.innerHTML = result.html
    
    // Fade in
    requestAnimationFrame(() => {
      app.style.transition = 'opacity .3s ease'
      app.style.opacity = '1'
    })

    // Scroll to top or to hash
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash)
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100)
      }
    } else {
      window.scrollTo(0, 0)
    }

    // Initialize page interactivity
    if (result.init) result.init()
    if (result.cleanup) currentCleanup = result.cleanup

    // Track page view in Google Analytics 4
    trackPageView(path, document.title)
  } catch (err) {
    console.error('Router error:', err)
    app.innerHTML = '<div style="padding:200px 72px;text-align:center;"><h1 style="font-family:Cormorant Garamond,serif;font-size:2rem;color:var(--gold);">Something went wrong</h1></div>'
    app.style.opacity = '1'
  }
}

/**
 * Initialize the router
 */
export function initRouter() {
  // Handle browser back/forward
  window.addEventListener('popstate', () => {
    render(window.location.pathname)
  })

  // Intercept link clicks for SPA navigation
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-link]')
    if (!link) return

    e.preventDefault()
    const href = link.getAttribute('href')
    if (href && href !== window.location.pathname) {
      navigate(href)
    }
  })

  // Handle hash links on the same page
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]')
    if (!link) return

    const hash = link.getAttribute('href')
    if (hash === '#') return

    // If the target element exists in the current DOM, smooth scroll to it directly
    try {
      const target = document.querySelector(hash)
      if (target) {
        e.preventDefault()
        target.scrollIntoView({ behavior: 'smooth' })
        return
      }
    } catch (err) {
      // Catch syntax errors from invalid selectors
    }

    // If target is not on current page, navigate to home then scroll
    e.preventDefault()
    navigate('/')
    setTimeout(() => {
      try {
        const target = document.querySelector(hash)
        if (target) target.scrollIntoView({ behavior: 'smooth' })
      } catch (err) {}
    }, 400)
  })

  // Initial render
  render(window.location.pathname)
}
