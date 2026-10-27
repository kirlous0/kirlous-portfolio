import { redirect } from 'next/navigation';
import { getUser, isAdmin } from '@/lib/supabase/server';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { ProjectEditor } from '@/components/admin/ProjectEditor';
import { getSiteSettings } from '@/lib/data';

export default async function NewProjectPage() {
  const user = await getUser();
  
  if (!user) redirect('/admin/login');
  if (!(await isAdmin())) redirect('/admin/login?error=unauthorized');

  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      
      <main className="flex-1 p-6 md:p-12 pt-20 md:pt-12">
        <div className="max-w-4xl">
          <ProjectEditor settings={settings} />
        </div>
      </main>
    </div>
  );
}
