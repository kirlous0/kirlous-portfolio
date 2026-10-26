import Link from 'next/link';
import type { Locale, PageContent } from '@/types';
import { getTranslations } from '@/lib/i18n';
import { Reveal } from '@/components/public/Reveal';

interface AboutPreviewProps {
  locale: Locale;
  content: PageContent[];
}

export function AboutPreview({ locale, content }: AboutPreviewProps) {
  const t = getTranslations(locale);
  
  const intro = content.find(c => c.section_key === 'intro');
  const introText = intro ? (locale === 'ar' ? intro.content_ar : intro.content_en) : null;

  return (
    <section className="py-20 md:py-32 bg-surface">
      <Reveal className="container-portfolio" stagger staggerStep={120}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4">
            <p className="text-label text-subtle mb-3">004</p>
            <h2 className="heading-section text-foreground">{t.about.heading}</h2>
          </div>
          
          <div className="md:col-span-7 md:col-start-6">
            {introText ? (
              <div className="prose-portfolio">
                <p className="text-body text-muted leading-relaxed">
                  {introText}
                </p>
              </div>
            ) : (
              <p className="text-body text-subtle italic">
                {t.about.noContent}
              </p>
            )}
            
            <Link
              href={`/${locale}/about`}
              className="arrow-link group inline-flex items-center gap-3 text-foreground hover:text-accent transition-colors focus-ring mt-8"
            >
              <span className="text-small tracking-wider uppercase arrow-underline">
                {locale === 'en' ? 'Read More' : 'اقرأ المزيد'}
              </span>
              <svg 
                width="24" height="12" viewBox="0 0 24 12" fill="none"
                className="arrow-icon rtl:rotate-180"
                aria-hidden="true"
              >
                <path d="M0 6H22M22 6L17 1M22 6L17 11" stroke="currentColor" strokeWidth="1" />
              </svg>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
