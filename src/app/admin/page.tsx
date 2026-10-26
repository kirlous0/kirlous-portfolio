import { redirect } from 'next/navigation';
import { getUser, isAdmin } from '@/lib/supabase/server';
import { getDashboardStats } from '@/lib/data';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default async function AdminDashboardPage() {
  const user = await getUser();
  
  if (!user) {
    redirect('/admin/login');
  }

  if (!(await isAdmin())) {
    redirect('/admin/login?error=unauthorized');
  }

  const stats = await getDashboardStats();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      
      <main className="flex-1 p-6 md:p-12 pt-20 md:pt-12">
        <div className="max-w-6xl">
          <div className="mb-12">
            <h1 className="text-3xl font-medium text-foreground mb-2">Dashboard</h1>
            <p className="text-small text-muted">Overview of your portfolio</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            <div className="border border-border p-6">
              <p className="text-label text-subtle mb-2">Published</p>
              <p className="text-3xl font-medium text-foreground">
                {stats?.publishedProjects ?? 0}
              </p>
            </div>
            <div className="border border-border p-6">
              <p className="text-label text-subtle mb-2">Drafts</p>
              <p className="text-3xl font-medium text-foreground">
                {stats?.draftProjects ?? 0}
              </p>
            </div>
            <div className="border border-border p-6">
              <p className="text-label text-subtle mb-2">Featured</p>
              <p className="text-3xl font-medium text-foreground">
                {stats?.featuredProjects ?? 0}
              </p>
            </div>
            <div className="border border-border p-6">
              <p className="text-label text-subtle mb-2">Services</p>
              <p className="text-3xl font-medium text-foreground">
                {stats?.visibleServices ?? 0}
              </p>
            </div>
          </div>

          {/* Setup Checklist */}
          {stats?.checklist && (
            <div className="border border-border p-6 md:p-8">
              <h2 className="text-xl font-medium text-foreground mb-6">Setup Checklist</h2>
              <div className="space-y-4">
                <ChecklistItem
                  label="Contact method configured (email or WhatsApp)"
                  checked={stats.checklist.hasContactMethod}
                />
                <ChecklistItem
                  label="At least one project published"
                  checked={stats.checklist.hasPublishedProjects}
                />
                <ChecklistItem
                  label="Service descriptions completed"
                  checked={stats.checklist.hasServiceDescriptions}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function ChecklistItem({ label, checked }: { label: string; checked: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-5 h-5 border flex items-center justify-center ${checked ? 'border-success bg-success/10' : 'border-border'}`}>
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" className="text-success" />
          </svg>
        )}
      </div>
      <span className={`text-small ${checked ? 'text-foreground' : 'text-muted'}`}>
        {label}
      </span>
    </div>
  );
}
