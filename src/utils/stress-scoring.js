/**
 * Destresshub - Stress Quiz Scoring Logic
 * Pure functions for calculating overall score, level, category breakdown, and recommendations
 */

import { CATEGORIES, CATEGORY_TIPS, QUIZ_QUESTIONS } from '../data/stress-quiz.js'

export const STRESS_LEVELS = {
  low: {
    key: 'low',
    label: 'Low Stress',
    min: 20,
    max: 40,
    color: '#34d399',      // Emerald Green
    accentColor: '#10b981',
    badgeBg: 'rgba(52, 211, 153, 0.15)',
    badgeBorder: 'rgba(52, 211, 153, 0.4)',
    explanation: 'Your responses indicate a calm, balanced baseline with manageable everyday pressures. You seem to have healthy coping reserves, though regular wellness routines and joyful laughter pauses will help maintain this equilibrium.'
  },
  mild: {
    key: 'mild',
    label: 'Mild Stress',
    min: 41,
    max: 60,
    color: '#a3e635',      // Lime / Yellow-Green
    accentColor: '#84cc16',
    badgeBg: 'rgba(163, 230, 53, 0.15)',
    badgeBorder: 'rgba(163, 230, 53, 0.4)',
    explanation: 'You are experiencing normal but noticeable day-to-day pressures. While you are coping well overall, certain days or responsibilities may feel taxing. Taking proactive micro-breaks and laughter wellness pauses can prevent this from creeping into burnout.'
  },
  moderate: {
    key: 'moderate',
    label: 'Moderate Stress',
    min: 61,
    max: 80,
    color: '#fb923c',      // Warm Orange
    accentColor: '#f97316',
    badgeBg: 'rgba(251, 146, 60, 0.15)',
    badgeBorder: 'rgba(251, 146, 60, 0.4)',
    explanation: 'Your stress levels are elevated and likely having a tangible impact on your energy, mood, or focus. Your body and mind are working overtime to keep up. It is time to prioritize active recovery, set clearer boundaries, and release accumulated tension through intentional laughter and breathwork.'
  },
  high: {
    key: 'high',
    label: 'High Stress',
    min: 81,
    max: 100,
    color: '#f87171',      // Red
    accentColor: '#ef4444',
    badgeBg: 'rgba(248, 113, 113, 0.18)',
    badgeBorder: 'rgba(248, 113, 113, 0.45)',
    explanation: 'Your score suggests significant stress overload across multiple areas of life. You may be experiencing exhaustion, emotional overwhelm, or feeling constantly on edge. Be especially gentle with yourself right now, lighten your load wherever possible, and seek restorative care.'
  }
}

/**
 * Calculate total score from an answers dictionary { [questionId]: value }
 * @param {Record<number|string, number>} answers
 * @returns {number} Sum of values (20-100)
 */
export function calculateTotalScore(answers) {
  if (!answers || typeof answers !== 'object') return 20

  let total = 0
  for (const q of QUIZ_QUESTIONS) {
    const val = Number(answers[q.id])
    // Fallback to 1 if unanswered or invalid
    total += (!isNaN(val) && val >= 1 && val <= 5) ? val : 1
  }
  return Math.min(100, Math.max(20, total))
}

/**
 * Determine stress level category based on total score
 * 20-40: Low Stress
 * 41-60: Mild Stress
 * 61-80: Moderate Stress
 * 81-100: High Stress
 * @param {number} score
 * @returns {typeof STRESS_LEVELS[keyof typeof STRESS_LEVELS]}
 */
export function getStressLevel(score) {
  const s = Math.round(score)
  if (s <= 40) return STRESS_LEVELS.low
  if (s <= 60) return STRESS_LEVELS.mild
  if (s <= 80) return STRESS_LEVELS.moderate
  return STRESS_LEVELS.high
}

/**
 * Calculate per-category sum and percentage score
 * Percentage = (categorySum / maxCategoryScore) * 100
 * @param {Record<number|string, number>} answers
 * @returns {Array<{ id: string, name: string, title: string, icon: string, score: number, maxScore: number, percentage: number }>}
 */
export function calculateCategoryBreakdown(answers) {
  const categorySums = {
    physical: 0,
    emotional: 0,
    mental: 0,
    behavioral: 0,
    work_life: 0
  }

  for (const q of QUIZ_QUESTIONS) {
    const val = Number(answers?.[q.id]) || 1
    if (categorySums[q.category] !== undefined) {
      categorySums[q.category] += val
    }
  }

  return Object.keys(CATEGORIES).map(catId => {
    const cat = CATEGORIES[catId]
    const sum = categorySums[catId]
    const percentage = Math.round((sum / cat.maxScore) * 100)
    return {
      id: catId,
      name: cat.name,
      title: cat.title,
      icon: cat.icon,
      score: sum,
      maxScore: cat.maxScore,
      percentage
    }
  })
}

/**
 * Find the category with the highest stress percentage
 * @param {Array<{ id: string, percentage: number }>} breakdown
 * @returns {string} Category ID
 */
export function getHighestStressCategory(breakdown) {
  if (!breakdown || !breakdown.length) return 'physical'
  let highest = breakdown[0]
  for (const item of breakdown) {
    if (item.percentage > highest.percentage) {
      highest = item
    }
  }
  return highest.id
}

/**
 * Retrieve 3 personalised recommendations for the highest-stress category
 * @param {string} categoryId
 * @returns {Array<{ title: string, desc: string }>}
 */
export function getPersonalizedTips(categoryId) {
  return CATEGORY_TIPS[categoryId] || CATEGORY_TIPS.physical
}

/**
 * Format shareable message text for Web Share API or Clipboard
 * @param {string} levelLabel e.g. "Moderate Stress"
 * @param {string} [url]
 * @returns {string}
 */
export function formatShareText(levelLabel, url = 'https://www.destresshub.com/stress-quiz') {
  return `I just took the 3-minute Stress Level Quiz on Destresshub and scored ${levelLabel}. Take the free quiz to check your stress level: ${url}`
}
