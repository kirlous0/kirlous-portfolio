import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PublicLayout } from '@/components/public/PublicLayout';
import { ContactForm } from '@/components/public/ContactForm';
import { getSiteSettings } from '@/lib/data';
import { getTranslations } from '@/lib/i18n';
import type { Locale } from '@/types';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  return {
    title: `${t.contact.heading} — Kirlous Wael`,
    description: locale === 'ar' ? 'ابدأ مشروعاً' : 'Start a project',
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  
  if (locale !== 'en' && locale !== 'ar') {
    notFound();
  }

  const t = getTranslations(locale as Locale);
  const settings = await getSiteSettings();

  return (
    <PublicLayout locale={locale as Locale}>
      <section className="py-16 md:py-24">
        <div className="container-portfolio">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            {/* Left Column */}
            <div className="md:col-span-5">
              <p className="text-label text-subtle mb-4">{t.hero.metadata}</p>
              <h1 className="heading-section text-foreground mb-6">
                {t.contact.heading}
              </h1>
              <p className="text-body text-muted leading-relaxed">
                {t.contact.subheading}
              </p>
            </div>

            {/* Right Column - Form */}
            <div className="md:col-span-7">
              <ContactForm locale={locale as Locale} settings={settings} />
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
