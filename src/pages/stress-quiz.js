/**
 * Destresshub - Stress Level Quiz Page
 * 20-question interactive assessment with animated gauge results, category breakdowns,
 * personalised recommendations, social sharing, and laughter wellness CTAs.
 */

import { renderNavbar, initNavbar } from '../components/navbar.js'
import { renderFooter } from '../components/footer.js'
import { updateSEO } from '../utils/seo.js'
import { waLink, toast } from '../utils/helpers.js'
import {
  QUIZ_QUESTIONS,
  SCALE_OPTIONS,
  CATEGORIES,
  DISCLAIMER_TEXT
} from '../data/stress-quiz.js'
import { resetCursor } from '../components/cursor.js'
import { toBlob } from 'html-to-image'
import {
  calculateTotalScore,
  getStressLevel,
  calculateCategoryBreakdown,
  getHighestStressCategory,
  getPersonalizedTips,
  formatShareText
} from '../utils/stress-scoring.js'

// Feature Flag: Optional Lead Capture (Default: false)
const ENABLE_LEAD_CAPTURE = false

export async function stressQuizPage() {
  const html = `
    ${renderNavbar()}

    <main class="quiz-page" id="quiz-page-root">
      <div class="quiz-container" id="quiz-container">
        <!-- Dynamic Quiz Card Injected Here -->
        <div class="quiz-card" id="quiz-card">
          <!-- Intro rendered initially -->
        </div>
      </div>
    </main>

    ${renderFooter()}
  `

  return {
    html,
    init: () => {
      initNavbar()
      initQuiz()
    },
    cleanup: () => {
      cleanupQuiz()
    }
  }
}

// Global state controller for the quiz session
let quizState = {
  step: 'intro', // 'intro' | 'runner' | 'lead' | 'result'
  currentIndex: 0,
  answers: {},
  isTransitioning: false
}

let keydownHandler = null

function initQuiz() {
  // Update SEO Metadata for /stress-quiz
  updateSEO({
    title: 'Stress Level Quiz · 3-Minute Assessment | Destresshub',
    description: 'Take Destresshub\'s free 3-minute, 20-question Stress Level Quiz to assess your physical, emotional, mental, behavioral, and work-life wellbeing.',
    path: '/stress-quiz',
    type: 'website'
  })

  // Reset state
  quizState = {
    step: 'intro',
    currentIndex: 0,
    answers: {},
    isTransitioning: false
  }

  // Keyboard navigation
  keydownHandler = (e) => {
    if (quizState.step !== 'runner' || quizState.isTransitioning) return

    // 1-5 keys for option selection
    if (['1', '2', '3', '4', '5'].includes(e.key)) {
      const val = parseInt(e.key, 10)
      selectOption(val)
    }

    // Backspace or ArrowLeft for back
    if (e.key === 'Backspace' || e.key === 'ArrowLeft') {
      if (quizState.currentIndex > 0) {
        goToPrevQuestion()
      }
    }
  }
  window.addEventListener('keydown', keydownHandler)

  // Render initial view
  renderCurrentStep()
}

function cleanupQuiz() {
  if (keydownHandler) {
    window.removeEventListener('keydown', keydownHandler)
    keydownHandler = null
  }
}

function renderCurrentStep() {
  resetCursor()
  const card = document.getElementById('quiz-card')
  if (!card) return

  if (quizState.step === 'intro') {
    card.innerHTML = renderIntroHTML()
    bindIntroEvents()
  } else if (quizState.step === 'runner') {
    card.innerHTML = renderRunnerHTML()
    bindRunnerEvents()
  } else if (quizState.step === 'lead') {
    card.innerHTML = renderLeadHTML()
    bindLeadEvents()
  } else if (quizState.step === 'result') {
    card.innerHTML = renderResultHTML()
    bindResultEvents()
    animateResults()
  }

  // Smooth scroll quiz card into view when navigating steps
  if (quizState.step !== 'intro') {
    const root = document.getElementById('quiz-page-root')
    if (root && window.scrollY > 100) {
      root.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

/* ------------------------------------------------------------
   1. INTRO STEP
   ------------------------------------------------------------ */
function renderIntroHTML() {
  return `
    <div class="quiz-intro">
      <div class="quiz-eyebrow">
        <span>⚡ Science-Backed Wellness Assessment</span>
      </div>

      <h1 class="quiz-title">How stressed are you, <em>really?</em></h1>
      <p class="quiz-subtext">Take this 3-minute quiz and find out. Get a clear breakdown of your stress levels across physical, mental, emotional, behavioral, and work-life wellbeing.</p>

      <div class="quiz-badges">
        <div class="quiz-badge-item">
          <span class="icon">✓</span>
          <span>20 Quick Questions</span>
        </div>
        <div class="quiz-badge-item">
          <span class="icon">⏱</span>
          <span>Takes ~3 Minutes</span>
        </div>
        <div class="quiz-badge-item">
          <span class="icon">🔒</span>
          <span>100% Private & Instant</span>
        </div>
      </div>

      <div class="quiz-intro-actions">
        <button type="button" class="quiz-start-btn" id="start-quiz-btn">
          <span>Start the Quiz</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <p class="quiz-disclaimer">${DISCLAIMER_TEXT}</p>
    </div>
  `
}

function bindIntroEvents() {
  const startBtn = document.getElementById('start-quiz-btn')
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      quizState.step = 'runner'
      quizState.currentIndex = 0
      renderCurrentStep()
    })
  }
}

