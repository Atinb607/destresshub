import { renderNavbar, initNavbar } from '../components/navbar.js'
import { renderFooter } from '../components/footer.js'
import { sectionHeader } from '../components/section-header.js'
import { initRevealAnimations, initCounterAnimations } from '../utils/animations.js'
import { initParallax, cleanupParallax, initGalleryDrag } from '../utils/parallax.js'
import { refreshCursorHovers } from '../components/cursor.js'
import { waLink, toast } from '../utils/helpers.js'
import { submitLead } from '../supabase.js'
import { updateSEO, injectBreadcrumbs } from '../utils/seo.js'


import tanishqLogo from './tanishq-seeklogo.svg'
import rootsLogo from './roots-analysis-logo.png'
import icueriousLogo from './icuerious-logo.jpg'
import edChdLogo from './ed-chd-logo.jpg'
import rajivGandhiLogo from './Rajiv_Gandhi_National_Institute_of_Youth_Development_Logo.png'
import iotaLogo from './iota.jpg'
import nexusSelectTrustLogo from './nexusselecttrust-logo.png'

export async function homePage() {
  const html = `
    ${renderNavbar()}
    
    <!-- Hero Section -->
    <section id="hero">
      <div class="hero-bg" id="hero-bg"></div>
      <div class="hero-image-col reveal right">
        <div class="hero-photo">
          <img src="/hero new.jpeg" alt="Laughter wellness session">
        </div>
      </div>
      <div class="hero-inner">
        <div class="hero-eyebrow reveal d1">
          <div class="eyebrow-line"></div>
          <span class="eyebrow-text">Corporate Wellness · Laughter Wellness · Emotional Wellbeing</span>
        </div>
        <h1 class="reveal d2">Rediscover<br/>the Healing<br/>Power of <em>Laughter.</em></h1>
        <p class="hero-sub reveal d3">Science-backed burnout prevention, laughter wellness & stress management programs that transform workplace culture and bring genuine joy.</p>
        <div class="hero-buttons reveal d4">
          <a href="${waLink("Hi! I'd like to book a laughter wellness session.")}" target="_blank" class="btn-gold">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="margin-right:8px;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Book a Session
          </a>
          <a href="/corporate" data-link class="btn-outline">Corporate Enquiry</a>
          <a href="#sessions" style="font-size:.8rem;color:var(--text-muted);letter-spacing:.12em;text-transform:uppercase;text-decoration:none;margin-left:12px;">Explore Programs ↓</a>
        </div>
      </div>
      <div class="hero-scroll-hint">
        <div class="scroll-line"></div>
        <span class="scroll-label">Scroll to explore</span>
      </div>
    </section>


    <!-- Trust Stats -->
    <div class="stats-strip">
      <div class="stats-grid">
        <div class="stat-item reveal up">
          <div class="stat-number"><span data-count="5000" data-suffix="+">0</span></div>
          <div class="stat-label">Participants Reached</div>
        </div>
        <div class="stat-item reveal up d1">
          <div class="stat-number"><span data-count="100" data-suffix="+">0</span></div>
          <div class="stat-label">Sessions Conducted</div>
        </div>
        <div class="stat-item reveal up d2">
          <div class="stat-number"><span data-count="50" data-suffix="+">0</span></div>
          <div class="stat-label">Organizations Served</div>
        </div>
        <div class="stat-item reveal up d3">
          <div class="stat-number">4.9/5</div>
          <div class="stat-label">Average Feedback</div>
        </div>
      </div>
    </div>

    <!-- Ticker -->
    <div class="ticker">
      <div class="ticker-track">
        <!-- Set 1 -->
        <div class="ticker-item">Laughter Yoga <div class="ticker-dot"></div></div>
        <div class="ticker-item">Stress Relief <div class="ticker-dot"></div></div>
        <div class="ticker-item">Corporate Wellness <div class="ticker-dot"></div></div>
        <div class="ticker-item">Employee Engagement <div class="ticker-dot"></div></div>
        <div class="ticker-item">Burnout Prevention <div class="ticker-dot"></div></div>
        <div class="ticker-item">Team Building <div class="ticker-dot"></div></div>
        <div class="ticker-item">Emotional Intelligence <div class="ticker-dot"></div></div>
        <div class="ticker-item">Book via WhatsApp <div class="ticker-dot"></div></div>
        <!-- Set 2 -->
        <div class="ticker-item">Laughter Yoga <div class="ticker-dot"></div></div>
        <div class="ticker-item">Stress Relief <div class="ticker-dot"></div></div>
        <div class="ticker-item">Corporate Wellness <div class="ticker-dot"></div></div>
        <div class="ticker-item">Employee Engagement <div class="ticker-dot"></div></div>
        <div class="ticker-item">Burnout Prevention <div class="ticker-dot"></div></div>
        <div class="ticker-item">Team Building <div class="ticker-dot"></div></div>
        <div class="ticker-item">Emotional Intelligence <div class="ticker-dot"></div></div>
        <div class="ticker-item">Book via WhatsApp <div class="ticker-dot"></div></div>
      </div>
    </div>

    <!-- About Section -->
    <section id="about">
      <div class="about-grid">
        <div class="about-collage reveal left">
          <div class="col-img col-a"><img src="/collage-main.jpeg" alt="Laughter yoga group"></div>
          <div class="col-img col-b"><img src="/collage-right.jpg" alt="Outdoor laughter therapy"></div>
          <div class="col-badge">Certified<br/>Practitioners</div>
        </div>
        <div class="about-text reveal right d2">
          ${sectionHeader({ tag: 'Our Philosophy', title: 'We believe joy<br/>is the <em>deepest</em><br/>form of healing.', theme: 'dark' })}
          <div class="about-divider"></div>
          <p class="body">In today's fast-paced corporate world, stress isn't just inevitable, it's epidemic. DeStressHub was founded with a singular mission: to reintroduce genuine joy and emotional resilience into the workplace and everyday life through the scientifically proven benefits of laughter therapy.</p>
          <div class="about-divider" style="margin:32px 0;"></div>
          <div class="about-features">
            <div class="feat-row">
              <div class="feat-num">01</div>
              <div>
                <div class="feat-title">Science-Backed Methods</div>
                <div class="feat-desc">Our programs combine laughter exercises with yogic breathing (Pranayama) to increase oxygen flow and trigger endorphin release.</div>
              </div>
            </div>
            <div class="feat-row">
              <div class="feat-num">02</div>
              <div>
                <div class="feat-title">No Experience Required</div>
                <div class="feat-desc">You don't need a sense of humor or to be happy. We use intentional laughter that eventually transitions into genuine, contagious joy.</div>
              </div>
            </div>
            <div class="feat-row">
              <div class="feat-num">03</div>
              <div>
                <div class="feat-title">Immediate Results</div>
                <div class="feat-desc">Participants report reduced stress, elevated mood, and improved team cohesion after just a single 45-minute session.</div>
              </div>
            </div>
          </div>
          <div style="margin-top:36px;">
            <a href="/rajat-avasthi" data-link class="btn-outline">Meet Our Wellness Coordinator →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Client Logos -->
    <section class="logo-section">
      <div class="logo-inner reveal up">
        ${sectionHeader({ tag: 'Trusted By', title: 'Leading organizations<br/><em>choose DeStressHub.</em>', theme: 'light' })}
        <div class="logo-grid">
          <div class="logo-item"><img src="${tanishqLogo}" alt="Tanishq"></div>
          <div class="logo-item"><img src="${rootsLogo}" alt="Roots Analysis"></div>
          <div class="logo-item"><img src="${icueriousLogo}" alt="ICuerious"></div>
          <div class="logo-item"><img src="${edChdLogo}" alt="Education Chandigarh"></div>
          <div class="logo-item"><img src="${rajivGandhiLogo}" alt="Rajiv Gandhi National Institute"></div>
          <div class="logo-item"><img src="${iotaLogo}" alt="Iota"></div>
          <div class="logo-item"><img src="${nexusSelectTrustLogo}" alt="Nexus Select Trust"></div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us? -->
    <section class="why-hr-section">
      <div class="why-hr-inner reveal up">
        ${sectionHeader({ tag: 'For HR Leaders', title: 'Why Choose<br/><em>Us?</em>', theme: 'light' })}
        <div class="why-hr-list">
          <div class="why-hr-item reveal up d1">
            <div class="feat-num">01</div>
            <div>
              <div class="feat-title">Certified expertise, not freelance fun.</div>
              <div class="feat-desc">Sessions are led by Certified Experts, with corporate delivery experience across sectors.</div>
            </div>
          </div>
          <div class="why-hr-item reveal up d2">
            <div class="feat-num">02</div>
            <div>
              <div class="feat-title">Trusted by known organisations.</div>
              <div class="feat-desc">Like Tata Group, Tanishq, Icuerious, Roots Analysis, iOTA, RGNIYD under the Ministry of Youth Affairs and Sports and many more.</div>
            </div>
          </div>
          <div class="why-hr-item reveal up d3">
            <div class="feat-num">03</div>
            <div>
              <div class="feat-title">Built for HR outcomes, not entertainment.</div>
              <div class="feat-desc">Programs mapped to burnout prevention, team cohesion, and emotional intelligence, not generic games.</div>
            </div>
          </div>
          <div class="why-hr-item reveal up d4">
            <div class="feat-num">04</div>
            <div>
              <div class="feat-title">Flexible delivery.</div>
              <div class="feat-desc">In office, virtual, or large scale corporate events, across Tricity and pan India.</div>
            </div>
          </div>
          <div class="why-hr-item reveal up d5">
            <div class="feat-num">05</div>
            <div>
              <div class="feat-title">Easy to slot into HR calendars.</div>
              <div class="feat-desc">Standard formats (30/60/90 minute sessions), quick scheduling, minimal internal coordination needed.</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Parallax Strip 1 -->
    <section class="parallax-strip strip-1" data-parallax>
      <div class="strip-bg"></div>
      <div class="strip-overlay"></div>
      <div class="strip-content reveal up">
        <h2 class="strip-quote">"Laughter is the shortest distance between two people."</h2>
        <div class="strip-attr">- Victor Borge</div>
      </div>
    </section>

    <!-- Corporate Wellness -->
    <section class="corp-wellness-section">
      <div class="max-w reveal up">
        ${sectionHeader({ tag: 'Corporate Programs', title: 'Comprehensive wellness<br/><em>for your organization.</em>', theme: 'dark' })}
      </div>
      <div class="corp-grid">
        <div class="corp-card reveal up d1">
          <div class="corp-icon">🧠</div>
          <h3>Stress Management</h3>
          <p>Equip teams with practical tools to manage workplace stress and build resilience.</p>
        </div>
        <div class="corp-card reveal up d2">
          <div class="corp-icon">🤝</div>
          <h3>Team Building</h3>
          <p>Foster genuine connections through shared laughter and collaborative exercises.</p>
        </div>
        <div class="corp-card reveal up d3">
          <div class="corp-icon">💡</div>
          <h3>Employee Engagement</h3>
          <p>Boost morale and create a culture where people enjoy showing up to work.</p>
        </div>
        <div class="corp-card reveal up d1">
          <div class="corp-icon">🔥</div>
          <h3>Burnout Prevention</h3>
          <p>Proactive wellness programs that address burnout before it takes hold.</p>
        </div>
        <div class="corp-card reveal up d2">
          <div class="corp-icon">👑</div>
          <h3>Leadership Wellness</h3>
          <p>Help leaders model healthy stress management and emotional awareness.</p>
        </div>
        <div class="corp-card reveal up d3">
          <div class="corp-icon">❤️</div>
          <h3>Emotional Intelligence</h3>
          <p>Develop empathy, self-awareness, and emotional regulation through experiential learning.</p>
        </div>
      </div>
      <div style="text-align:center; margin-top:48px;" class="reveal up">
        <a href="/corporate" data-link class="btn-gold">Request Corporate Proposal</a>
      </div>
    </section>

    <!-- Sessions Section -->
    <section id="sessions">
      <div class="sessions-inner">
        <div class="sessions-header reveal up">
          <div>
            ${sectionHeader({ tag: 'Our Programs', title: 'Find the right<br/><em>session for you.</em>', theme: 'light' })}
          </div>
          <div>
            <p class="body-dark">Whether you are an individual seeking peace, a community looking to bond, or an organization aiming to reduce corporate burnout, we have a tailored program designed for your specific needs.</p>
          </div>
        </div>
        <div class="sessions-grid">
          <div class="session-card reveal up d1">
            <div class="card-number">01</div>
            <div class="card-icon">👫</div>
            <div class="card-cat">Most Popular</div>
            <h3>Group Laughter Session</h3>
            <p>Join our community laughter circles. Experience the contagious energy of group laughter therapy, perfect for releasing built-up tension and making genuine connections.</p>
            <div class="card-meta">
              <span class="meta-tag">45 Min</span>
              <span class="meta-tag">Up to 20 pax</span>
            </div>
            <a href="${waLink('Hi! I am interested in joining a Group Laughter Session.')}" target="_blank" class="card-link">Book via WhatsApp →</a>
          </div>
          <div class="session-card reveal up d2">
            <div class="card-number">02</div>
            <div class="card-icon">🧘</div>
            <div class="card-cat">Deeply Personal</div>
            <h3>Private 1-on-1 Session</h3>
            <p>A highly personalized session tailored to your emotional state. We focus intensely on your specific stress triggers using targeted breathing and laughter techniques.</p>
            <div class="card-meta">
              <span class="meta-tag">45 Min</span>
              <span class="meta-tag">Just You</span>
            </div>
            <a href="${waLink('Hi! I am interested in booking a Private 1-on-1 Session.')}" target="_blank" class="card-link">Book via WhatsApp →</a>
          </div>
          <div class="session-card reveal up d3">
            <div class="card-number">03</div>
            <div class="card-icon">🏢</div>
            <div class="card-cat">Corporate Wellness</div>
            <h3>Workplace Workshop</h3>
            <p>Transform your office environment. This workshop is designed specifically for teams to break down silos, reduce corporate burnout, and improve overall productivity.</p>
            <div class="card-meta">
              <span class="meta-tag">90 Min</span>
              <span class="meta-tag">5 - 20 pax</span>
            </div>
            <a href="${waLink('Hi! I am interested in a Workplace Wellness Workshop for my team.')}" target="_blank" class="card-link">Book via WhatsApp →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section id="how">
      <div class="how-inner">
        <div class="how-header reveal up">
          ${sectionHeader({ tag: 'The Process', title: 'Your journey<br/><em>to a lighter self.</em>', theme: 'dark' })}
        </div>
        <div class="how-steps">
          <div class="how-step reveal up d1">
            <div class="step-n">01</div>
            <div class="step-icon">💬</div>
            <div class="step-title">Message Us</div>
            <div class="step-desc">Reach out via WhatsApp to discuss your needs.</div>
          </div>
          <div class="how-step reveal up d2">
            <div class="step-n">02</div>
            <div class="step-icon">📅</div>
            <div class="step-title">Confirm Slot</div>
            <div class="step-desc">We'll schedule a time that works best for you.</div>
          </div>
          <div class="how-step reveal up d3">
            <div class="step-n">03</div>
            <div class="step-icon">🚶</div>
            <div class="step-title">Arrive & Let Go</div>
            <div class="step-desc">Join the session with an open mind. No experience needed.</div>
          </div>
          <div class="how-step reveal up d4">
            <div class="step-n">04</div>
            <div class="step-icon">✨</div>
            <div class="step-title">Feel the Shift</div>
            <div class="step-desc">Leave feeling energized, relaxed, and genuinely joyful.</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Parallax Strip 2 -->
    <section class="parallax-strip strip-2" data-parallax>
      <div class="strip-bg"></div>
      <div class="strip-overlay"></div>
      <div class="strip-content reveal up">
        <h2 class="strip-quote">"We don't laugh because we're happy, we're happy because we laugh."</h2>
        <div class="strip-attr">- William James</div>
      </div>
    </section>

    <!-- Case Studies -->
    <section class="case-section" id="case-studies">
      <div class="max-w reveal up">
        ${sectionHeader({ tag: 'Success Stories', title: 'Real outcomes,<br/><em>real transformation.</em>', theme: 'light' })}
      </div>
      <div class="case-grid">
        <div class="case-card reveal up d1">
          <div class="case-card-header">
            <span class="case-org">IT Company</span>
            <span class="case-type">Corporate</span>
          </div>
          <div class="case-card-body">
            <div class="case-label">The Challenge</div>
            <p class="case-text">Employee burnout and declining team morale across departments.</p>
            <div class="case-label">The Program</div>
            <p class="case-text">4-week Workplace Wellness Workshop Series</p>
            <div class="case-label">The Results</div>
            <div class="case-results">
              <span class="case-result">95% Participation</span>
              <span class="case-result">↑ 40% Engagement</span>
              <span class="case-result">Positive Feedback</span>
            </div>
          </div>
        </div>
        <div class="case-card reveal up d2">
          <div class="case-card-header">
            <span class="case-org">Educational Institution</span>
            <span class="case-type">Education</span>
          </div>
          <div class="case-card-body">
            <div class="case-label">The Challenge</div>
            <p class="case-text">Student stress and exam anxiety affecting performance.</p>
            <div class="case-label">The Program</div>
            <p class="case-text">School Wellness & Laughter Program</p>
            <div class="case-label">The Results</div>
            <div class="case-results">
              <span class="case-result">200+ Students Reached</span>
              <span class="case-result">Reduced Anxiety</span>
              <span class="case-result">Teacher Adoption</span>
            </div>
          </div>
        </div>
        <div class="case-card reveal up d3">
          <div class="case-card-header">
            <span class="case-org">Community Org</span>
            <span class="case-type">Non-Profit</span>
          </div>
          <div class="case-card-body">
            <div class="case-label">The Challenge</div>
            <p class="case-text">Social isolation among senior citizens.</p>
            <div class="case-label">The Program</div>
            <p class="case-text">Community Laughter Circles Program</p>
            <div class="case-label">The Results</div>
            <div class="case-results">
              <span class="case-result">300+ Participants</span>
              <span class="case-result">Weekly Retention</span>
              <span class="case-result">Joy & Connection</span>
            </div>
          </div>
        </div>
      </div>
      <a href="/case-studies" data-link class="gallery-view-all reveal up" style="display:block;text-align:center;margin-top:48px;">View All Case Studies →</a>
    </section>

    <!-- Gallery -->
    <section id="gallery">
      <div class="gallery-header reveal up">
        <div style="max-width:500px;">
          ${sectionHeader({ tag: 'Gallery', title: 'Moments of<br/><em>pure joy.</em>', theme: 'dark' })}
        </div>
        <a href="${waLink("Hi! I'd like to book a session.")}" target="_blank" class="gallery-view-all">Book a Session →</a>
      </div>
      <div class="gallery-track reveal up d2" id="gallery-track">
        <div class="g-frame gf-1">
          <img src="/Morning-workshop.jpg" alt="Group Session" class="g-photo">
          <div class="g-overlay"><div class="g-label">Group Session</div></div>
        </div>
        <div class="g-frame gf-2">
          <img src="/Recording%202026-03-11%20154616.gif" alt="Morning Workshop" class="g-photo">
          <div class="g-overlay"><div class="g-label">Morning Workshop</div></div>
        </div>
        <div class="g-frame gf-3">
          <img src="/coorp-session.jpg" alt="Corporate Team" class="g-photo">
          <div class="g-overlay"><div class="g-label">Corporate Team</div></div>
        </div>
        <div class="g-frame gf-4">
          <img src="/image.png" alt="Private Session" class="g-photo">
          <div class="g-overlay"><div class="g-label">Private Session</div></div>
        </div>
        <div class="g-frame gf-5">
          <img src="/outdoor-treat.gif" alt="Outdoor Retreat" class="g-photo">
          <div class="g-overlay"><div class="g-label">Outdoor Retreat</div></div>
        </div>
        <div class="g-frame gf-6">
          <img src="/image%20copy.png" alt="Online Session" class="g-photo">
          <div class="g-overlay"><div class="g-label">Online Session</div></div>
        </div>
        <div class="g-frame gf-7">
          <img src="/behav%20training.jpg" alt="Behavioral Training" class="g-photo">
          <div class="g-overlay"><div class="g-label">Behavioral Training</div></div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing">
      <div class="pricing-inner">
        <div class="pricing-header reveal up" style="margin-bottom: 0;">
          ${sectionHeader({
            tag: 'Investment',
            title: 'CUSTOM PRICING FOR EVERY TEAM',
            description: "Every session is tailored to your team size and goals. Get in touch, we'll share a plan that fits.",
            theme: 'light',
            align: 'center'
          })}
          <div style="margin-top: 24px; display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <a href="${waLink("Hi! I'd like to book a session.")}" target="_blank" class="btn-gold">Contact Us</a>
            <span style="font-size: 0.75rem; color: var(--text-body); opacity: 0.7; font-weight: 300;">We'll get back to you personally.</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Reviews Section -->
    <section class="reviews-section">
      <div class="reviews-inner">
        <div class="reveal up">
          ${sectionHeader({ tag: 'What People Say', title: 'Reviews from<br/><em>our participants.</em>', theme: 'dark' })}
        </div>
        <div class="reviews-summary reveal up">
          <div class="reviews-big-rating">4.9</div>
          <div>
            <div class="reviews-stars">★★★★★</div>
            <div class="reviews-count">Based on participant feedback</div>
          </div>
        </div>
        <div class="reviews-grid">
          <div class="review-card reveal up d1">
            <div class="review-stars">★★★★★</div>
            <div class="review-text">"Really great session! We thought we understood laughter before, but after attending your session, we realized what true laughter actually feels like. Thank you for such an enriching experience."</div>
            <div class="review-author">
              <strong>Dr. Mandeep Kaur</strong>
              <span style="display:block; font-size:.72rem; margin-top:4px; opacity:0.7;">Professor @Panjab University</span>
            </div>
          </div>
          <div class="review-card reveal up d2">
            <div class="review-stars">★★★★★</div>
            <div class="review-text">"Thank you for being a part of our 14th Founders Day celebration and for bringing such positive energy to the session. We truly appreciate your contribution and look forward to collaborating again! :)"</div>
            <div class="review-author">
              <strong>Aditi Gupta</strong>
              <span style="display:block; font-size:.72rem; margin-top:4px; opacity:0.7;">VP of Human Resources, iCuerious Research Services Chandigarh</span>
            </div>
          </div>
          <div class="review-card reveal up d3">
            <div class="review-stars">★★★★★</div>
            <div class="review-text">"Loved it Rajat. The DeStressHub team visited our office and lightened the day for us! Kudos to Rajat"</div>
            <div class="review-author">
              <strong>Gaurav Chaudhary</strong>
              <span style="display:block; font-size:.72rem; margin-top:4px; opacity:0.7;">CEO at Roots Analysis</span>
            </div>
          </div>
          <div class="review-card reveal up d1">
            <div class="review-stars">★★★★★</div>
            <div class="review-text">"Loved the 1:1 online wellness session, Sir. It was exactly what I needed to de-stress and lighten my day!"</div>
            <div class="review-author">
              <strong>Aarav Shourie</strong>
              <span style="display:block; font-size:.72rem; margin-top:4px; opacity:0.7;">Student at Chitkara University</span>
            </div>
          </div>
          <div class="review-card reveal up d2">
            <div class="review-stars">★★★★★</div>
            <div class="review-text">"It was a really fun friday 😂"</div>
            <div class="review-author">
              <strong>Nandini</strong>
              <span style="display:block; font-size:.72rem; margin-top:4px; opacity:0.7;">HR Manager</span>
            </div>
          </div>
          <div class="review-card reveal up d3">
            <div class="review-stars">★★★★★</div>
            <div class="review-text">"It was truly enriching and wonderful session Grateful for the experience"</div>
            <div class="review-author">
              <strong>Mir Gowhar</strong>
              <span style="display:block; font-size:.72rem; margin-top:4px; opacity:0.7;">Professor @University of Kashmir</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- Lead Generation Form (Stress Audit) -->
    <section class="lead-section" id="stress-audit">
      <div class="lead-inner">
        <div class="reveal left">
          ${sectionHeader({ tag: 'Free Assessment', title: 'Get your free<br/><em>Wellness Audit.</em>', theme: 'light' })}
          <p class="body-dark" style="margin-top:24px; margin-bottom:24px;">Discover the hidden stress triggers in your organization. Our free audit helps you understand your team's emotional wellbeing and provides actionable insights.</p>
          <ul style="list-style:none; padding:0;">
            <li style="margin-bottom:12px; font-size:.9rem; color:var(--text-body);"><span style="color:var(--gold); margin-right:8px;">✓</span> Identify burnout risks</li>
            <li style="margin-bottom:12px; font-size:.9rem; color:var(--text-body);"><span style="color:var(--gold); margin-right:8px;">✓</span> Measure team morale</li>
            <li style="margin-bottom:12px; font-size:.9rem; color:var(--text-body);"><span style="color:var(--gold); margin-right:8px;">✓</span> Get customized recommendations</li>
          </ul>
        </div>
        <div class="lead-form reveal right">
          <div class="lead-progress">
            <div class="step active" id="lead-step-1-ind"></div>
            <div class="step" id="lead-step-2-ind"></div>
            <div class="step" id="lead-step-3-ind"></div>
            <div class="step" id="lead-step-4-ind"></div>
          </div>
          
          <form id="lead-form-el">
            <!-- Step 1 -->
            <div id="lead-step-1">
              <div class="form-group">
                <label>Your Name</label>
                <input type="text" id="lead-name" required placeholder="John Doe">
              </div>
              <div class="form-group">
                <label>Organization</label>
                <input type="text" id="lead-org" required placeholder="Acme Corp">
              </div>
            </div>

            <!-- Step 2 -->
            <div id="lead-step-2" style="display:none;">
              <div class="form-group">
                <label>Team Size</label>
                <select id="lead-size">
                  <option value="1-10">1-10 Employees</option>
                  <option value="11-50">11-50 Employees</option>
                  <option value="51-200">51-200 Employees</option>
                  <option value="200+">200+ Employees</option>
                </select>
              </div>
              <div class="form-group">
                <label>Industry</label>
                <select id="lead-industry">
                  <option value="IT">IT & Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Non-Profit">Non-Profit / NGO</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <!-- Step 3 -->
            <div id="lead-step-3" style="display:none;">
              <div class="form-group">
                <label>Key Challenges (Select all that apply)</label>
                <div class="checkbox-group">
                  <label class="checkbox-label"><input type="checkbox" value="Burnout" class="lead-challenge"> Burnout</label>
                  <label class="checkbox-label"><input type="checkbox" value="Low Morale" class="lead-challenge"> Low Morale</label>
                  <label class="checkbox-label"><input type="checkbox" value="High Turnover" class="lead-challenge"> High Turnover</label>
                  <label class="checkbox-label"><input type="checkbox" value="Stress & Anxiety" class="lead-challenge"> Stress & Anxiety</label>
                  <label class="checkbox-label"><input type="checkbox" value="Remote Disconnect" class="lead-challenge"> Remote Disconnect</label>
                </div>
              </div>
            </div>

            <!-- Step 4 -->
            <div id="lead-step-4" style="display:none;">
              <div class="form-group">
                <label>Email Address</label>
                <input type="email" id="lead-email" required placeholder="john@acmecorp.com">
              </div>
              <div class="form-group">
                <label>Phone Number (WhatsApp)</label>
                <input type="tel" id="lead-phone" required placeholder="+91 98765 43210">
              </div>
            </div>

            <div style="display:flex; gap:16px; margin-top:32px;">
              <button type="button" class="btn-outline" id="lead-back-btn" style="display:none; color:var(--text-dark); border-color:var(--cream-dark);">Back</button>
              <button type="button" class="btn-gold" id="lead-next-btn" style="flex:1;">Next Step →</button>
              <button type="submit" class="btn-gold" id="lead-submit-btn" style="display:none; flex:1;">Get My Free Assessment</button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section id="cta">
      <div class="cta-inner">
        <h2 class="reveal left">Ready to laugh your<br/><em>stress away?</em></h2>
        <div class="cta-buttons reveal right d2">
          <a href="${waLink("Hi! I'd like to book a session.")}" target="_blank" class="btn-dark">Book a Session</a>
          <a href="${waLink('Hi! I have a question about your programs.')}" target="_blank" class="btn-wa">Chat on WhatsApp</a>
        </div>
      </div>
    </section>

    ${renderFooter()}
  `

  const init = () => {
    updateSEO({
      title: 'DeStress Hub | Corporate Wellness, Employee Wellbeing & Laughter Wellness',
      description: 'DeStress Hub helps organizations improve employee wellbeing through stress management workshops, laughter wellness sessions, emotional intelligence training, employee engagement programs and corporate wellness initiatives.',
      path: '/'
    })
    injectBreadcrumbs([{ name: 'Home' }])

    initNavbar()
    initRevealAnimations()
    initCounterAnimations()
    initParallax()
    initGalleryDrag()
    refreshCursorHovers()



    // Lead Form Multi-step Logic
    let currentStep = 1
    const totalSteps = 4
    const nextBtn = document.getElementById('lead-next-btn')
    const backBtn = document.getElementById('lead-back-btn')
    const submitBtn = document.getElementById('lead-submit-btn')
    const formEl = document.getElementById('lead-form-el')

    const updateFormUI = () => {
      for(let i=1; i<=totalSteps; i++) {
        document.getElementById('lead-step-'+i).style.display = (i === currentStep) ? 'block' : 'none'
        const ind = document.getElementById('lead-step-'+i+'-ind')
        if(i <= currentStep) ind.classList.add('active')
        else ind.classList.remove('active')
      }
      backBtn.style.display = currentStep > 1 ? 'block' : 'none'
      if(currentStep === totalSteps) {
        nextBtn.style.display = 'none'
        submitBtn.style.display = 'block'
      } else {
        nextBtn.style.display = 'block'
        submitBtn.style.display = 'none'
      }
    }

    nextBtn.addEventListener('click', () => {
      // Basic validation before next
      if(currentStep === 1) {
        if(!document.getElementById('lead-name').value || !document.getElementById('lead-org').value) {
          toast('Please fill in name and organization.', 'error'); return;
        }
      }
      if(currentStep < totalSteps) { currentStep++; updateFormUI(); }
    })

    backBtn.addEventListener('click', () => {
      if(currentStep > 1) { currentStep--; updateFormUI(); }
    })

    formEl.addEventListener('submit', async (e) => {
      e.preventDefault()
      
      const name = document.getElementById('lead-name').value
      const org = document.getElementById('lead-org').value
      const size = document.getElementById('lead-size').value
      const industry = document.getElementById('lead-industry').value
      const email = document.getElementById('lead-email').value
      const phone = document.getElementById('lead-phone').value
      
      const challenges = Array.from(document.querySelectorAll('.lead-challenge:checked')).map(cb => cb.value)

      // Submit to Supabase
      const res = await submitLead({ name, organization: org, team_size: size, industry, email, phone, challenges })
      
      if(res) {
        toast('Assessment request submitted! Redirecting to WhatsApp...', 'success')
        
        // Build WhatsApp message
        const msg = `Hi DeStressHub! I just submitted a Free Stress Audit request.
*Name:* ${name}
*Organization:* ${org}
*Team Size:* ${size}
*Challenges:* ${challenges.join(', ') || 'None specified'}`

        setTimeout(() => {
          window.open(waLink(msg), '_blank')
          formEl.reset()
          currentStep = 1
          updateFormUI()
        }, 1500)
      } else {
        toast('Error submitting form. Please try again.', 'error')
      }
    })
  }

  const cleanup = () => {
    cleanupParallax()
  }

  return { html, init, cleanup }
}
