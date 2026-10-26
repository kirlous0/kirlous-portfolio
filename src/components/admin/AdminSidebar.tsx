'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/cn';

const navItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Projects', href: '/admin/projects' },
  { label: 'Services', href: '/admin/services' },
  { label: 'Content', href: '/admin/content' },
  { label: 'Settings', href: '/admin/settings' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-e border-border bg-surface min-h-screen">
        <div className="p-6 border-b border-border">
          <Link href="/" className="text-sm font-medium text-foreground">
            KIRLOUS WAEL
          </Link>
          <p className="text-label text-subtle mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = item.href === '/admin' 
              ? pathname === '/admin'
              : pathname.startsWith(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block px-4 py-2.5 text-small transition-colors focus-ring',
                  isActive
                    ? 'text-foreground bg-background'
                    : 'text-muted hover:text-foreground hover:bg-background/50'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          <Link
            href="/en"
            className="block px-4 py-2 text-small text-muted hover:text-foreground transition-colors focus-ring"
          >
            ← Back to Site
          </Link>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="block w-full text-start px-4 py-2 text-small text-muted hover:text-foreground transition-colors focus-ring disabled:opacity-50"
          >
            {loggingOut ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/" className="text-sm font-medium text-foreground">
            ADMIN
          </Link>
          <nav className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = item.href === '/admin' 
                ? pathname === '/admin'
                : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-2 py-1 text-xs transition-colors focus-ring',
                    isActive ? 'text-foreground' : 'text-muted'
                  )}
                >
                  {item.label.slice(0, 4)}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
