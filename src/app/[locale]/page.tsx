import { notFound } from 'next/navigation';
import { PublicLayout } from '@/components/public/PublicLayout';
import { Hero } from '@/components/public/Hero';
import { SelectedWork } from '@/components/public/SelectedWork';
import { Capabilities } from '@/components/public/Capabilities';
import { Approach } from '@/components/public/Approach';
import { AboutPreview } from '@/components/public/AboutPreview';
import { CallToAction } from '@/components/public/CallToAction';
import { getFeaturedProjects, getVisibleServices, getPageContent } from '@/lib/data';
import type { Locale } from '@/types';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  
  if (locale !== 'en' && locale !== 'ar') {
    notFound();
  }

  const [projects, services, homeContent, aboutContent] = await Promise.all([
    getFeaturedProjects(),
    getVisibleServices(),
    getPageContent('home'),
    getPageContent('about'),
  ]);

  return (
    <PublicLayout locale={locale as Locale}>
      <Hero locale={locale as Locale} content={homeContent} />
      <SelectedWork locale={locale as Locale} projects={projects} />
      <Capabilities locale={locale as Locale} services={services} />
      <Approach locale={locale as Locale} />
      <AboutPreview locale={locale as Locale} content={aboutContent} />
      <CallToAction locale={locale as Locale} content={homeContent} />
    </PublicLayout>
  );
}
