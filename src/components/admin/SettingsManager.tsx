'use client';

import { useState, type FormEvent } from 'react';
import type { SiteSettings } from '@/types';
import { isValidUrl } from '@/lib/utils';

interface SettingsManagerProps {
  settings: SiteSettings | null;
}

export function SettingsManager({ settings }: SettingsManagerProps) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    email: settings?.email || '',
    whatsapp: settings?.whatsapp || '',
    github_url: settings?.github_url || '',
    linkedin_url: settings?.linkedin_url || '',
    cv_url: settings?.cv_url || '',
    site_title_en: settings?.site_title_en || 'Kirlous Wael — Web Developer',
    site_title_ar: settings?.site_title_ar || 'كيرلس وائل — مطور ويب',
    site_description_en: settings?.site_description_en || '',
    site_description_ar: settings?.site_description_ar || '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      // Validate URLs
      const urlFields = ['github_url', 'linkedin_url', 'cv_url'] as const;
      for (const field of urlFields) {
        if (formData[field] && !isValidUrl(formData[field])) {
          throw new Error(`Invalid URL for ${field.replace('_', ' ')}`);
        }
      }

      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          email: formData.email || null,
          whatsapp: formData.whatsapp || null,
          github_url: formData.github_url || null,
          linkedin_url: formData.linkedin_url || null,
          cv_url: formData.cv_url || null,
          site_description_en: formData.site_description_en || null,
          site_description_ar: formData.site_description_ar || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      setSuccess('Settings saved successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-3xl font-medium text-foreground mb-2">Settings</h1>
        <p className="text-small text-muted">Configure your site settings and contact information</p>
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

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Contact Information */}
        <div className="border border-border p-6 md:p-8">
          <h2 className="text-xl font-medium text-foreground mb-6">Contact Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-label text-subtle block mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your@email.com"
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
              />
            </div>
            <div>
              <label className="text-label text-subtle block mb-2">WhatsApp Number</label>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                placeholder="+20 123 456 7890"
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
              />
              <p className="text-xs text-subtle mt-1">Include country code</p>
            </div>
          </div>
        </div>

        {/* Social & Professional Links */}
        <div className="border border-border p-6 md:p-8">
          <h2 className="text-xl font-medium text-foreground mb-6">Social & Professional Links</h2>
          
          <div className="space-y-6">
            <div>
              <label className="text-label text-subtle block mb-2">GitHub URL</label>
              <input
                type="url"
                value={formData.github_url}
                onChange={(e) => setFormData(prev => ({ ...prev, github_url: e.target.value }))}
                placeholder="https://github.com/..."
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
              />
            </div>
            <div>
              <label className="text-label text-subtle block mb-2">LinkedIn URL</label>
              <input
                type="url"
                value={formData.linkedin_url}
                onChange={(e) => setFormData(prev => ({ ...prev, linkedin_url: e.target.value }))}
                placeholder="https://linkedin.com/in/..."
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
              />
            </div>
            <div>
              <label className="text-label text-subtle block mb-2">CV / Résumé URL</label>
              <input
                type="url"
                value={formData.cv_url}
                onChange={(e) => setFormData(prev => ({ ...prev, cv_url: e.target.value }))}
                placeholder="https://..."
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
              />
            </div>
          </div>
        </div>

        {/* Site Metadata */}
        <div className="border border-border p-6 md:p-8">
          <h2 className="text-xl font-medium text-foreground mb-6">Site Metadata</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-label text-subtle block mb-2">Site Title (English)</label>
              <input
                type="text"
                value={formData.site_title_en}
                onChange={(e) => setFormData(prev => ({ ...prev, site_title_en: e.target.value }))}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
              />
            </div>
            <div dir="rtl">
              <label className="text-label text-subtle block mb-2">عنوان الموقع (عربي)</label>
              <input
                type="text"
                value={formData.site_title_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, site_title_ar: e.target.value }))}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
              />
            </div>
            <div>
              <label className="text-label text-subtle block mb-2">Site Description (English)</label>
              <textarea
                value={formData.site_description_en}
                onChange={(e) => setFormData(prev => ({ ...prev, site_description_en: e.target.value }))}
                rows={3}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent resize-y"
              />
            </div>
            <div dir="rtl">
              <label className="text-label text-subtle block mb-2">وصف الموقع (عربي)</label>
              <textarea
                value={formData.site_description_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, site_description_ar: e.target.value }))}
                rows={3}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent resize-y"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="text-background bg-foreground px-6 py-3 hover:bg-accent transition-colors focus-ring disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
