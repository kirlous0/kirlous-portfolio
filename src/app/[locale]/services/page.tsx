import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout } from '@/components/public/PublicLayout';
import { getVisibleServices } from '@/lib/data';
import { getTranslations } from '@/lib/i18n';
import type { Locale } from '@/types';

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  return {
    title: `${t.services.heading} — Kirlous Wael`,
    description: locale === 'ar' ? 'خدمات تطوير الويب' : 'Web development services',
  };
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  
  if (locale !== 'en' && locale !== 'ar') {
    notFound();
  }

  const t = getTranslations(locale as Locale);
  const services = await getVisibleServices();

  return (
    <PublicLayout locale={locale as Locale}>
      <section className="py-16 md:py-24">
        <div className="container-portfolio">
          {/* Header */}
          <div className="mb-16 md:mb-24">
            <p className="text-label text-subtle mb-4">{t.hero.metadata}</p>
            <h1 className="heading-display text-foreground mb-6">
              {t.services.heading}
            </h1>
            <p className="text-body text-muted max-w-2xl">
              {t.services.subheading}
            </p>
          </div>

          {/* Services */}
          {services.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-body text-muted">{t.services.noServices}</p>
            </div>
          ) : (
            <div className="space-y-0">
              {services.map((service, index) => {
                const title = locale === 'ar' && service.title_ar ? service.title_ar : service.title_en;
                const description = locale === 'ar' && service.description_ar ? service.description_ar : service.description_en;
                const scope = locale === 'ar' && service.scope_ar ? service.scope_ar : service.scope_en;

                return (
                  <div
                    key={service.id}
                    className="border-t border-border py-12 md:py-16"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                      <div className="md:col-span-1">
                        <span className="text-label text-subtle">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <div className="md:col-span-4">
                        <h2 className="text-2xl md:text-3xl text-foreground font-medium">
                          {title}
                        </h2>
                      </div>

                      <div className="md:col-span-5">
                        {description && (
                          <p className="text-body text-muted leading-relaxed mb-6">
                            {description}
                          </p>
                        )}
                        
                        {scope && (
                          <div className="mt-6">
                            <p className="text-label text-subtle mb-3">{t.services.scope}</p>
                            <div className="text-small text-muted whitespace-pre-line">{scope}</div>
                          </div>
                        )}
                      </div>

                      <div className="md:col-span-2 md:text-end">
                        <Link
                          href={`/${locale}/contact`}
                          className="inline-flex items-center gap-2 text-small text-muted hover:text-foreground transition-colors focus-ring"
                        >
                          {t.services.requestQuote}
                          <svg 
                            width="16" height="8" viewBox="0 0 16 8" fill="none"
                            className="rtl:rotate-180"
                          >
                            <path d="M0 4H14M14 4L10 0.5M14 4L10 7.5" stroke="currentColor" strokeWidth="1" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="border-t border-border" />
            </div>
          )}

          {/* CTA */}
          <div className="mt-20 md:mt-32 text-center">
            <h2 className="heading-subsection text-foreground mb-6">
              {t.cta.heading}
            </h2>
            <p className="text-body text-muted mb-8 max-w-2xl mx-auto">
              {t.cta.subheading}
            </p>
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
