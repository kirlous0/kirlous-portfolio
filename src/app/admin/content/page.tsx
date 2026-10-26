import { redirect } from 'next/navigation';
import { getUser, isAdmin } from '@/lib/supabase/server';
import { getPageContent } from '@/lib/data';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { ContentManager } from '@/components/admin/ContentManager';

export default async function AdminContentPage() {
  const user = await getUser();
  
  if (!user) redirect('/admin/login');
  if (!(await isAdmin())) redirect('/admin/login?error=unauthorized');

  const [homeContent, aboutContent] = await Promise.all([
    getPageContent('home'),
    getPageContent('about'),
  ]);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      
      <main className="flex-1 p-6 md:p-12 pt-20 md:pt-12">
        <div className="max-w-4xl">
          <ContentManager homeContent={homeContent} aboutContent={aboutContent} />
        </div>
      </main>
    </div>
  );
}
