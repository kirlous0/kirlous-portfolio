import Link from 'next/link';
import type { Locale, SiteSettings } from '@/types';
import { getTranslations } from '@/lib/i18n';
import { getCurrentYear, isValidUrl } from '@/lib/utils';

interface FooterProps {
  locale: Locale;
  settings: SiteSettings | null;
}

export function Footer({ locale, settings }: FooterProps) {
  const t = getTranslations(locale);
  const year = getCurrentYear();
  
  const socialLinks = [];
  if (settings?.github_url && isValidUrl(settings.github_url)) {
    socialLinks.push({ label: 'GitHub', href: settings.github_url });
  }
  if (settings?.linkedin_url && isValidUrl(settings.linkedin_url)) {
    socialLinks.push({ label: 'LinkedIn', href: settings.linkedin_url });
  }
  if (settings?.email) {
    socialLinks.push({ label: 'Email', href: `mailto:${settings.email}` });
  }
  if (settings?.whatsapp) {
    const cleanedPhone = settings.whatsapp.replace(/[^0-9]/g, '');
    socialLinks.push({ label: 'WhatsApp', href: `https://wa.me/${cleanedPhone}` });
  }

  const navLinks = [
    { label: t.nav.work, href: `/${locale}/work` },
    { label: t.nav.services, href: `/${locale}/services` },
    { label: t.nav.about, href: `/${locale}/about` },
    { label: t.nav.contact, href: `/${locale}/contact` },
  ];

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-portfolio py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <p className="text-label text-subtle mb-4">KIRLOUS WAEL</p>
            <p className="text-foreground text-body max-w-md">
              {locale === 'en' 
                ? 'Independent web developer building thoughtful digital experiences.'
                : 'مطور ويب مستقل يبني تجارب رقمية مدروسة.'}
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <p className="text-label text-subtle mb-4">{t.footer.navigation}</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-small text-muted hover:text-foreground transition-colors focus-ring"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          {socialLinks.length > 0 && (
            <div className="md:col-span-4">
              <p className="text-label text-subtle mb-4">{t.footer.connect}</p>
              <ul className="space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-small text-muted hover:text-foreground transition-colors focus-ring inline-flex items-center gap-2"
                    >
                      {link.label}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-50">
                        <path d="M3.5 3H9V8.5" stroke="currentColor" strokeWidth="1" />
                        <path d="M9 3L3 9" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-small text-subtle">
            © {year} Kirlous Wael. {t.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/en"
              className="text-small text-muted hover:text-foreground transition-colors focus-ring"
            >
              EN
            </Link>
            <span className="text-subtle">/</span>
            <Link
              href="/ar"
              className="text-small text-muted hover:text-foreground transition-colors focus-ring"
            >
              ع
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