/* ------------------------------------------------------------
   2. QUIZ RUNNER (QUESTIONS)
   ------------------------------------------------------------ */
function renderRunnerHTML() {
  const q = QUIZ_QUESTIONS[quizState.currentIndex]
  const cat = CATEGORIES[q.category]
  const progressPercent = Math.round(((quizState.currentIndex + 1) / QUIZ_QUESTIONS.length) * 100)
  const currentAnswer = quizState.answers[q.id]

  return `
    <div class="quiz-runner">
      <!-- Progress & Meta -->
      <div class="quiz-header">
        <div class="quiz-progress-track">
          <div class="quiz-progress-bar" style="width: ${progressPercent}%;"></div>
        </div>
        <div class="quiz-meta-row">
          <span>Question ${quizState.currentIndex + 1} of ${QUIZ_QUESTIONS.length}</span>
          <span class="quiz-cat-pill">${cat.icon} ${cat.name}</span>
        </div>
      </div>

      <p class="quiz-instruction">Think about the last 30 days. How often have you experienced each of the following?</p>

      <!-- Question Text -->
      <div class="quiz-question-box">
        <h2 class="quiz-question-text">${q.text}</h2>
      </div>

      <!-- Options -->
      <div class="quiz-options-grid" role="radiogroup" aria-label="Question ${quizState.currentIndex + 1} options">
        ${SCALE_OPTIONS.map(opt => {
          const isSelected = currentAnswer === opt.value
          return `
            <button
              type="button"
              role="radio"
              aria-checked="${isSelected ? 'true' : 'false'}"
              class="quiz-option-btn ${isSelected ? 'selected' : ''}"
              data-value="${opt.value}"
            >
              <span>${opt.label}</span>
              <span class="opt-val">Key ${opt.value}</span>
            </button>
          `
        }).join('')}
      </div>

      <!-- Navigation & Hints -->
      <div class="quiz-runner-footer">
        <button
          type="button"
          class="quiz-back-btn"
          id="quiz-back-btn"
          ${quizState.currentIndex === 0 ? 'disabled' : ''}
        >
          ← Back
        </button>
        <span class="quiz-key-hint">Tip: Use keys 1–5 to answer quickly</span>
      </div>
    </div>
  `
}

function bindRunnerEvents() {
  const optionBtns = document.querySelectorAll('.quiz-option-btn')
  optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = parseInt(btn.getAttribute('data-value'), 10)
      selectOption(val)
    })
  })

  const backBtn = document.getElementById('quiz-back-btn')
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      goToPrevQuestion()
    })
  }
}

function selectOption(value) {
  if (quizState.isTransitioning) return

  const currentQ = QUIZ_QUESTIONS[quizState.currentIndex]
  quizState.answers[currentQ.id] = value

  // Update UI selection immediately
  const optionBtns = document.querySelectorAll('.quiz-option-btn')
  optionBtns.forEach(btn => {
    const btnVal = parseInt(btn.getAttribute('data-value'), 10)
    if (btnVal === value) {
      btn.classList.add('selected')
      btn.setAttribute('aria-checked', 'true')
    } else {
      btn.classList.remove('selected')
      btn.setAttribute('aria-checked', 'false')
    }
  })

  quizState.isTransitioning = true

  // Auto-advance after 300ms
  setTimeout(() => {
    quizState.isTransitioning = false
    if (quizState.currentIndex < QUIZ_QUESTIONS.length - 1) {
      quizState.currentIndex++
      renderCurrentStep()
    } else {
      // Quiz completed
      if (ENABLE_LEAD_CAPTURE) {
        quizState.step = 'lead'
      } else {
        quizState.step = 'result'
      }
      renderCurrentStep()
    }
  }, 300)
}

