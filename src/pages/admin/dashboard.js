import { getAllJobs, updateJob, deleteJob, getSession, signOut } from '../../supabase.js'
import { navigate } from '../../router.js'
import { toast, formatDate } from '../../utils/helpers.js'

export async function adminDashboardPage() {
  const session = await getSession()
  if (!session) {
    navigate('/admin')
    return { html: '' }
  }

  const jobs = await getAllJobs()

  const renderTableRows = () => {
    if (jobs.length === 0) {
      return `<tr><td colspan="5" style="text-align:center; color:var(--text-muted); padding:32px;">No jobs found. Create one to get started.</td></tr>`
    }

    return jobs.map(job => `
      <tr>
        <td><strong>${job.title}</strong></td>
        <td>${job.department || ''}</td>
        <td><span class="status-badge ${job.status}">${job.status}</span></td>
        <td>${formatDate(job.created_at)}</td>
        <td>
          <div class="admin-actions">
            <button class="admin-btn edit-btn" data-id="${job.id}">Edit</button>
            <button class="admin-btn toggle-btn" data-id="${job.id}" data-status="${job.status}">
              ${job.status === 'published' ? 'Unpublish' : 'Publish'}
            </button>
            <button class="admin-btn danger delete-btn" data-id="${job.id}">Delete</button>
          </div>
        </td>
      </tr>
    `).join('')
  }

  const html = `
    <div class="admin-page">
      <div class="admin-layout">
        <div class="admin-sidebar">
          <div class="admin-sidebar-logo">DStress<span>Hub</span></div>
          <div class="admin-sidebar-nav">
            <a href="/admin/jobs" data-link class="active">Job Listings</a>
            <a href="/admin/jobs/new" data-link>Create Job</a>
            <a href="/" data-link target="_blank">View Live Site</a>
          </div>
          <div class="admin-sidebar-footer">
            <button id="sign-out-btn" class="admin-btn" style="width:100%;text-align:left;border:none;">Sign Out</button>
          </div>
        </div>
        
        <div class="admin-content">
          <div class="admin-header">
            <h1>Job Listings</h1>
            <a href="/admin/jobs/new" data-link class="btn-gold" style="font-size:.75rem;padding:12px 24px;">Create New Job</a>
          </div>
          
          <div style="background:rgba(255,255,255,.02); border:1px solid rgba(245,240,232,.06); border-radius:4px; overflow-x:auto;">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${renderTableRows()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `

  const init = () => {
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', () => navigate(`/admin/jobs/edit/${btn.dataset.id}`))
    })

    document.querySelectorAll('.toggle-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id
        const current = btn.dataset.status
        const newStatus = current === 'published' ? 'draft' : 'published'
        btn.textContent = 'Wait...'
        const res = await updateJob(id, { status: newStatus })
        if (res) {
          toast(`Job ${newStatus} successfully`)
          navigate('/admin/jobs', false) // reload
        } else {
          toast('Failed to update status', 'error')
          btn.textContent = current === 'published' ? 'Unpublish' : 'Publish'
        }
      })
    })

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (confirm('Are you sure you want to delete this job? This cannot be undone.')) {
          btn.textContent = 'Wait...'
          const res = await deleteJob(btn.dataset.id)
          if (res) {
            toast('Job deleted')
            navigate('/admin/jobs', false)
          } else {
            toast('Failed to delete', 'error')
            btn.textContent = 'Delete'
          }
        }
      })
    })

    const soBtn = document.getElementById('sign-out-btn')
    if (soBtn) {
      soBtn.addEventListener('click', async () => {
        await signOut()
        navigate('/admin')
      })
    }
  }

  return { html, init }
}
