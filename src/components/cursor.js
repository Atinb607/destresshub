/**
 * Custom cursor - gold dot + ring that follows mouse
 * Re-initialize after each page navigation to attach hover listeners
 */

let animFrame = null
let moveHandler = null

export function renderCursor() {
  return `
    <div id="cursor"></div>
    <div id="cursor-ring"></div>
  `
}

export function initCursor() {
  const cur = document.getElementById('cursor')
  const ring = document.getElementById('cursor-ring')
  if (!cur || !ring) return

  let rx = 0, ry = 0, mx = 0, my = 0

  // Remove old listener if any
  if (moveHandler) document.removeEventListener('mousemove', moveHandler)

  moveHandler = (e) => {
    mx = e.clientX
    my = e.clientY
    cur.style.left = mx + 'px'
    cur.style.top = my + 'px'
  }
  document.addEventListener('mousemove', moveHandler)

  // Cancel old animation frame
  if (animFrame) cancelAnimationFrame(animFrame)

  function animRing() {
    rx += (mx - rx) * 0.12
    ry += (my - ry) * 0.12
    ring.style.left = rx + 'px'
    ring.style.top = ry + 'px'
    animFrame = requestAnimationFrame(animRing)
  }
  animRing()

  // Hover effects on interactive elements
  refreshCursorHovers()
}

export function refreshCursorHovers() {
  const cur = document.getElementById('cursor')
  if (!cur) return

  document.querySelectorAll('a, button, .session-card, .g-frame, .testi-card, .p-card, .job-card, [data-hover]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cur.style.width = '18px'
      cur.style.height = '18px'
      cur.style.background = 'var(--gold-light)'
    })
    el.addEventListener('mouseleave', () => {
      cur.style.width = '10px'
      cur.style.height = '10px'
      cur.style.background = 'var(--gold)'
    })
  })
}
