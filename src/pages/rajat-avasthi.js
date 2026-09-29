/**
 * DeStressHub - Wellness Coordinator & Founder (Rajat Avasthi) Page
 */

import { renderNavbar, initNavbar } from '../components/navbar.js'
import { renderFooter } from '../components/footer.js'
import { sectionHeader } from '../components/section-header.js'
import { initRevealAnimations, initCounterAnimations } from '../utils/animations.js'
import { refreshCursorHovers } from '../components/cursor.js'
import { waLink } from '../utils/helpers.js'
import { updateSEO, injectBreadcrumbs } from '../utils/seo.js'

export async function rajatAvasthiPage() {
  const linkedInUrl = 'https://www.linkedin.com/in/rajat-avasthi-679805396/'
  const credUrl = 'https://laughteryoga.org/find-registered-laughter-yoga-professionals/profile/29231/'
  const waConsultMsg = "Hi Rajat! I'd like to consult with you about workplace wellness & laughter sessions for our organization."

  const html = `
    ${renderNavbar()}

    <!-- Hero Section -->
    <section class="coord-hero">
      <div class="coord-hero-bg"></div>
      <div class="coord-hero-inner">
        
        <!-- Left: Bio & Highlights -->
        <div class="coord-hero-text">
          <div class="hero-eyebrow reveal d1">
            <div class="eyebrow-line"></div>
            <span class="eyebrow-text">Wellness Coordinator & Founder</span>
          </div>

          <h1 class="reveal d2">
            Rajat Avasthi<br/>
            <em>Build Businesses. Build People.</em>
          </h1>

          <div class="coord-hero-pills reveal d2">
            <span class="coord-pill">✨ Founder, DeStressHub</span>
            <span class="coord-pill">🧘 Certified Laughter Yoga Leader</span>
            <span class="coord-pill">🎓 MBA Coventry University, UK</span>
            <span class="coord-pill">📍 Chandigarh, India</span>
          </div>

          <p class="coord-hero-lead reveal d3">
            Business leader, entrepreneur, and people-focused professional with <strong>20+ years of experience</strong> across business operations, consulting, marketing, leadership, and organizational growth in India and the UK.
          </p>

          <p class="body reveal d3" style="margin-bottom: 32px;">
            He established <strong>DeStressHub</strong> with a singular, human mission: to help people pause, reconnect, and feel better amidst the pressures of the modern corporate world.
          </p>

          <div class="coord-hero-actions reveal d4">
            <a href="${waLink(waConsultMsg)}" target="_blank" class="btn-gold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="margin-right:6px;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Book a Session
            </a>
            <a href="${linkedInUrl}" target="_blank" rel="noopener noreferrer" class="btn-outline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-right:6px;"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              LinkedIn Profile
            </a>
            <a href="#philosophy" style="font-size:.8rem;color:var(--text-muted);letter-spacing:.12em;text-transform:uppercase;text-decoration:none;margin-left:8px;">Read Story ↓</a>
          </div>
        </div>

        <!-- Right: Portrait Frame with Floating Badges -->
        <div class="coord-portrait-wrap reveal right d2">
          <div class="coord-portrait-frame">
            <img src="/collage-main.jpeg" alt="Rajat Avasthi - Wellness Coordinator & Founder, DeStressHub">
          </div>

          <!-- Top Badge -->
          <div class="coord-badge-floating coord-badge-top">
            <div class="num">20+</div>
            <div class="lbl">Years Experience</div>
          </div>

          <!-- Bottom Badge -->
          <div class="coord-badge-floating coord-badge-bottom">
            <div class="icon">🧘</div>
            <div>
              <div class="title">Certified Leader</div>
              <div class="sub">Laughter Yoga International</div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Mantra Strip -->
    <div class="coord-mantra-strip">
      <div class="coord-mantra-inner reveal up">
        <div class="coord-mantra-quote">
          “Build businesses. Build people. Build better lives.”
        </div>
        <div class="coord-mantra-author">- Rajat Avasthi</div>
        <div class="coord-mantra-context">
          “Sustainable business success is not just about numbers, targets, and growth, it is equally about the people who make that growth possible.”
        </div>
      </div>
    </div>

    <!-- Trust Stats Strip -->
    <div class="stats-strip">
      <div class="stats-grid">
        <div class="stat-item reveal up">
          <div class="stat-number"><span data-count="20" data-suffix="+">20+</span></div>
          <div class="stat-label">Years Cross-Industry Leadership</div>
        </div>
        <div class="stat-item reveal up d1">
          <div class="stat-number"><span data-count="100" data-suffix="%">100%</span></div>
          <div class="stat-label">Human-Centered Focus</div>
        </div>
        <div class="stat-item reveal up d2">
          <div class="stat-number">Certified</div>
          <div class="stat-label">Laughter Yoga Leader</div>
        </div>
        <div class="stat-item reveal up d3">
          <div class="stat-number">MBA</div>
          <div class="stat-label">Coventry University, UK</div>
        </div>
      </div>
    </div>

    <!-- Philosophy & Background Section -->
    <section class="coord-story-section" id="philosophy">
      <div class="coord-story-grid">
        
        <!-- Action Imagery Collage -->
        <div class="coord-story-media reveal left">
          <div class="coord-story-card-main">
            <img src="/behav training.jpg" alt="Rajat Avasthi facilitating corporate wellness session">
          </div>
          <div class="coord-story-card-sub">
            <img src="/coorp-session.jpg" alt="Rajat Avasthi conducting corporate laughter therapy">
          </div>
        </div>

        <!-- Narrative Content -->
        <div class="coord-story-content reveal right d2">
          ${sectionHeader({
            tag: 'The Philosophy',
            title: 'Taking care of the people<br/><em>behind the numbers.</em>',
            theme: 'dark'
          })}

          <p class="story-lead" style="margin-top: 24px;">
            Over the course of his 20+ year career, Rajat has led teams, built businesses, developed international strategic partnerships, managed operations, and collaborated with people across diverse industries in India and the UK.
          </p>

          <p class="body">
            These multi-faceted experiences reinforced his core belief: high-performing organizations cannot sustain excellence if their people are burning out. True organizational resilience begins with emotional wellbeing, psychological safety, and genuine human connection.
          </p>

          <p class="body">
            As a <strong>Certified Laughter Yoga Leader</strong>, he is particularly passionate about bringing practical, engaging, and simple wellness practices into the everyday workflow.
          </p>

          <div class="coord-story-pillars">
            <div class="coord-pillar-item">
              <div class="coord-pillar-icon">🌱</div>
              <div>
                <div class="coord-pillar-title">Not Another Task on the Calendar</div>
                <div class="coord-pillar-desc">Wellbeing shouldn't feel like an obligation. Sometimes, it is simply a shared laugh, an honest conversation, or an opportunity to pause and reset.</div>
              </div>
            </div>

            <div class="coord-pillar-item">
              <div class="coord-pillar-icon">⚡</div>
              <div>
                <div class="coord-pillar-title">Science-Backed Joy & Breath</div>
                <div class="coord-pillar-desc">Combining unconditional laughter exercises with yogic diaphragmatic breathing (Pranayama) to immediately lower cortisol and flood the system with feel-good endorphins.</div>
              </div>
            </div>

            <div class="coord-pillar-item">
              <div class="coord-pillar-icon">🤝</div>
              <div>
                <div class="coord-pillar-title">Pragmatic, Human & Engaging</div>
                <div class="coord-pillar-desc">No corporate clichés or awkward icebreakers. Every session is designed to break down barriers, dissolve workplace tension, and spark authentic camaraderie.</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Professional Interests & Expertise -->
    <section class="coord-expertise-section">
      <div class="coord-expertise-inner">
        <div class="reveal up" style="text-align:center; display:flex; flex-direction:column; align-items:center;">
          ${sectionHeader({
            tag: 'Core Focus Areas',
            title: 'Where business leadership meets<br/><em>human wellness.</em>',
            description: "Rajat's professional work operates at the intersection of enterprise growth, leadership empathy, and workplace wellbeing.",
            theme: 'light',
            align: 'center'
          })}
        </div>

        <div class="coord-expertise-grid">
          
          <div class="coord-expertise-card reveal up d1">
            <div class="coord-expertise-icon">🏢</div>
            <h3>Employee & Workplace Wellbeing</h3>
            <p>Developing holistic wellness initiatives that address corporate fatigue, reduce absenteeism, and build resilient, energized workplace cultures.</p>
          </div>

          <div class="coord-expertise-card reveal up d2">
            <div class="coord-expertise-icon">😄</div>
            <h3>Laughter Wellness</h3>
            <p>Facilitating structured laughter yoga sessions that bypass cognitive stress triggers, helping teams reconnect with spontaneous joy and vitality.</p>
          </div>

          <div class="coord-expertise-card reveal up d3">
            <div class="coord-expertise-icon">🔥</div>
            <h3>Stress Management & Burnout</h3>
            <p>Equipping employees and management with practical, on-the-spot self-regulation tools to manage daily pressure without breaking stride.</p>
          </div>

          <div class="coord-expertise-card reveal up d1">
            <div class="coord-expertise-icon">👑</div>
            <h3>Leadership & Team Building</h3>
            <p>Mentoring managers to lead with emotional intelligence, break down departmental silos, and foster psychological safety across teams.</p>
          </div>

          <div class="coord-expertise-card reveal up d2">
            <div class="coord-expertise-icon">💼</div>
            <h3>Business & Entrepreneurship</h3>
            <p>Over two decades of hands-on business operations, strategic consulting, and commercial growth as Managing Partner at Overseas Planners.</p>
          </div>

          <div class="coord-expertise-card reveal up d3">
            <div class="coord-expertise-icon">🌐</div>
            <h3>People & Community Engagement</h3>
            <p>Building high-trust partnerships, mentoring emerging talent, and cultivating vibrant organizational communities that thrive together.</p>
          </div>

        </div>
      </div>
    </section>

    <!-- Credentials & Accreditations Section -->
    <section class="coord-credentials-section">
      <div class="coord-credentials-inner">
        <div class="reveal up">
          ${sectionHeader({
            tag: 'Qualifications & Background',
            title: 'Verified credentials &<br/><em>academic excellence.</em>',
            theme: 'dark'
          })}
        </div>

        <div class="coord-credentials-grid">
          
          <!-- Laughter Yoga Certification -->
          <div class="coord-cred-card reveal up d1">
            <div>
              <div class="coord-cred-header">
                <span class="coord-cred-tag">Certification</span>
                <span class="coord-cred-year">Issued Nov 2025</span>
              </div>
              <h3>Certified Laughter Yoga Leader</h3>
              <div class="coord-cred-issuer">Laughter Yoga International</div>
              <p class="coord-cred-desc">
                Officially certified and registered practitioner qualified to design and lead corporate and community laughter wellness programs, breathwork sessions, and stress intervention circles.
              </p>
              <div class="coord-cred-skills">
                <span class="coord-cred-skill">Health & Wellness</span>
                <span class="coord-cred-skill">Laughter Yoga</span>
                <span class="coord-cred-skill">Employee Wellness</span>
                <span class="coord-cred-skill">Group Facilitation</span>
              </div>
            </div>
            <a href="${credUrl}" target="_blank" rel="noopener noreferrer" class="coord-cred-link">
              Verify Official Directory Credential ↗
            </a>
          </div>

          <!-- Basic Laughter Wellness Course -->
          <div class="coord-cred-card reveal up d2">
            <div>
              <div class="coord-cred-header">
                <span class="coord-cred-tag">Certification</span>
                <span class="coord-cred-year">Issued Nov 2025</span>
              </div>
              <h3>Basic Laughter Wellness Course</h3>
              <div class="coord-cred-issuer">Laughter Yoga International</div>
              <p class="coord-cred-desc">
                Intensive foundational training in the neurobiology of laughter, stress physiology, Pranayama yogic breathing, and group energetic alignment.
              </p>
              <div class="coord-cred-skills">
                <span class="coord-cred-skill">Stress Relief</span>
                <span class="coord-cred-skill">Breathwork (Pranayama)</span>
                <span class="coord-cred-skill">Team Engagement</span>
              </div>
            </div>
            <span class="coord-cred-link" style="color:var(--text-muted); cursor:default;">
              Verified by Laughter Yoga International
            </span>
          </div>

          <!-- Master of Business Administration -->
          <div class="coord-cred-card reveal up d1">
            <div>
              <div class="coord-cred-header">
                <span class="coord-cred-tag">Education</span>
                <span class="coord-cred-year">Feb 2004 – Jul 2005</span>
              </div>
              <h3>Master of Business Administration (MBA)</h3>
              <div class="coord-cred-issuer">Coventry University, United Kingdom</div>
              <p class="coord-cred-desc">
                Graduate degree in Business Administration and Management, focusing on international business strategy, organizational behavior, marketing dynamics, and corporate leadership.
              </p>
              <div class="coord-cred-skills">
                <span class="coord-cred-skill">Business Strategy</span>
                <span class="coord-cred-skill">Business Development</span>
                <span class="coord-cred-skill">Organizational Growth</span>
                <span class="coord-cred-skill">UK & Global Exposure</span>
              </div>
            </div>
            <span class="coord-cred-link" style="color:var(--gold-light); cursor:default;">
              Coventry, United Kingdom
            </span>
          </div>

          <!-- Entrepreneurial Leadership -->
          <div class="coord-cred-card reveal up d2">
            <div>
              <div class="coord-cred-header">
                <span class="coord-cred-tag">Leadership</span>
                <span class="coord-cred-year">20+ Years</span>
              </div>
              <h3>Founder & Managing Partner</h3>
              <div class="coord-cred-issuer">DeStressHub & Overseas Planners</div>
              <p class="coord-cred-desc">
                Extensive entrepreneurial track record managing international education consulting, scaling commercial ventures, building cross-border institutional alliances, and mentoring cross-functional teams.
              </p>
              <div class="coord-cred-skills">
                <span class="coord-cred-skill">Executive Leadership</span>
                <span class="coord-cred-skill">Strategic Alliances</span>
                <span class="coord-cred-skill">Mentorship</span>
                <span class="coord-cred-skill">Chandigarh, India</span>
              </div>
            </div>
            <a href="${linkedInUrl}" target="_blank" rel="noopener noreferrer" class="coord-cred-link">
              View Full Experience on LinkedIn ↗
            </a>
          </div>

        </div>
      </div>
    </section>

    <!-- Client Endorsements & Recommendations -->
    <section class="coord-testimonials-section">
      <div class="coord-testimonials-inner">
        <div class="reveal up" style="text-align:center; display:flex; flex-direction:column; align-items:center;">
          ${sectionHeader({
            tag: 'Client Recommendations',
            title: 'What leaders say about<br/><em>Rajat & DeStressHub.</em>',
            description: 'Direct endorsements from corporate clients, creative directors, and business executives.',
            theme: 'light',
            align: 'center'
          })}
        </div>

        <div class="coord-rec-grid">
          
          <!-- Recommendation 1 -->
          <div class="coord-rec-card reveal up d1">
            <div>
              <div class="coord-rec-stars">★★★★★</div>
              <p class="coord-rec-quote">
                “I attended a stress management and laughter wellness session by D-Stress Hub, led by its founder Mr. Rajat Awasthi, and found it highly impactful. The session was well-structured, engaging, and directly relevant to today’s workplace stress and challenges. I was particularly impressed by the unique integration of laughing yoga, a powerful and much-needed approach in today’s stressful work environment, which created an immediate sense of relaxation and positivity among participants. D-Stress Hub delivers wellness programs that go beyond engagement, they create real and lasting impact. I would strongly recommend them to organizations seeking effective and professional corporate wellness solutions.”
              </p>
            </div>
            <div class="coord-rec-author-wrap">
              <div class="coord-rec-author">Archana Sharma Chamoli</div>
              <div class="coord-rec-role">Helping Brands Find Their Narrative Edge | Creative Consultant | Published Author & Scriptwriter</div>
              <div class="coord-rec-date">February 2026 · Client Recommendation</div>
            </div>
          </div>

          <!-- Recommendation 2 -->
          <div class="coord-rec-card reveal up d2">
            <div>
              <div class="coord-rec-stars">★★★★★</div>
              <p class="coord-rec-quote">
                “Grateful to D Stress Hub for an inspiring wellness experience. Thoughtful design and purpose-driven work like this truly stand out.”
              </p>
            </div>
            <div class="coord-rec-author-wrap">
              <div class="coord-rec-author">Vinaya Acharya</div>
              <div class="coord-rec-role">Principal Architect</div>
              <div class="coord-rec-date">December 2025 · Client Recommendation</div>
            </div>
          </div>

          <!-- Recommendation 3 -->
          <div class="coord-rec-card reveal up d3">
            <div>
              <div class="coord-rec-stars">★★★★★</div>
              <p class="coord-rec-quote">
                “Loved it Rajat. The DeStressHub team visited our office and lightened the day for us! Kudos to Rajat”
              </p>
            </div>
            <div class="coord-rec-author-wrap">
              <div class="coord-rec-author">Gaurav Chaudhary</div>
              <div class="coord-rec-role">CEO at Roots Analysis</div>
              <div class="coord-rec-date">Corporate Client Partner</div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="coord-cta-section">
      <div class="coord-cta-inner reveal up">
        <div class="section-tag" style="justify-content:center;">
          <div class="line"></div>
          <span>Collaborate</span>
        </div>
        <h2>Ready to bring joy to<br/><em>your organization?</em></h2>
        <p class="coord-cta-desc">
          Invite Rajat Avasthi to facilitate an impactful laughter wellness workshop, deliver a keynote session, or consult on your company's employee wellbeing strategy.
        </p>
        <div class="coord-cta-buttons">
          <a href="${waLink(waConsultMsg)}" target="_blank" class="btn-gold">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="margin-right:6px;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Book a Session via WhatsApp
          </a>
          <a href="${linkedInUrl}" target="_blank" rel="noopener noreferrer" class="btn-outline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-right:6px;"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            Connect on LinkedIn
          </a>
          <a href="/corporate" data-link class="btn-dark">
            Corporate Solutions →
          </a>
        </div>
      </div>
    </section>

    ${renderFooter()}
  `

  const init = () => {
    updateSEO({
      title: 'Rajat Avasthi | Founder & Wellness Coordinator | DeStress Hub',
      description: 'Meet Rajat Avasthi, Founder & Wellness Coordinator at DeStressHub, Certified Laughter Yoga Leader, and MBA with 20+ years of leadership and organizational growth experience across India & the UK.',
      path: '/rajat-avasthi',
      image: 'https://www.destresshub.com/collage-main.jpeg'
    })
    injectBreadcrumbs([
      { name: 'Home', url: '/' },
      { name: 'Wellness Coordinator' }
    ])

    initNavbar()
    initRevealAnimations()
    initCounterAnimations()
    refreshCursorHovers()
  }

  return { html, init }
}