function goToPrevQuestion() {
  if (quizState.currentIndex > 0) {
    quizState.currentIndex--
    renderCurrentStep()
  }
}

/* ------------------------------------------------------------
   3. OPTIONAL LEAD CAPTURE STEP
   ------------------------------------------------------------ */
function renderLeadHTML() {
  return `
    <div class="quiz-lead-capture" style="text-align: center;">
      <div class="quiz-eyebrow"><span>Almost Done!</span></div>
      <h2 class="quiz-title">Where should we send your results?</h2>
      <p class="quiz-subtext">Optionally enter your details to receive your personalized stress management roadmap.</p>

      <form id="lead-form" style="max-width: 420px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px;">
        <input
          type="text"
          id="lead-name"
          placeholder="Your Name (Optional)"
          style="padding: 14px 18px; border-radius: 4px; background: rgba(10,34,36,0.8); border: 1px solid rgba(var(--gold-rgb), 0.3); color: var(--cream);"
        />
        <input
          type="email"
          id="lead-email"
          placeholder="Your Email (Optional)"
          style="padding: 14px 18px; border-radius: 4px; background: rgba(10,34,36,0.8); border: 1px solid rgba(var(--gold-rgb), 0.3); color: var(--cream);"
        />
        <button type="submit" class="quiz-start-btn" style="width: 100%; justify-content: center;">
          View My Results →
        </button>
        <button type="button" id="lead-skip-btn" style="background: none; border: none; color: var(--text-muted); cursor: pointer; text-decoration: underline; font-size: 0.85rem; padding: 6px;">
          Skip and view results now
        </button>
      </form>
    </div>
  `
}

function bindLeadEvents() {
  const form = document.getElementById('lead-form')
  const skipBtn = document.getElementById('lead-skip-btn')

  const proceed = () => {
    quizState.step = 'result'
    renderCurrentStep()
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      // Optional logging: TODO integrate API endpoint
      const name = document.getElementById('lead-name')?.value
      const email = document.getElementById('lead-email')?.value
      console.log('Lead submitted:', { name, email })
      proceed()
    })
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', proceed)
  }
}

/* ------------------------------------------------------------
   4. RESULT STEP
   ------------------------------------------------------------ */
