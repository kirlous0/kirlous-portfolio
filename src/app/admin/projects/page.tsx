import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getUser, isAdmin } from '@/lib/supabase/server';
import { getAllProjects } from '@/lib/data';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { ProjectsTable } from '@/components/admin/ProjectsTable';

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

          <ProjectsTable projects={projects} />
        </div>
      </main>
    </div>
  );
}
