import type { MetadataRoute } from 'next';
import { getPublishedProjects } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kirlous-portfolio-ten.vercel.app';
  
  const staticPages = [
    '', '/work', '/services', '/about', '/contact'
  ];

  const locales = ['en', 'ar'] as const;

  const staticEntries: MetadataRoute.Sitemap = locales.flatMap(locale =>
    staticPages.map(page => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: page === '' ? 1 : 0.8,
    }))
  );

  // Get published projects for dynamic entries
  const projects = await getPublishedProjects();
  const projectEntries: MetadataRoute.Sitemap = locales.flatMap(locale =>
    projects.map(project => ({
      url: `${baseUrl}/${locale}/work/${project.slug}`,
      lastModified: new Date(project.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  return [...staticEntries, ...projectEntries];
}
