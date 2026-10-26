import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout } from '@/components/public/PublicLayout';
import { getPublishedProjects } from '@/lib/data';
import { getTranslations } from '@/lib/i18n';
import { getProjectStateLabel, formatDate } from '@/lib/utils';
import type { Locale } from '@/types';

interface WorkPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as Locale);
  return {
    title: `${t.work.heading} — Kirlous Wael`,
    description: locale === 'ar' ? 'أعمال ومشاريع مختارة' : 'Selected work and projects',
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { locale } = await params;
  
  if (locale !== 'en' && locale !== 'ar') {
    notFound();
  }

  const t = getTranslations(locale as Locale);
  const projects = await getPublishedProjects();

  return (
    <PublicLayout locale={locale as Locale}>
      <section className="py-16 md:py-24">
        <div className="container-portfolio">
          {/* Header */}
          <div className="mb-16 md:mb-24">
            <p className="text-label text-subtle mb-4">{t.hero.metadata}</p>
            <h1 className="heading-display text-foreground">
              {t.work.heading}
            </h1>
          </div>

          {/* Projects */}
          {projects.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-body text-muted mb-4">{t.work.noProjects}</p>
              <p className="text-small text-subtle">{t.work.noProjectsDesc}</p>
            </div>
          ) : (
            <div className="space-y-0">
              {projects.map((project, index) => {
                const title = locale === 'ar' && project.title_ar ? project.title_ar : project.title_en;
                const summary = locale === 'ar' && project.summary_ar ? project.summary_ar : project.summary_en;
                const altText = locale === 'ar' ? project.cover_image_alt_ar : project.cover_image_alt_en;

                return (
                  <Link
                    key={project.id}
                    href={`/${locale}/work/${project.slug}`}
                    className="group block border-t border-border py-8 md:py-12 hover:bg-surface/50 transition-colors focus-ring"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                      <div className="md:col-span-1">
                        <span className="text-label text-subtle">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <div className="md:col-span-3">
                        {project.cover_image_url ? (
                          <div className="aspect-[4/3] bg-surface overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={project.cover_image_url}
                              alt={altText || title}
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className="aspect-[4/3] bg-surface border border-border flex items-center justify-center">
                            <span className="text-label text-subtle">{project.category || '—'}</span>
                          </div>
                        )}
                      </div>

                      <div className="md:col-span-5">
                        <h2 className="text-xl md:text-2xl text-foreground font-medium mb-3 group-hover:text-accent transition-colors">
                          {title}
                        </h2>
                        {summary && (
                          <p className="text-small text-muted line-clamp-2">
                            {summary}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-3 md:text-end space-y-2">
                        {project.category && (
                          <p className="text-label text-subtle">{project.category}</p>
                        )}
                        <p className="text-label text-subtle">
                          {getProjectStateLabel(project.state, locale as Locale)}
                        </p>
                        {project.completed_at && (
                          <p className="text-label text-subtle">
                            {formatDate(project.completed_at, locale as Locale)}
                          </p>
                        )}
                        {project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 md:justify-end mt-3">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span key={tech} className="text-label text-subtle border border-border px-2 py-1">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
              <div className="border-t border-border" />
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
