-- Kirous Wael Portfolio - Supabase Database Schema
-- Run this in the Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title_en TEXT NOT NULL DEFAULT '',
  title_ar TEXT NOT NULL DEFAULT '',
  slug TEXT NOT NULL UNIQUE,
  summary_en TEXT,
  summary_ar TEXT,
  category TEXT,
  technologies TEXT[] DEFAULT '{}',
  state TEXT NOT NULL DEFAULT 'in_progress' CHECK (state IN ('completed', 'in_progress', 'experiment')),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  overview_en TEXT,
  overview_ar TEXT,
  problem_en TEXT,
  problem_ar TEXT,
  solution_en TEXT,
  solution_ar TEXT,
  technical_en TEXT,
  technical_ar TEXT,
  challenges_en TEXT,
  challenges_ar TEXT,
  outcome_en TEXT,
  outcome_ar TEXT,
  live_url TEXT,
  source_url TEXT,
  cover_image_url TEXT,
  cover_image_alt_en TEXT,
  cover_image_alt_ar TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title_en TEXT NOT NULL DEFAULT '',
  title_ar TEXT NOT NULL DEFAULT '',
  description_en TEXT,
  description_ar TEXT,
  scope_en TEXT,
  scope_ar TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site settings (single row)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT,
  whatsapp TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  other_urls JSONB DEFAULT '{}',
  cv_url TEXT,
  site_title_en TEXT NOT NULL DEFAULT 'Kirlous Wael — Web Developer',
  site_title_ar TEXT NOT NULL DEFAULT 'كيرلس وائل — مطور ويب',
  site_description_en TEXT,
  site_description_ar TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Page content (key-value per page section)
CREATE TABLE IF NOT EXISTS page_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  page_key TEXT NOT NULL,
  section_key TEXT NOT NULL,
  content_en TEXT,
  content_ar TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page_key, section_key)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(is_published);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(display_order);
CREATE INDEX IF NOT EXISTS idx_services_visible ON services(is_visible);
CREATE INDEX IF NOT EXISTS idx_services_order ON services(display_order);
CREATE INDEX IF NOT EXISTS idx_page_content_page ON page_content(page_key);
CREATE INDEX IF NOT EXISTS idx_page_content_lookup ON page_content(page_key, section_key);

-- Insert default site settings
INSERT INTO site_settings (site_title_en, site_title_ar)
VALUES ('Kirlous Wael — Web Developer', 'كيرلس وائل — مطور ويب')
ON CONFLICT DO NOTHING;

-- Insert default service entries
INSERT INTO services (title_en, title_ar, display_order, is_visible)
VALUES 
  ('Frontend Development', 'تطوير الواجهة الأمامية', 1, true),
  ('Backend Development', 'تطوير الخلفية', 2, true),
  ('APIs & Integrations', 'واجهات البرمجة والتكاملات', 3, true),
  ('Full-Stack Web Applications', 'تطبيقات ويب متكاملة', 4, true)
ON CONFLICT DO NOTHING;

-- Insert default page content sections
INSERT INTO page_content (page_key, section_key, content_en, content_ar)
VALUES
  ('home', 'hero_headline', 'I BUILD DIGITAL PRODUCTS.', 'أبني منتجات رقمية.'),
  ('home', 'hero_intro', 'I''m a web developer focused on building thoughtful, functional, and reliable digital experiences — from frontend interfaces to backend systems.', 'مطور ويب أركز على بناء تجارب رقمية مدروسة وعملية وموثوقة — من واجهات المستخدم إلى أنظمة الخلفية.'),
  ('home', 'hero_metadata', 'INDEPENDENT WEB DEVELOPER · EGYPT / WORLDWIDE', 'مطور ويب مستقل · مصر / حول العالم'),
  ('home', 'cta_heading', 'HAVE A PROJECT IN MIND?', 'لديك مشروع في ذهنك؟'),
  ('home', 'cta_subheading', 'Tell me what you''re building, what you need, and what success looks like.', 'أخبرني عما تبنيه، وما تحتاجه، وما يعنيه النجاح بالنسبة لك.'),
  ('home', 'cta_action', 'Start a Conversation', 'ابدأ محادثة'),
  ('about', 'heading', 'About', 'عنّي'),
  ('about', 'intro', NULL, NULL),
  ('about', 'bio', NULL, NULL),
  ('about', 'focus_areas', NULL, NULL),
  ('about', 'principles', NULL, NULL)
ON CONFLICT (page_key, section_key) DO NOTHING;

-- Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;

-- Public read policies (published content only for projects/services)
CREATE POLICY "Public can read published projects" ON projects
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public can read visible services" ON services
  FOR SELECT USING (is_visible = true);

CREATE POLICY "Public can read site settings" ON site_settings
  FOR SELECT USING (true);

CREATE POLICY "Public can read page content" ON page_content
  FOR SELECT USING (true);

-- Authenticated admin policies (full access for authenticated users)
-- These assume admin check is done at application level
CREATE POLICY "Authenticated can manage projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can manage services" ON services
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can manage settings" ON site_settings
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can manage page content" ON page_content
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
