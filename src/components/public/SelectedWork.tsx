import Link from 'next/link';
import type { Locale, Project } from '@/types';
import { getTranslations } from '@/lib/i18n';
import { getProjectStateLabel, formatDate } from '@/lib/utils';
import { Reveal } from '@/components/public/Reveal';

interface SelectedWorkProps {
  locale: Locale;
  projects: Project[];
}

export function SelectedWork({ locale, projects }: SelectedWorkProps) {
  const t = getTranslations(locale);

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-32">
      <Reveal className="container-portfolio">
        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-12 md:mb-20">
          <div>
            <p className="text-label text-subtle mb-3">001</p>
            <h2 className="heading-section text-foreground">
              {locale === 'en' ? 'Selected Work' : 'أعمال مختارة'}
            </h2>
          </div>
          <Link
            href={`/${locale}/work`}
            className="arrow-link arrow-underline group text-small text-muted hover:text-foreground transition-colors focus-ring hidden md:inline-flex items-center gap-2"
          >
            {t.common.viewAll}
            <svg 
              width="16" height="8" viewBox="0 0 16 8" fill="none"
              className="arrow-icon rtl:rotate-180"
              aria-hidden="true"
            >
              <path d="M0 4H14M14 4L10 0.5M14 4L10 7.5" stroke="currentColor" strokeWidth="1" />
            </svg>
          </Link>
        </div>

        {/* Project List */}
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
                  {/* Index */}
                  <div className="md:col-span-1">
                    <span className="text-label text-subtle">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Image or Placeholder */}
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
                        <span className="text-label text-subtle">{project.category || 'Project'}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="md:col-span-5">
                    <h3 className="heading-subsection text-foreground mb-3 group-hover:text-accent transition-colors">
                      {title}
                    </h3>
                    {summary && (
                      <p className="text-small text-muted line-clamp-3">
                        {summary}
                      </p>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="md:col-span-3 md:text-end space-y-2">
                    {project.category && (
                      <p className="text-label text-subtle">{project.category}</p>
                    )}
                    <p className="text-label text-subtle">
                      {getProjectStateLabel(project.state, locale)}
                    </p>
                    {project.completed_at && (
                      <p className="text-label text-subtle">
                        {formatDate(project.completed_at, locale)}
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

        {/* Mobile View All */}
        <div className="mt-12 md:hidden">
          <Link
            href={`/${locale}/work`}
            className="arrow-link group inline-flex items-center gap-2 text-small text-muted hover:text-foreground transition-colors focus-ring"
          >
            <span className="arrow-underline">{t.common.viewAll}</span>
            <svg 
              width="16" height="8" viewBox="0 0 16 8" fill="none"
              className="arrow-icon rtl:rotate-180"
              aria-hidden="true"
            >
              <path d="M0 4H14M14 4L10 0.5M14 4L10 7.5" stroke="currentColor" strokeWidth="1" />
            </svg>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
