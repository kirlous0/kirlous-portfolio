import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout } from '@/components/public/PublicLayout';
import { getPageContent, getSiteSettings } from '@/lib/data';
import { getTranslations } from '@/lib/i18n';
import { isValidUrl } from '@/lib/utils';
import type { Locale } from '@/types';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  return {
    title: `${t.about.heading} — Kirlous Wael`,
    description: locale === 'ar' ? 'عن كيرلس وائل' : 'About Kirlous Wael',
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  
  if (locale !== 'en' && locale !== 'ar') {
    notFound();
  }

  const t = getTranslations(locale as Locale);
  const [aboutContent, settings] = await Promise.all([
    getPageContent('about'),
    getSiteSettings(),
  ]);

  const getContent = (key: string) => {
    const item = aboutContent.find(c => c.section_key === key);
    if (!item) return null;
    return locale === 'ar' ? item.content_ar : item.content_en;
  };

  const intro = getContent('intro');
  const bio = getContent('bio');
  const focusAreas = getContent('focus_areas');
  const principles = getContent('principles');
  const hasAnyContent = intro || bio || focusAreas || principles;

  return (
    <PublicLayout locale={locale as Locale}>
      <section className="py-16 md:py-24">
        <div className="container-portfolio">
          {/* Header */}
          <div className="mb-16 md:mb-24">
            <p className="text-label text-subtle mb-4">{t.hero.metadata}</p>
            <h1 className="heading-display text-foreground">
              {t.about.heading}
            </h1>
          </div>

          {!hasAnyContent ? (
            <div className="py-20 text-center">
              <p className="text-body text-muted">{t.about.noContent}</p>
            </div>
          ) : (
            <div className="space-y-20 md:space-y-32">
              {/* Introduction */}
              {intro && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                  <div className="md:col-span-4">
                    <p className="text-label text-subtle">
                      {locale === 'en' ? 'Introduction' : 'مقدمة'}
                    </p>
                  </div>
                  <div className="md:col-span-7 md:col-start-6">
                    <p className="text-body text-muted leading-relaxed prose-portfolio whitespace-pre-line">
                      {intro}
                    </p>
                  </div>
                </div>
              )}

              {/* Biography */}
              {bio && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 border-t border-border pt-16 md:pt-24">
                  <div className="md:col-span-4">
                    <p className="text-label text-subtle">
                      {locale === 'en' ? 'Background' : 'الخلفية'}
                    </p>
                  </div>
                  <div className="md:col-span-7 md:col-start-6">
                    <div className="prose-portfolio text-body text-muted whitespace-pre-line">
                      {bio}
                    </div>
                  </div>
                </div>
              )}

              {/* Focus Areas */}
              {focusAreas && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 border-t border-border pt-16 md:pt-24">
                  <div className="md:col-span-4">
                    <p className="text-label text-subtle">{t.about.focusAreas}</p>
                  </div>
                  <div className="md:col-span-7 md:col-start-6">
                    <div className="prose-portfolio text-body text-muted whitespace-pre-line">
                      {focusAreas}
                    </div>
                  </div>
                </div>
              )}

              {/* Principles */}
              {principles && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 border-t border-border pt-16 md:pt-24">
                  <div className="md:col-span-4">
                    <p className="text-label text-subtle">{t.about.principles}</p>
                  </div>
                  <div className="md:col-span-7 md:col-start-6">
                    <div className="prose-portfolio text-body text-muted whitespace-pre-line">
                      {principles}
                    </div>
                  </div>
                </div>
              )}

              {/* CV Download */}
              {settings?.cv_url && isValidUrl(settings.cv_url) && (
                <div className="border-t border-border pt-16 md:pt-24">
                  <a
                    href={settings.cv_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-foreground hover:text-accent transition-colors focus-ring"
                  >
                    <span className="text-small tracking-wider uppercase">{t.about.downloadCv}</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3.5 3H9V8.5" stroke="currentColor" strokeWidth="1" />
                      <path d="M9 3L3 9" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          )}

          {/* CTA */}
          <div className="mt-20 md:mt-32 border-t border-border pt-16 md:pt-24 text-center">
            <h2 className="heading-subsection text-foreground mb-6">
              {t.cta.heading}
            </h2>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-3 text-background bg-foreground px-8 py-4 hover:bg-accent transition-colors focus-ring"
            >
              <span className="text-small tracking-wider uppercase">{t.cta.action}</span>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
