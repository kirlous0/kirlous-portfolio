import { redirect } from 'next/navigation';
import { getUser, isAdmin } from '@/lib/supabase/server';
import { getAllServices } from '@/lib/data';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { ServicesManager } from '@/components/admin/ServicesManager';

export default async function AdminServicesPage() {
  const user = await getUser();
  
  if (!user) redirect('/admin/login');
  if (!(await isAdmin())) redirect('/admin/login?error=unauthorized');

  const services = await getAllServices();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      
      <main className="flex-1 p-6 md:p-12 pt-20 md:pt-12">
        <div className="max-w-4xl">
          <ServicesManager services={services} />
        </div>
      </main>
    </div>
  );
}
