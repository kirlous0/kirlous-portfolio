import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout } from '@/components/public/PublicLayout';
import { getProjectBySlug, getPublishedProjects } from '@/lib/data';
import { getTranslations } from '@/lib/i18n';
import { getProjectStateLabel, formatDate, isValidUrl } from '@/lib/utils';
import type { Locale } from '@/types';

interface ProjectDetailProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: ProjectDetailProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug);
  
  if (!project) {
    return { title: 'Project Not Found' };
  }

  const title = locale === 'ar' && project.title_ar ? project.title_ar : project.title_en;
  const description = locale === 'ar' ? project.summary_ar : project.summary_en;

  return {
    title: `${title} — Kirlous Wael`,
    description: description || undefined,
    openGraph: {
      title: `${title} — Kirlous Wael`,
      description: description || undefined,
      images: project.cover_image_url ? [{ url: project.cover_image_url }] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { locale, slug } = await params;
  
  if (locale !== 'en' && locale !== 'ar') {
    notFound();
  }

  const t = getTranslations(locale as Locale);
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const title = locale === 'ar' && project.title_ar ? project.title_ar : project.title_en;
  const summary = locale === 'ar' && project.summary_ar ? project.summary_ar : project.summary_en;
  const overview = locale === 'ar' ? project.overview_ar : project.overview_en;
  const problem = locale === 'ar' ? project.problem_ar : project.problem_en;
  const solution = locale === 'ar' ? project.solution_ar : project.solution_en;
  const technical = locale === 'ar' ? project.technical_ar : project.technical_en;
  const challenges = locale === 'ar' ? project.challenges_ar : project.challenges_en;
  const outcome = locale === 'ar' ? project.outcome_ar : project.outcome_en;
  const altText = locale === 'ar' ? project.cover_image_alt_ar : project.cover_image_alt_en;

  // Get related projects for navigation
  const allProjects = await getPublishedProjects();
  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;

  return (
    <PublicLayout locale={locale as Locale}>
      <article className="py-16 md:py-24">
        <div className="container-portfolio">
          {/* Back link */}
          <Link
            href={`/${locale}/work`}
            className="group inline-flex items-center gap-2 text-small text-muted hover:text-foreground transition-colors focus-ring mb-12"
          >
            <svg 
              width="16" height="8" viewBox="0 0 16 8" fill="none"
              className="transition-transform group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1"
            >
              <path d="M16 4H2M2 4L6 0.5M2 4L6 7.5" stroke="currentColor" strokeWidth="1" />
            </svg>
            {t.nav.work}
          </Link>

          {/* Header */}
          <div className="mb-12 md:mb-20">
            <div className="flex items-center gap-4 mb-6">
              {project.category && (
                <span className="text-label text-subtle">{project.category}</span>
              )}
              <span className="text-label text-subtle">·</span>
              <span className="text-label text-subtle">
                {getProjectStateLabel(project.state, locale as Locale)}
              </span>
              {project.completed_at && (
                <>
                  <span className="text-label text-subtle">·</span>
                  <span className="text-label text-subtle">
                    {formatDate(project.completed_at, locale as Locale)}
                  </span>
                </>
              )}
            </div>

            <h1 className="heading-display text-foreground mb-6">{title}</h1>
            
            {summary && (
              <p className="text-body text-muted max-w-3xl">{summary}</p>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              {project.live_url && isValidUrl(project.live_url) && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-small text-background bg-foreground px-6 py-3 hover:bg-accent transition-colors focus-ring"
                >
                  {t.work.livePreview}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3.5 3H9V8.5" stroke="currentColor" strokeWidth="1" />
                    <path d="M9 3L3 9" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </a>
              )}
              {project.source_url && isValidUrl(project.source_url) && (
                <a
                  href={project.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-small text-foreground border border-border px-6 py-3 hover:border-foreground transition-colors focus-ring"
                >
                  {t.work.sourceCode}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3.5 3H9V8.5" stroke="currentColor" strokeWidth="1" />
                    <path d="M9 3L3 9" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Cover Image */}
          {project.cover_image_url && (
            <div className="mb-16 md:mb-24">
              <div className="aspect-[16/9] bg-surface overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.cover_image_url}
                  alt={altText || title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Gallery Images */}
          {project.gallery_images && project.gallery_images.length > 0 && (
            <div className="mb-16 md:mb-24">
              <h2 className="text-2xl text-foreground font-medium mb-8">
                {locale === 'en' ? 'Project Gallery' : 'معرض الصور'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.gallery_images.map((image, index) => {
                  const imgAlt = locale === 'ar' ? image.alt_ar : image.alt_en;
                  const imgCaption = locale === 'ar' ? image.caption_ar : image.caption_en;
                  
                  return (
                    <figure key={index} className="space-y-3">
                      <div className="aspect-[4/3] bg-surface overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image.url}
                          alt={imgAlt || `${title} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {imgCaption && (
                        <figcaption className="text-small text-muted">
                          {imgCaption}
                        </figcaption>
                      )}
                    </figure>
                  );
                })}
              </div>
            </div>
          )}

          {/* Content Sections */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-8 md:col-start-3">
              <div className="prose-portfolio">
                {overview && (
                  <section className="mb-12">
                    <h2 className="text-2xl text-foreground font-medium mb-4">
                      {locale === 'en' ? 'Overview' : 'نظرة عامة'}
                    </h2>
                    <div className="text-body text-muted whitespace-pre-line">{overview}</div>
                  </section>
                )}

                {problem && (
                  <section className="mb-12">
                    <h2 className="text-2xl text-foreground font-medium mb-4">
                      {locale === 'en' ? 'Problem / Objective' : 'المشكلة / الهدف'}
                    </h2>
                    <div className="text-body text-muted whitespace-pre-line">{problem}</div>
                  </section>
                )}

                {solution && (
                  <section className="mb-12">
                    <h2 className="text-2xl text-foreground font-medium mb-4">
                      {locale === 'en' ? 'Solution' : 'الحل'}
                    </h2>
                    <div className="text-body text-muted whitespace-pre-line">{solution}</div>
                  </section>
                )}

                {technical && (
                  <section className="mb-12">
                    <h2 className="text-2xl text-foreground font-medium mb-4">
                      {locale === 'en' ? 'Technical Implementation' : 'التنفيذ التقني'}
                    </h2>
                    <div className="text-body text-muted whitespace-pre-line">{technical}</div>
                  </section>
                )}

                {challenges && (
                  <section className="mb-12">
                    <h2 className="text-2xl text-foreground font-medium mb-4">
                      {locale === 'en' ? 'Challenges & Trade-offs' : 'التحديات والمقايضات'}
                    </h2>
                    <div className="text-body text-muted whitespace-pre-line">{challenges}</div>
                  </section>
                )}

                {outcome && (
                  <section className="mb-12">
                    <h2 className="text-2xl text-foreground font-medium mb-4">
                      {locale === 'en' ? 'Outcome & Limitations' : 'النتيجة والقيود'}
                    </h2>
                    <div className="text-body text-muted whitespace-pre-line">{outcome}</div>
                  </section>
                )}

                {/* Technologies */}
                {project.technologies.length > 0 && (
                  <section className="mb-12">
                    <h2 className="text-2xl text-foreground font-medium mb-4">
                      {locale === 'en' ? 'Technology Stack' : 'المكدس التقني'}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="text-small text-muted border border-border px-3 py-1.5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>

          {/* Project Navigation */}
          <div className="mt-20 md:mt-32 border-t border-border pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {prevProject ? (
                <Link
                  href={`/${locale}/work/${prevProject.slug}`}
                  className="group focus-ring"
                >
                  <span className="text-label text-subtle block mb-2">
                    {locale === 'en' ? '← Previous' : '→ السابق'}
                  </span>
                  <span className="text-foreground group-hover:text-accent transition-colors">
                    {locale === 'ar' && prevProject.title_ar ? prevProject.title_ar : prevProject.title_en}
                  </span>
                </Link>
              ) : <div />}
              
              {nextProject && (
                <Link
                  href={`/${locale}/work/${nextProject.slug}`}
                  className="group focus-ring md:text-end"
                >
                  <span className="text-label text-subtle block mb-2">
                    {locale === 'en' ? 'Next →' : 'التالي ←'}
                  </span>
                  <span className="text-foreground group-hover:text-accent transition-colors">
                    {locale === 'ar' && nextProject.title_ar ? nextProject.title_ar : nextProject.title_en}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </article>
    </PublicLayout>
  );
}
