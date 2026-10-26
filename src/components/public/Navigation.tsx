'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/types';
import { getTranslations } from '@/lib/i18n';
import { cn } from '@/lib/cn';

interface NavigationProps {
  locale: Locale;
  siteSettings?: {
    email?: string | null;
    whatsapp?: string | null;
  } | null;
}

export function Navigation({ locale }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const t = getTranslations(locale);
  
  const otherLocale = locale === 'en' ? 'ar' : 'en';
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`);
  
  const navItems = [
    { label: t.nav.work, href: `/${locale}/work` },
    { label: t.nav.services, href: `/${locale}/services` },
    { label: t.nav.about, href: `/${locale}/about` },
    { label: t.nav.contact, href: `/${locale}/contact` },
  ];

  /*
   * Scroll-aware navbar: background/border appear after 20px scroll.
   * Uses passive listener + rAF throttle. No layout shift:
   * height, padding, and font sizes stay constant.
   */
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Set initial state (handles page restore with scroll position)
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'nav-header fixed top-0 left-0 right-0 z-50 border-b',
        scrolled
          ? 'bg-background border-border'
          : 'bg-transparent border-transparent'
      )}
    >
      <nav className="container-portfolio">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Brand */}
          <Link 
            href={`/${locale}`}
            className="text-foreground font-medium tracking-tight hover:text-accent transition-colors focus-ring"
          >
            <span className="text-sm md:text-base">KIRLOUS WAEL</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-small text-muted hover:text-foreground transition-colors focus-ring',
                  pathname === item.href && 'text-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Language Switch */}
            <Link
              href={switchPath}
              className="text-small text-muted hover:text-foreground transition-colors focus-ring"
            >
              {otherLocale === 'ar' ? 'AR' : 'EN'}
            </Link>

            {/* CTA */}
            <Link
              href={`/${locale}/contact`}
              className="text-small text-background bg-foreground px-4 py-2 hover:bg-accent transition-colors focus-ring"
            >
              {t.nav.letsTalk}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground focus-ring p-2"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={cn(
                'w-full h-px bg-foreground transition-transform',
                isOpen && 'rotate-45 translate-y-2'
              )} />
              <span className={cn(
                'w-full h-px bg-foreground transition-opacity',
                isOpen && 'opacity-0'
              )} />
              <span className={cn(
                'w-full h-px bg-foreground transition-transform',
                isOpen && '-rotate-45 -translate-y-2'
              )} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-6 animate-slide-down">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'text-body text-muted hover:text-foreground transition-colors focus-ring py-2',
                    pathname === item.href && 'text-foreground'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              
              <Link
                href={switchPath}
                onClick={() => setIsOpen(false)}
                className="text-body text-muted hover:text-foreground transition-colors focus-ring py-2"
              >
                {otherLocale === 'ar' ? 'العربية' : 'English'}
              </Link>

              <Link
                href={`/${locale}/contact`}
                onClick={() => setIsOpen(false)}
                className="text-body text-background bg-foreground px-4 py-3 hover:bg-accent transition-colors focus-ring text-center mt-4"
              >
                {t.nav.letsTalk}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
