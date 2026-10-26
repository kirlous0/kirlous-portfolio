import { Navigation } from '@/components/public/Navigation';
import { Footer } from '@/components/public/Footer';
import { getSiteSettings } from '@/lib/data';
import type { Locale } from '@/types';

interface PublicLayoutProps {
  children: React.ReactNode;
  locale: Locale;
}

export async function PublicLayout({ children, locale }: PublicLayoutProps) {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation locale={locale} siteSettings={settings} />
      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      <Footer locale={locale} settings={settings} />
    </div>
  );
}
