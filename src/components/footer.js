/**
 * Shared Footer component
 */

export function renderFooter() {
  return `
    <footer>
      <div class="footer-inner">
        <div>
          <img src="/logo new.png" alt="DeStressHub" class="footer-logo-img">
          <p class="footer-tagline">Healing through laughter, one joyful session at a time.</p>
          <div class="footer-socials">
            <a href="https://www.linkedin.com/company/destresshub" target="_blank" class="social-btn" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
            <a href="https://www.youtube.com/@D-StressHub" target="_blank" class="social-btn" aria-label="YouTube"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.555A3.002 3.002 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
            <a href="https://www.instagram.com/dstresshub/" target="_blank" class="social-btn" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Navigate</h4>
          <a href="#about">About Us</a>
          <a href="/rajat-avasthi" data-link>About Founder</a>
          <a href="#sessions">Sessions</a>
          <a href="#how">How It Works</a>
          <a href="#gallery">Gallery</a>
          <a href="#pricing">Pricing</a>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <a href="/corporate" data-link>Corporate Wellness</a>
          <a href="/careers" data-link>Careers</a>
          <a href="/case-studies" data-link>Case Studies</a>
          <a href="/resources" data-link>Resources</a>
          <a href="https://wa.me/9464663405" target="_blank">Enquire</a>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <a href="https://wa.me/9464663405" target="_blank">WhatsApp Us</a>
          <a href="tel:+919417765533">+91 9417765533</a>
          <p>Available Mon–Sat</p>
          <p>9 AM – 8 PM IST</p>
          <p style="margin-top:8px">📍 SCO 75, Second Floor,<br/>Sector 40 C, Chandigarh</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© ${new Date().getFullYear()} DeStressHub. All rights reserved.</p>
        <p>All sessions conducted by certified laughter yoga practitioners.</p>
      </div>
    </footer>
  `
}