function renderResultHTML() {
  const totalScore = calculateTotalScore(quizState.answers)
  const level = getStressLevel(totalScore)
  const breakdown = calculateCategoryBreakdown(quizState.answers)
  const highestCatId = getHighestStressCategory(breakdown)
  const tips = getPersonalizedTips(highestCatId)
  const highestCategoryObj = CATEGORIES[highestCatId]

  // SVG Gauge calculations (radius = 70, circumference = 2 * pi * 70 ≈ 440)
  const radius = 70
  const circumference = 2 * Math.PI * radius
  // Scale score 20-100 to percentage (0 - 100)
  const percentage = Math.round(((totalScore - 20) / 80) * 100)
  const targetOffset = circumference - (percentage / 100) * circumference

  return `
    <div class="quiz-result-wrap">
      <!-- Overall Score Hero -->
      <div class="quiz-score-hero">
        <div class="quiz-eyebrow">
          <span>Your Stress Assessment</span>
        </div>

        <div class="gauge-container">
          <svg class="gauge-svg" viewBox="0 0 160 160">
            <circle class="gauge-bg-ring" cx="80" cy="80" r="${radius}"></circle>
            <circle
              class="gauge-fill-ring"
              id="gauge-fill-circle"
              cx="80"
              cy="80"
              r="${radius}"
              stroke="${level.color}"
              stroke-dasharray="${circumference}"
              stroke-dashoffset="${circumference}"
              data-target-offset="${targetOffset}"
            ></circle>
          </svg>
          <div class="gauge-center-content">
            <div class="gauge-score-num" id="gauge-score-display">0</div>
            <div class="gauge-score-max">out of 100</div>
          </div>
        </div>

        <div class="level-badge" style="background: ${level.badgeBg}; border: 1px solid ${level.badgeBorder}; color: ${level.color};">
          ${level.label}
        </div>

        <p class="quiz-explanation">${level.explanation}</p>

        ${level.key === 'high' ? `
          <div class="high-stress-notice">
            <span class="alert-icon">🤍</span>
            <div>
              <strong>A Gentle Note for You:</strong> If you are feeling overwhelmed, remember that you don't have to carry this alone. Consider speaking with a trusted friend, family member, or a qualified mental health professional who can provide dedicated, caring support.
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Category Breakdown -->
      <div class="quiz-categories-section">
        <h3 class="category-section-title">
          <span>Wellbeing Breakdown</span>
          <span style="font-size: 0.85rem; font-family: 'Jost', sans-serif; color: var(--gold); letter-spacing: 0.05em;">By Dimension</span>
        </h3>

        <div class="cat-breakdown-list">
          ${breakdown.map(cat => {
            const isHighest = cat.id === highestCatId
            return `
              <div class="cat-bar-item ${isHighest ? 'highlighted' : ''}">
                <div class="cat-bar-header">
                  <div class="cat-name-group">
                    <span>${cat.icon}</span>
                    <span>${cat.title}</span>
                    ${isHighest ? '<span class="cat-highest-tag">Highest Impact Area</span>' : ''}
                  </div>
                  <span class="cat-bar-score">${cat.percentage}%</span>
                </div>
                <div class="cat-track">
                  <div
                    class="cat-fill"
                    style="width: 0%;"
                    data-target-width="${cat.percentage}%"
                  ></div>
                </div>
              </div>
            `
          }).join('')}
        </div>
      </div>

      <!-- Personalized Recommendations -->
      <div class="recommendations-box">
        <h3>3 Personalised Tips for Your ${highestCategoryObj.name} Wellbeing</h3>
        <p class="rec-sub">Based on your highest stress indicator, here are three actionable, science-backed steps you can try today:</p>

        <div class="rec-cards-grid">
          ${tips.map((tip, idx) => `
            <div class="rec-card">
              <div class="rec-num">0${idx + 1}</div>
              <div>
                <h4>${tip.title}</h4>
                <p>${tip.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Laughter Connection Callout -->
      <div class="laughter-callout">
        <p>"Destresshub's laughter wellness sessions help reduce stress, improve mood, and build team connection."</p>
        <span>Experience the transformative, science-backed power of intentional laughter.</span>
      </div>

      <!-- Actions & Booking -->
      <div class="quiz-actions-grid">
        <a
          href="${waLink(`Hi! I just took the Stress Level Quiz on Destresshub and scored ${level.label}. I'd like to book a laughter wellness session.`)}"
          target="_blank"
          class="quiz-primary-cta"
        >
          Book a Laughter Wellness Session →
        </a>

        <button type="button" class="quiz-secondary-btn" id="quiz-share-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Share My Result</span>
        </button>

        <button type="button" class="quiz-secondary-btn" id="quiz-retake-btn">
          <span>↺ Retake Quiz</span>
        </button>
      </div>

      <!-- Offscreen Card for Picture (PNG) Export -->
      <div id="quiz-share-card" class="quiz-share-card-export">
        <div class="share-card-header">
          <div class="share-brand-info">
            <img src="/logo new.png" alt="Destresshub" class="share-brand-logo" crossorigin="anonymous">
            <div>
              <div class="share-brand-title">Destresshub</div>
              <div class="share-brand-tagline">Corporate Laughter Wellness</div>
            </div>
          </div>
          <span class="share-assessment-tag">Stress Quiz Result</span>
        </div>

        <div class="share-card-hero">
          <div class="share-score-big">${totalScore}</div>
          <div class="share-score-sub">out of 100</div>
          <div class="share-badge" style="background: ${level.badgeBg}; border: 1px solid ${level.badgeBorder}; color: ${level.color};">
            ${level.label}
          </div>
          <p class="share-expl">${level.explanation}</p>
        </div>

        <div class="share-breakdown-section">
          <div class="share-breakdown-title">Wellbeing Breakdown</div>
          ${breakdown.map(cat => {
            const isHighest = cat.id === highestCatId
            return `
              <div class="share-cat-row">
                <div class="share-cat-header">
                  <span>${cat.icon} ${cat.title} ${isHighest ? '★ Highest Impact' : ''}</span>
                  <span style="font-weight: 600; color: var(--gold);">${cat.percentage}%</span>
                </div>
                <div class="share-cat-bar-track">
                  <div class="share-cat-bar-fill" style="width: ${cat.percentage}%;"></div>
                </div>
              </div>
            `
          }).join('')}
        </div>

        <div class="share-invite-box">
          <div class="share-invite-title">How stressed are you, really? Take the 3-minute quiz yourself:</div>
          <div class="share-invite-url">destresshub.com/stress-quiz</div>
        </div>

        <div class="share-card-footer">
          <span>Destresshub · Stress out. Smiles in.</span>
          <span>Self-awareness assessment only</span>
        </div>
      </div>

      <p class="quiz-disclaimer">${DISCLAIMER_TEXT}</p>
    </div>
  `
}

function bindResultEvents() {
  const totalScore = calculateTotalScore(quizState.answers)
  const level = getStressLevel(totalScore)

  // Retake button
  const retakeBtn = document.getElementById('quiz-retake-btn')
  if (retakeBtn) {
    retakeBtn.addEventListener('click', () => {
      quizState.step = 'intro'
      quizState.currentIndex = 0
      quizState.answers = {}
      renderCurrentStep()
    })
  }

  // Share button: Generates a picture (PNG) and shares or downloads it with invitation text
  const shareBtn = document.getElementById('quiz-share-btn')
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const originalBtnHTML = shareBtn.innerHTML
      shareBtn.disabled = true
      shareBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-linecap="round"/>
        </svg>
        <span>Creating Picture...</span>
      `

      const shareUrl = window.location.href.split('#')[0]
      const shareText = `I just took the Stress Level Quiz on Destresshub and scored ${level.label} (${totalScore}/100)! Check your stress score and take the free 3-minute quiz yourself: ${shareUrl}`

      try {
        const exportEl = document.getElementById('quiz-share-card')
        if (!exportEl) throw new Error('Export element not found')

        const blob = await toBlob(exportEl, {
          pixelRatio: 2,
          backgroundColor: '#0a2224',
          cacheBust: true,
          skipFonts: false
        })

        if (!blob) throw new Error('Failed to create image blob')

        const file = new File([blob], 'destresshub-stress-result.png', { type: 'image/png' })
        let sharedWithNativeAPI = false

        // Check if Web Share API can share the image file
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: 'My Stress Level Assessment | Destresshub',
              text: shareText,
              files: [file]
            })
            sharedWithNativeAPI = true
          } catch (err) {
            if (err.name === 'AbortError') {
              // User dismissed the share sheet
              return
            }
          }
        }

        // Fallback: Download the PNG picture directly and copy invitation text to clipboard
        if (!sharedWithNativeAPI) {
          const downloadUrl = URL.createObjectURL(blob)
          const downloadLink = document.createElement('a')
          downloadLink.href = downloadUrl
          downloadLink.download = 'destresshub-stress-result.png'
          document.body.appendChild(downloadLink)
          downloadLink.click()
          document.body.removeChild(downloadLink)
          setTimeout(() => URL.revokeObjectURL(downloadUrl), 2000)

          if (navigator.clipboard) {
            await navigator.clipboard.writeText(shareText)
            toast('Result picture downloaded & invitation text copied to clipboard!')
          } else {
            toast('Result picture downloaded to your device!')
          }
        }
      } catch (err) {
        console.error('Failed to generate result picture:', err)
        // Fallback to text sharing if canvas generation fails
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(shareText)
          toast('Invitation text copied to clipboard!')
        } else {
          toast('Unable to generate picture automatically.')
        }
      } finally {
        shareBtn.disabled = false
        shareBtn.innerHTML = originalBtnHTML
      }
    })
  }
}

function animateResults() {
  const totalScore = calculateTotalScore(quizState.answers)

  // 1. Animate score counter
  const scoreDisplay = document.getElementById('gauge-score-display')
  if (scoreDisplay) {
    let current = 0
    const duration = 1200
    const startTime = performance.now()

    function step(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      current = Math.round(eased * totalScore)
      scoreDisplay.textContent = current

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        scoreDisplay.textContent = totalScore
      }
    }
    requestAnimationFrame(step)
  }

  // 2. Animate SVG circle gauge fill
  const circle = document.getElementById('gauge-fill-circle')
  if (circle) {
    const targetOffset = circle.getAttribute('data-target-offset')
    setTimeout(() => {
      circle.style.strokeDashoffset = targetOffset
    }, 150)
  }

  // 3. Animate category progress bars
  const catFills = document.querySelectorAll('.cat-fill')
  catFills.forEach(fill => {
    const targetWidth = fill.getAttribute('data-target-width')
    setTimeout(() => {
      fill.style.width = targetWidth
    }, 300)
  })
}
