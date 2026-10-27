import { Navigation } from '@/components/public/Navigation';
import { Footer } from '@/components/public/Footer';
import { BackgroundAnimation } from '@/components/public/BackgroundAnimation';
import { getSiteSettings } from '@/lib/data';
import type { Locale } from '@/types';

interface PublicLayoutProps {
  children: React.ReactNode;
  locale: Locale;
}

export async function PublicLayout({ children, locale }: PublicLayoutProps) {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen flex flex-col relative">
      <BackgroundAnimation />
      
      {/* Parallax Layers */}
      <div className="parallax-layer parallax-layer-1" aria-hidden="true"></div>
      <div className="parallax-layer parallax-layer-2" aria-hidden="true"></div>
      <div className="parallax-layer parallax-layer-3" aria-hidden="true"></div>
      
      {/* Pulse Dots Grid */}
      <div className="pulse-dots" aria-hidden="true">
        <div className="pulse-dot"></div>
        <div className="pulse-dot"></div>
        <div className="pulse-dot"></div>
        <div className="pulse-dot"></div>
        <div className="pulse-dot"></div>
        <div className="pulse-dot"></div>
        <div className="pulse-dot"></div>
        <div className="pulse-dot"></div>
        <div className="pulse-dot"></div>
        <div className="pulse-dot"></div>
        <div className="pulse-dot"></div>
        <div className="pulse-dot"></div>
        <div className="pulse-dot"></div>
        <div className="pulse-dot"></div>
        <div className="pulse-dot"></div>
        <div className="pulse-dot"></div>
        <div className="pulse-dot"></div>
        <div className="pulse-dot"></div>
        <div className="pulse-dot"></div>
        <div className="pulse-dot"></div>
        <div className="pulse-dot"></div>
        <div className="pulse-dot"></div>
        <div className="pulse-dot"></div>
        <div className="pulse-dot"></div>
        <div className="pulse-dot"></div>
      </div>
      
      {/* Geometric Grid Pattern */}
      <div className="geometric-grid" aria-hidden="true"></div>
      
      <Navigation locale={locale} siteSettings={settings} />
      <main className="flex-1 pt-16 md:pt-20 relative z-10">
        {children}
      </main>
      <Footer locale={locale} settings={settings} />
    </div>
  );
}
