import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getUser, isAdmin } from '@/lib/supabase/server';
import { getAllProjects } from '@/lib/data';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { getProjectStateLabel } from '@/lib/utils';

export default async function AdminProjectsPage() {
  const user = await getUser();
  
  if (!user) redirect('/admin/login');
  if (!(await isAdmin())) redirect('/admin/login?error=unauthorized');

  const projects = await getAllProjects();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      
      <main className="flex-1 p-6 md:p-12 pt-20 md:pt-12">
        <div className="max-w-6xl">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-3xl font-medium text-foreground mb-2">Projects</h1>
              <p className="text-small text-muted">Manage your portfolio projects</p>
            </div>
            <Link
              href="/admin/projects/new"
              className="text-small text-background bg-foreground px-4 py-2 hover:bg-accent transition-colors focus-ring"
            >
              + New Project
            </Link>
          </div>

          {projects.length === 0 ? (
            <div className="border border-border p-12 text-center">
              <p className="text-body text-muted mb-4">No projects yet</p>
              <Link
                href="/admin/projects/new"
                className="text-small text-foreground underline hover:text-accent transition-colors"
              >
                Create your first project
              </Link>
            </div>
          ) : (
            <div className="border border-border">
              <table className="w-full">
                <thead className="border-b border-border bg-surface">
                  <tr>
                    <th className="text-start text-label text-subtle px-4 py-3">Title</th>
                    <th className="text-start text-label text-subtle px-4 py-3 hidden md:table-cell">Category</th>
                    <th className="text-start text-label text-subtle px-4 py-3 hidden md:table-cell">State</th>
                    <th className="text-start text-label text-subtle px-4 py-3">Status</th>
                    <th className="text-end text-label text-subtle px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b border-border last:border-0 hover:bg-surface/50 transition-colors">
                      <td className="px-4 py-4">
                        <div>
                          <p className="text-small text-foreground">{project.title_en || 'Untitled'}</p>
                          {project.title_ar && (
                            <p className="text-xs text-muted mt-0.5">{project.title_ar}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className="text-small text-muted">{project.category || '—'}</span>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className="text-small text-muted">{getProjectStateLabel(project.state, 'en')}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          {project.is_published ? (
                            <span className="text-label text-success">Published</span>
                          ) : (
                            <span className="text-label text-warning">Draft</span>
                          )}
                          {project.is_featured && (
                            <span className="text-label text-accent">★</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-end">
                        <Link
                          href={`/admin/projects/${project.id}`}
                          className="text-small text-muted hover:text-foreground transition-colors focus-ring"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
