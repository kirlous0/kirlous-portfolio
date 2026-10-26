import Link from 'next/link';
import type { Locale, PageContent } from '@/types';
import { getTranslations } from '@/lib/i18n';

interface CallToActionProps {
  locale: Locale;
  content: PageContent[];
}

export function CallToAction({ locale, content }: CallToActionProps) {
  const t = getTranslations(locale);
  
  const getContent = (key: string, fallback: string) => {
    const item = content.find(c => c.section_key === key);
    if (!item) return fallback;
    const val = locale === 'ar' ? item.content_ar : item.content_en;
    return val || fallback;
  };

  const heading = getContent('cta_heading', t.cta.heading);
  const subheading = getContent('cta_subheading', t.cta.subheading);
  const action = getContent('cta_action', t.cta.action);

  return (
    <section className="py-24 md:py-40 border-t border-border">
      <div className="container-portfolio text-center">
        <h2 className="heading-section text-foreground mb-6">
          {heading}
        </h2>
        <p className="text-body text-muted max-w-2xl mx-auto mb-12">
          {subheading}
        </p>
        <Link
          href={`/${locale}/contact`}
          className="group inline-flex items-center gap-3 text-background bg-foreground px-8 py-4 hover:bg-accent transition-colors focus-ring"
        >
          <span className="text-small tracking-wider uppercase">{action}</span>
          <svg 
            width="24" height="12" viewBox="0 0 24 12" fill="none"
            className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          >
            <path d="M0 6H22M22 6L17 1M22 6L17 11" stroke="currentColor" strokeWidth="1" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
