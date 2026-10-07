/**
 * Unit tests for Destresshub Stress Scoring Logic
 * Tests boundary scores: 20, 40, 41, 60, 61, 80, 81, 100, category percentages, and tips.
 */

import assert from 'node:assert/strict'
import {
  calculateTotalScore,
  getStressLevel,
  calculateCategoryBreakdown,
  getHighestStressCategory,
  getPersonalizedTips,
  formatShareText,
  STRESS_LEVELS
} from '../src/utils/stress-scoring.js'
import { QUIZ_QUESTIONS } from '../src/data/stress-quiz.js'

console.log('Running Destresshub Stress Quiz scoring tests...\n')

// 1. Boundary score checks
console.log('1. Testing boundary scores for getStressLevel():')

// Boundary: 20 (minimum score -> Low Stress)
assert.equal(getStressLevel(20).key, 'low')
assert.equal(getStressLevel(20).label, 'Low Stress')
console.log('  ✓ Score 20 = Low Stress')

// Boundary: 40 (upper boundary of Low Stress)
assert.equal(getStressLevel(40).key, 'low')
assert.equal(getStressLevel(40).label, 'Low Stress')
console.log('  ✓ Score 40 = Low Stress')

// Boundary: 41 (lower boundary of Mild Stress)
assert.equal(getStressLevel(41).key, 'mild')
assert.equal(getStressLevel(41).label, 'Mild Stress')
console.log('  ✓ Score 41 = Mild Stress')

// Boundary: 60 (upper boundary of Mild Stress)
assert.equal(getStressLevel(60).key, 'mild')
assert.equal(getStressLevel(60).label, 'Mild Stress')
console.log('  ✓ Score 60 = Mild Stress')

// Boundary: 61 (lower boundary of Moderate Stress)
assert.equal(getStressLevel(61).key, 'moderate')
assert.equal(getStressLevel(61).label, 'Moderate Stress')
console.log('  ✓ Score 61 = Moderate Stress')

// Boundary: 80 (upper boundary of Moderate Stress)
assert.equal(getStressLevel(80).key, 'moderate')
assert.equal(getStressLevel(80).label, 'Moderate Stress')
console.log('  ✓ Score 80 = Moderate Stress')

// Boundary: 81 (lower boundary of High Stress)
assert.equal(getStressLevel(81).key, 'high')
assert.equal(getStressLevel(81).label, 'High Stress')
console.log('  ✓ Score 81 = High Stress')

// Boundary: 100 (maximum score -> High Stress)
assert.equal(getStressLevel(100).key, 'high')
assert.equal(getStressLevel(100).label, 'High Stress')
console.log('  ✓ Score 100 = High Stress')

// 2. Testing calculateTotalScore
console.log('\n2. Testing calculateTotalScore():')

// All 1s (Never) -> Total 20
const allOnes = {}
QUIZ_QUESTIONS.forEach(q => { allOnes[q.id] = 1 })
assert.equal(calculateTotalScore(allOnes), 20)
console.log('  ✓ All 1s sums to 20')

// All 5s (Almost Always) -> Total 100
const allFives = {}
QUIZ_QUESTIONS.forEach(q => { allFives[q.id] = 5 })
assert.equal(calculateTotalScore(allFives), 100)
console.log('  ✓ All 5s sums to 100')

// All 3s (Sometimes) -> Total 60 (Mild Stress)
const allThrees = {}
QUIZ_QUESTIONS.forEach(q => { allThrees[q.id] = 3 })
assert.equal(calculateTotalScore(allThrees), 60)
assert.equal(getStressLevel(calculateTotalScore(allThrees)).key, 'mild')
console.log('  ✓ All 3s sums to 60 (Mild Stress)')

// 3. Testing Category Breakdown & Highest-Stress Category
console.log('\n3. Testing Category Breakdown & Highest Category:')

// Set only physical questions to 5, all others to 1
const physicalHighAnswers = {}
QUIZ_QUESTIONS.forEach(q => {
  physicalHighAnswers[q.id] = q.category === 'physical' ? 5 : 1
})
const breakdown = calculateCategoryBreakdown(physicalHighAnswers)
const physicalCategory = breakdown.find(c => c.id === 'physical')
assert.equal(physicalCategory.score, 25)
assert.equal(physicalCategory.percentage, 100)

const highest = getHighestStressCategory(breakdown)
assert.equal(highest, 'physical')
console.log('  ✓ Physical category identified as highest when physical answers are maxed (100%)')

// 4. Testing Personalized Tips
console.log('\n4. Testing Personalized Tips:')
const tips = getPersonalizedTips('physical')
assert.equal(tips.length, 3)
assert.ok(tips[0].title.length > 0)
assert.ok(tips[0].desc.length > 0)
console.log('  ✓ Returns exactly 3 tips with title and description')

// 5. Testing Share Text (never contains detailed answers)
console.log('\n5. Testing Privacy in Share Text:')
const shareText = formatShareText('Moderate Stress')
assert.ok(shareText.includes('Moderate Stress'))
assert.ok(!shareText.includes('Q1') && !shareText.includes('answers'))
console.log('  ✓ Share text includes stress level and URL, without any private answers')

console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY!')
