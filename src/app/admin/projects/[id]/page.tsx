import { redirect, notFound } from 'next/navigation';
import { getUser, isAdmin } from '@/lib/supabase/server';
import { getProjectById } from '@/lib/data';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { ProjectEditor } from '@/components/admin/ProjectEditor';

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const user = await getUser();
  
  if (!user) redirect('/admin/login');
  if (!(await isAdmin())) redirect('/admin/login?error=unauthorized');

  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      
      <main className="flex-1 p-6 md:p-12 pt-20 md:pt-12">
        <div className="max-w-4xl">
          <ProjectEditor project={project} />
        </div>
      </main>
    </div>
  );
}
