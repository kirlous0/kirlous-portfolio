export type Locale = 'en' | 'ar';

export type ProjectState = 'completed' | 'in_progress' | 'experiment';

export interface ProjectImage {
  url: string;
  alt_en?: string;
  alt_ar?: string;
  caption_en?: string;
  caption_ar?: string;
}

export interface Project {
  id: string;
  title_en: string;
  title_ar: string;
  slug: string;
  summary_en: string | null;
  summary_ar: string | null;
  category: string | null;
  technologies: string[];
  state: ProjectState;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  overview_en: string | null;
  overview_ar: string | null;
  problem_en: string | null;
  problem_ar: string | null;
  solution_en: string | null;
  solution_ar: string | null;
  technical_en: string | null;
  technical_ar: string | null;
  challenges_en: string | null;
  challenges_ar: string | null;
  outcome_en: string | null;
  outcome_ar: string | null;
  live_url: string | null;
  source_url: string | null;
  cover_image_url: string | null;
  cover_image_alt_en: string | null;
  cover_image_alt_ar: string | null;
  gallery_images: ProjectImage[];
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title_en: string;
  title_ar: string;
  description_en: string | null;
  description_ar: string | null;
  scope_en: string | null;
  scope_ar: string | null;
  display_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  email: string | null;
  whatsapp: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  other_urls: Record<string, string>;
  cv_url: string | null;
  site_title_en: string;
  site_title_ar: string;
  site_description_en: string | null;
  site_description_ar: string | null;
  github_username: string | null;
  updated_at: string;
}

export interface PageContent {
  id: string;
  page_key: string;
  section_key: string;
  content_en: string | null;
  content_ar: string | null;
  updated_at: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ContactInquiry {
  name: string;
  email: string;
  projectType: string;
  description: string;
  budget?: string;
  timeline?: string;
  preferredLanguage: Locale;
}
