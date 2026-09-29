/**
 * DeStressHub - Main Application Entry
 * Imports styles, registers routes, and initializes the SPA
 */

/* ---- Styles ---- */
import './styles/base.css'
import './styles/components.css'
import './styles/navbar.css'
import './styles/home.css'
import './styles/careers.css'
import './styles/corporate.css'
import './styles/coordinator.css'
import './styles/admin.css'
import './styles/gallery.css'
import './styles/digital-card.css'
import './styles/responsive.css'

/* ---- Router ---- */
import { route, initRouter } from './router.js'

/* ---- Cursor ---- */
import { initCursor } from './components/cursor.js'

/* ---- Floating Elements ---- */
import { renderWAButton, initWAButton } from './components/wa-button.js'
import { renderMobileCTA } from './components/mobile-cta.js'
import { renderDigitalCard, initDigitalCard } from './components/digital-card.js'

/* ---- SEO & Structured Data ---- */
import { injectStructuredData } from './utils/seo.js'

/* ---- Page Modules ---- */
import { homePage } from './pages/home.js'
import { careersPage } from './pages/careers.js'
import { jobDetailPage } from './pages/job-detail.js'
import { corporatePage } from './pages/corporate.js'
import { caseStudiesPage } from './pages/case-studies.js'
import { resourcesPage } from './pages/resources.js'
import { adminLoginPage } from './pages/admin/login.js'
import { adminDashboardPage } from './pages/admin/dashboard.js'
import { adminJobFormPage } from './pages/admin/job-form.js'
import { notFoundPage } from './pages/not-found.js'
import { galleryPage } from './pages/gallery.js'
import { rajatAvasthiPage } from './pages/rajat-avasthi.js'
import { inject } from '@vercel/analytics'

/* ============================================================
   REGISTER ROUTES
   ============================================================ */

route('/', async () => homePage())
route('/corporate', async () => corporatePage())
route('/rajat-avasthi', async () => rajatAvasthiPage())
route('/about-founder', async () => rajatAvasthiPage())
route('/wellness-coordinator', async () => rajatAvasthiPage())
route('/careers', async () => careersPage())
route('/careers/job/:slug', async (params) => jobDetailPage(params))
route('/case-studies', async () => caseStudiesPage())
route('/gallery', async () => galleryPage())
route('/resources', async () => resourcesPage())
route('/admin', async () => adminLoginPage())
route('/admin/jobs', async () => adminDashboardPage())
route('/admin/jobs/new', async () => adminJobFormPage({}))
route('/admin/jobs/edit/:id', async (params) => adminJobFormPage(params))
route('/404', async () => notFoundPage())

/* ============================================================
   INITIALIZE APP
   ============================================================ */

// Add persistent floating elements
document.addEventListener('DOMContentLoaded', () => {
  // WhatsApp floating button
  const waContainer = document.createElement('div')
  waContainer.innerHTML = renderWAButton()
  document.body.appendChild(waContainer.firstElementChild)
  initWAButton()

  // Mobile CTA bar
  const mctaContainer = document.createElement('div')
  mctaContainer.innerHTML = renderMobileCTA()
  document.body.appendChild(mctaContainer.firstElementChild)

  // Digital Card component (Floating Action Button & Modal)
  const dcFragment = document.createRange().createContextualFragment(renderDigitalCard())
  document.body.appendChild(dcFragment)
  initDigitalCard()

  // Custom cursor
  initCursor()

  // Inject Organization + WebSite structured data
  injectStructuredData()

  // Start router
  initRouter()

  // Initialize Vercel Analytics
  inject()
})

