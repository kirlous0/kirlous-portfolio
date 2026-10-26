'use client';

import { useState, type FormEvent } from 'react';
import type { PageContent } from '@/types';

interface ContentManagerProps {
  homeContent: PageContent[];
  aboutContent: PageContent[];
}

type PageKey = 'home' | 'about';

export function ContentManager({ homeContent, aboutContent }: ContentManagerProps) {
  const [activePage, setActivePage] = useState<PageKey>('home');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [homeFields, setHomeFields] = useState(() => {
    const fields: Record<string, { en: string; ar: string }> = {};
    homeContent.forEach(c => {
      fields[c.section_key] = { en: c.content_en || '', ar: c.content_ar || '' };
    });
    return fields;
  });

  const [aboutFields, setAboutFields] = useState(() => {
    const fields: Record<string, { en: string; ar: string }> = {};
    aboutContent.forEach(c => {
      fields[c.section_key] = { en: c.content_en || '', ar: c.content_ar || '' };
    });
    return fields;
  });

  const homeSections = [
    { key: 'hero_headline', label: 'Hero Headline', textarea: false },
    { key: 'hero_intro', label: 'Hero Introduction', textarea: true },
    { key: 'hero_metadata', label: 'Hero Metadata Label', textarea: false },
    { key: 'cta_heading', label: 'CTA Heading', textarea: false },
    { key: 'cta_subheading', label: 'CTA Subheading', textarea: true },
    { key: 'cta_action', label: 'CTA Button Text', textarea: false },
  ];

  const aboutSections = [
    { key: 'intro', label: 'Introduction', textarea: true },
    { key: 'bio', label: 'Biography', textarea: true },
    { key: 'focus_areas', label: 'Technical Focus Areas', textarea: true },
    { key: 'principles', label: 'Working Principles', textarea: true },
  ];

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const fields = activePage === 'home' ? homeFields : aboutFields;
      const sections = activePage === 'home' ? homeSections : aboutSections;
      
      for (const section of sections) {
        const field = fields[section.key];
        if (!field) continue;

        const response = await fetch('/api/admin/content', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page_key: activePage,
            section_key: section.key,
            content_en: field.en || null,
            content_ar: field.ar || null,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to save ${section.label}`);
        }
      }

      setSuccess('Content saved successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (key: string, lang: 'en' | 'ar', value: string) => {
    if (activePage === 'home') {
      setHomeFields(prev => ({
        ...prev,
        [key]: { ...prev[key], [lang]: value },
      }));
    } else {
      setAboutFields(prev => ({
        ...prev,
        [key]: { ...prev[key], [lang]: value },
      }));
    }
  };

  const sections = activePage === 'home' ? homeSections : aboutSections;
  const fields = activePage === 'home' ? homeFields : aboutFields;

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-3xl font-medium text-foreground mb-2">Content</h1>
        <p className="text-small text-muted">Manage your website content in English and Arabic</p>
      </div>

      {/* Page Tabs */}
      <div className="flex gap-2 mb-8 border-b border-border pb-4">
        <button
          onClick={() => setActivePage('home')}
          className={`px-4 py-2 text-small transition-colors focus-ring ${
            activePage === 'home' ? 'text-foreground bg-surface' : 'text-muted hover:text-foreground'
          }`}
        >
          Home Page
        </button>
        <button
          onClick={() => setActivePage('about')}
          className={`px-4 py-2 text-small transition-colors focus-ring ${
            activePage === 'about' ? 'text-foreground bg-surface' : 'text-muted hover:text-foreground'
          }`}
        >
          About Page
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 border border-error/30 bg-error/10">
          <p className="text-small text-error">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 border border-success/30 bg-success/10">
          <p className="text-small text-success">{success}</p>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {sections.map((section) => {
          const field = fields[section.key] || { en: '', ar: '' };
          const InputComponent = section.textarea ? 'textarea' : 'input';
          const rows = section.textarea ? 4 : undefined;

          return (
            <div key={section.key} className="border border-border p-6">
              <h3 className="text-label text-subtle mb-4">{section.label}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-muted block mb-2">English</label>
                  <InputComponent
                    value={field.en}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => updateField(section.key, 'en', e.target.value)}
                    className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent resize-y"
                    {...(rows ? { rows } : {})}
                  />
                </div>
                <div dir="rtl">
                  <label className="text-xs text-muted block mb-2">عربي</label>
                  <InputComponent
                    value={field.ar}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => updateField(section.key, 'ar', e.target.value)}
                    className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent resize-y"
                    {...(rows ? { rows } : {})}
                  />
                </div>
              </div>
            </div>
          );
        })}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="text-background bg-foreground px-6 py-3 hover:bg-accent transition-colors focus-ring disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Content'}
          </button>
        </div>
      </form>
    </div>
  );
}
