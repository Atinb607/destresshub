/**
 * Reusable section header component
 * @param {Object} opts
 * @param {string} opts.tag - Small label text (e.g. "Our Philosophy")
 * @param {string} opts.title - Main heading HTML (supports <em>, <br/>)
 * @param {string} [opts.description] - Optional paragraph below heading
 * @param {'dark'|'light'} [opts.theme='dark'] - Color scheme
 * @param {'left'|'center'} [opts.align='left'] - Alignment
 */
export function sectionHeader({ tag, title, description = '', theme = 'dark', align = 'left' }) {
  const isCenter = align === 'center'
  const tagColor = theme === 'light' ? 'var(--olive)' : 'var(--gold)'
  const lineColor = theme === 'light' ? 'var(--olive)' : 'var(--gold)'
  const titleColor = theme === 'light' ? 'var(--text-dark)' : 'var(--text-light)'
  const descColor = theme === 'light' ? 'var(--text-body)' : 'var(--text-muted)'

  const tagStyle = isCenter ? 'justify-content:center;' : ''
  const titleStyle = isCenter ? 'text-align:center;' : ''
  const descStyle = isCenter ? 'margin:16px auto 0;text-align:center;' : 'margin-top:16px;'

  return `
    <div class="section-tag" ${tagStyle ? `style="${tagStyle}"` : ''}>
      <div class="line" style="background:${lineColor}"></div>
      <span style="color:${tagColor}">${tag}</span>
    </div>
    <h2 style="color:${titleColor};${titleStyle}">${title}</h2>
    ${description ? `<p class="section-desc" style="color:${descColor};font-size:.95rem;font-weight:300;line-height:1.8;max-width:640px;${descStyle}">${description}</p>` : ''}
  `
}
