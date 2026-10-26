import Link from 'next/link';
import type { Locale, PageContent } from '@/types';
import { getTranslations } from '@/lib/i18n';

interface HeroProps {
  locale: Locale;
  content: PageContent[];
}

export function Hero({ locale, content }: HeroProps) {
  const t = getTranslations(locale);
  
  // Get content from DB or fall back to translations
  const getContent = (key: string, fallback: string) => {
    const item = content.find(c => c.section_key === key);
    if (!item) return fallback;
    const val = locale === 'ar' ? item.content_ar : item.content_en;
    return val || fallback;
  };

  const metadata = getContent('hero_metadata', t.hero.metadata);
  const headline = getContent('hero_headline', t.hero.headline);
  const intro = getContent('hero_intro', t.hero.intro);

  return (
    <section className="hero-reveal min-h-[90vh] flex flex-col justify-center pt-24 md:pt-32 pb-16 md:pb-24 relative">
      {/* Ambient dot grid — pure CSS, opacity 0.04, static */}
      <div className="ambient-grid" aria-hidden="true" />

      <div className="container-portfolio relative">
        {/* Metadata Label — stagger item 1 */}
        <p
          className="text-label text-subtle mb-8 md:mb-12 tracking-widest"
          style={{ '--hero-delay': '0ms' } as React.CSSProperties}
        >
          {metadata}
        </p>

        {/*
         * Headline — NO animation.
         * This is the likely LCP element; it renders immediately
         * at full opacity and position. Not wrapped in hero-reveal.
         */}
        <h1 className="heading-display text-foreground mb-8 md:mb-12 max-w-[90vw] md:max-w-[80vw]">
          {headline}
        </h1>

        {/* Introduction + Actions Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mt-4 md:mt-8">
          {/* Intro paragraph — stagger item 2 */}
          <div
            className="md:col-span-6 lg:col-span-5"
            style={{ '--hero-delay': '200ms' } as React.CSSProperties}
          >
            <p className="text-body text-muted leading-relaxed prose-portfolio">
              {intro}
            </p>
          </div>
          
          {/* CTAs — stagger items 3 & 4 */}
          <div className="md:col-span-6 lg:col-span-4 md:col-start-8 flex flex-col gap-4 md:items-start md:justify-end">
            <Link
              href={`/${locale}/work`}
              className="arrow-link group inline-flex items-center gap-3 text-foreground hover:text-accent transition-colors focus-ring py-2"
              style={{ '--hero-delay': '300ms' } as React.CSSProperties}
            >
              <span className="text-small tracking-wider uppercase arrow-underline">
                {t.hero.exploreWork}
              </span>
              <svg 
                width="24" height="12" viewBox="0 0 24 12" fill="none" 
                className="arrow-icon rtl:rotate-180"
                aria-hidden="true"
              >
                <path d="M0 6H22M22 6L17 1M22 6L17 11" stroke="currentColor" strokeWidth="1" />
              </svg>
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="arrow-link group inline-flex items-center gap-3 text-muted hover:text-foreground transition-colors focus-ring py-2"
              style={{ '--hero-delay': '400ms' } as React.CSSProperties}
            >
              <span className="text-small tracking-wider uppercase arrow-underline">
                {t.hero.startProject}
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

        {/* Decorative bottom line */}
        <div className="mt-20 md:mt-32 border-b border-border" />
      </div>
    </section>
  );
}
