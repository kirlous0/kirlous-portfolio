import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/data';
import { getDirection } from '@/lib/utils';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const settings = await getSiteSettings();
  
  const title = locale === 'ar' 
    ? (settings?.site_title_ar || 'كيرلس وائل — مطور ويب')
    : (settings?.site_title_en || 'Kirlous Wael — Web Developer');
    
  const description = locale === 'ar'
    ? (settings?.site_description_ar || 'مطور ويب مستقل يبني تجارب رقمية مدروسة.')
    : (settings?.site_description_en || 'Independent web developer building thoughtful digital experiences.');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  const dir = getDirection(locale as 'en' | 'ar');

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
