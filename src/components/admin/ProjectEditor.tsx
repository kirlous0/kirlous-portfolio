'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Project, ProjectState, SiteSettings, ProjectImage } from '@/types';
import { slugify } from '@/lib/utils';
import { cn } from '@/lib/cn';
import { GitHubIntegration } from './GitHubIntegration';
import { useToast } from '@/components/Toast';
import { ConfirmDialog } from '@/components/ConfirmDialog';

interface ProjectEditorProps {
  project?: Project | null;
  settings?: SiteSettings | null;
}

type Tab = 'basic' | 'english' | 'arabic' | 'technical' | 'links' | 'image' | 'publishing';

export function ProjectEditor({ project, settings }: ProjectEditorProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>('basic');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [formData, setFormData] = useState({
    title_en: project?.title_en || '',
    title_ar: project?.title_ar || '',
    slug: project?.slug || '',
    summary_en: project?.summary_en || '',
    summary_ar: project?.summary_ar || '',
    category: project?.category || '',
    technologies: project?.technologies?.join(', ') || '',
    state: (project?.state || 'in_progress') as ProjectState,
    is_featured: project?.is_featured || false,
    is_published: project?.is_published || false,
    display_order: project?.display_order || 0,
    overview_en: project?.overview_en || '',
    overview_ar: project?.overview_ar || '',
    problem_en: project?.problem_en || '',
    problem_ar: project?.problem_ar || '',
    solution_en: project?.solution_en || '',
    solution_ar: project?.solution_ar || '',
    technical_en: project?.technical_en || '',
    technical_ar: project?.technical_ar || '',
    challenges_en: project?.challenges_en || '',
    challenges_ar: project?.challenges_ar || '',
    outcome_en: project?.outcome_en || '',
    outcome_ar: project?.outcome_ar || '',
    live_url: project?.live_url || '',
    source_url: project?.source_url || '',
    cover_image_url: project?.cover_image_url || '',
    cover_image_alt_en: project?.cover_image_alt_en || '',
    cover_image_alt_ar: project?.cover_image_alt_ar || '',
    gallery_images: project?.gallery_images || [],
    completed_at: project?.completed_at ? project.completed_at.split('T')[0] : '',
  });

  const tabs: { id: Tab; label: string }[] = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'english', label: 'English' },
    { id: 'arabic', label: 'Arabic' },
    { id: 'technical', label: 'Technical' },
    { id: 'links', label: 'Links' },
    { id: 'image', label: 'Image' },
    { id: 'publishing', label: 'Publishing' },
  ];

  const handleTitleChange = (locale: 'en' | 'ar', value: string) => {
    setFormData(prev => {
      const updates: Record<string, string> = { [`title_${locale}`]: value };
      
      // Auto-generate slug from English title
      if (locale === 'en' && !project?.slug) {
        updates.slug = slugify(value);
      }
      
      return { ...prev, ...updates };
    });
  };

  const handleRepoSelect = (repoData: any) => {
    // Auto-fill form fields from GitHub repo data
    setFormData(prev => ({
      ...prev,
      source_url: repoData.htmlUrl || prev.source_url,
      summary_en: repoData.description || prev.summary_en,
      technologies: repoData.topics?.join(', ') || prev.technologies,
      category: repoData.language || prev.category,
    }));
  };

  const handlePreviewUrlFetch = (url: string) => {
    setFormData(prev => ({
      ...prev,
      live_url: url,
    }));
  };

  const handleSubmit = async (publish?: boolean) => {
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const data = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
        is_published: publish !== undefined ? publish : formData.is_published,
        completed_at: formData.completed_at || null,
      };

      const url = project 
        ? `/api/admin/projects/${project.id}`
        : '/api/admin/projects';
      
      const method = project ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save project');
      }

      showToast('Project saved successfully!', 'success');
      setTimeout(() => {
        router.push('/admin/projects');
        router.refresh();
      }, 1000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      showToast(errorMessage, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!project) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/admin/projects/${project.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      showToast('Project deleted successfully', 'success');
      setTimeout(() => {
        router.push('/admin/projects');
        router.refresh();
      }, 1000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      showToast(errorMessage, 'error');
      setShowDeleteConfirm(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-medium text-foreground mb-2">
          {project ? 'Edit Project' : 'New Project'}
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-2 text-small transition-colors focus-ring',
              activeTab === tab.id
                ? 'text-foreground bg-surface'
                : 'text-muted hover:text-foreground'
            )}
          >
            {tab.label}
          </button>
        ))}
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

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
        {/* Basic Info Tab */}
        {activeTab === 'basic' && (
          <div className="space-y-6">
            {/* GitHub Integration */}
            <GitHubIntegration
              onRepoSelect={handleRepoSelect}
              onPreviewUrlFetch={handlePreviewUrlFetch}
              currentSourceUrl={formData.source_url}
              currentLiveUrl={formData.live_url}
              defaultUsername={settings?.github_username || undefined}
            />

            <div className="border-t border-border pt-6">
              <h3 className="text-label text-foreground mb-4">Project Details</h3>
            </div>

            <div>
              <label htmlFor="title_en" className="text-label text-subtle block mb-2">
                Title (English) *
              </label>
              <input
                type="text"
                id="title_en"
                value={formData.title_en}
                onChange={(e) => handleTitleChange('en', e.target.value)}
                required
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
              />
            </div>

            <div>
              <label htmlFor="title_ar" className="text-label text-subtle block mb-2">
                Title (Arabic) *
              </label>
              <input
                type="text"
                id="title_ar"
                value={formData.title_ar}
                onChange={(e) => handleTitleChange('ar', e.target.value)}
                dir="rtl"
                required
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
              />
            </div>

            <div>
              <label htmlFor="slug" className="text-label text-subtle block mb-2">
                Slug *
              </label>
              <input
                type="text"
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: slugify(e.target.value) }))}
                required
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent font-mono text-small"
              />
            </div>

            <div>
              <label htmlFor="category" className="text-label text-subtle block mb-2">
                Category
              </label>
              <input
                type="text"
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                placeholder="e.g., Web Application, API, Mobile"
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
              />
            </div>

            <div>
              <label htmlFor="technologies" className="text-label text-subtle block mb-2">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                id="technologies"
                value={formData.technologies}
                onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
                placeholder="React, Next.js, TypeScript"
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
              />
            </div>

            <div>
              <label htmlFor="state" className="text-label text-subtle block mb-2">
                Project State
              </label>
              <select
                id="state"
                value={formData.state}
                onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value as ProjectState }))}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
              >
                <option value="completed">Completed</option>
                <option value="in_progress">In Progress</option>
                <option value="experiment">Experiment</option>
              </select>
            </div>

            <div>
              <label htmlFor="completed_at" className="text-label text-subtle block mb-2">
                Completion Date (optional)
              </label>
              <input
                type="date"
                id="completed_at"
                value={formData.completed_at}
                onChange={(e) => setFormData(prev => ({ ...prev, completed_at: e.target.value }))}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
              />
            </div>
          </div>
        )}

        {/* English Content Tab */}
        {activeTab === 'english' && (
          <div className="space-y-6">
            <div>
              <label htmlFor="summary_en" className="text-label text-subtle block mb-2">
                Summary (English)
              </label>
              <textarea
                id="summary_en"
                value={formData.summary_en}
                onChange={(e) => setFormData(prev => ({ ...prev, summary_en: e.target.value }))}
                rows={3}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent resize-y"
              />
            </div>

            <div>
              <label htmlFor="overview_en" className="text-label text-subtle block mb-2">
                Overview (English)
              </label>
              <textarea
                id="overview_en"
                value={formData.overview_en}
                onChange={(e) => setFormData(prev => ({ ...prev, overview_en: e.target.value }))}
                rows={6}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent resize-y"
              />
            </div>

            <div>
              <label htmlFor="problem_en" className="text-label text-subtle block mb-2">
                Problem / Objective (English)
              </label>
              <textarea
                id="problem_en"
                value={formData.problem_en}
                onChange={(e) => setFormData(prev => ({ ...prev, problem_en: e.target.value }))}
                rows={4}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent resize-y"
              />
            </div>

            <div>
              <label htmlFor="solution_en" className="text-label text-subtle block mb-2">
                Solution (English)
              </label>
              <textarea
                id="solution_en"
                value={formData.solution_en}
                onChange={(e) => setFormData(prev => ({ ...prev, solution_en: e.target.value }))}
                rows={4}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent resize-y"
              />
            </div>

            <div>
              <label htmlFor="technical_en" className="text-label text-subtle block mb-2">
                Technical Implementation (English)
              </label>
              <textarea
                id="technical_en"
                value={formData.technical_en}
                onChange={(e) => setFormData(prev => ({ ...prev, technical_en: e.target.value }))}
                rows={6}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent resize-y"
              />
            </div>

            <div>
              <label htmlFor="challenges_en" className="text-label text-subtle block mb-2">
                Challenges & Trade-offs (English)
              </label>
              <textarea
                id="challenges_en"
                value={formData.challenges_en}
                onChange={(e) => setFormData(prev => ({ ...prev, challenges_en: e.target.value }))}
                rows={4}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent resize-y"
              />
            </div>

            <div>
              <label htmlFor="outcome_en" className="text-label text-subtle block mb-2">
                Outcome & Limitations (English)
              </label>
              <textarea
                id="outcome_en"
                value={formData.outcome_en}
                onChange={(e) => setFormData(prev => ({ ...prev, outcome_en: e.target.value }))}
                rows={4}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent resize-y"
              />
            </div>
          </div>
        )}

        {/* Arabic Content Tab */}
        {activeTab === 'arabic' && (
          <div className="space-y-6" dir="rtl">
            <div>
              <label htmlFor="summary_ar" className="text-label text-subtle block mb-2">
                الملخص (عربي)
              </label>
              <textarea
                id="summary_ar"
                value={formData.summary_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, summary_ar: e.target.value }))}
                rows={3}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent resize-y"
              />
            </div>

            <div>
              <label htmlFor="overview_ar" className="text-label text-subtle block mb-2">
                نظرة عامة (عربي)
              </label>
              <textarea
                id="overview_ar"
                value={formData.overview_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, overview_ar: e.target.value }))}
                rows={6}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent resize-y"
              />
            </div>

            <div>
              <label htmlFor="problem_ar" className="text-label text-subtle block mb-2">
                المشكلة / الهدف (عربي)
              </label>
              <textarea
                id="problem_ar"
                value={formData.problem_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, problem_ar: e.target.value }))}
                rows={4}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent resize-y"
              />
            </div>

            <div>
              <label htmlFor="solution_ar" className="text-label text-subtle block mb-2">
                الحل (عربي)
              </label>
              <textarea
                id="solution_ar"
                value={formData.solution_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, solution_ar: e.target.value }))}
                rows={4}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent resize-y"
              />
            </div>

            <div>
              <label htmlFor="technical_ar" className="text-label text-subtle block mb-2">
                التنفيذ التقني (عربي)
              </label>
              <textarea
                id="technical_ar"
                value={formData.technical_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, technical_ar: e.target.value }))}
                rows={6}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent resize-y"
              />
            </div>

            <div>
              <label htmlFor="challenges_ar" className="text-label text-subtle block mb-2">
                التحديات والمقايضات (عربي)
              </label>
              <textarea
                id="challenges_ar"
                value={formData.challenges_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, challenges_ar: e.target.value }))}
                rows={4}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent resize-y"
              />
            </div>

            <div>
              <label htmlFor="outcome_ar" className="text-label text-subtle block mb-2">
                النتيجة والقيود (عربي)
              </label>
              <textarea
                id="outcome_ar"
                value={formData.outcome_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, outcome_ar: e.target.value }))}
                rows={4}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent resize-y"
              />
            </div>
          </div>
        )}

        {/* Technical Tab (empty for now, could add more fields) */}
        {activeTab === 'technical' && (
          <div className="space-y-6">
            <p className="text-small text-muted">
              Technical details are managed through the English and Arabic content tabs.
            </p>
          </div>
        )}

        {/* Links Tab */}
        {activeTab === 'links' && (
          <div className="space-y-6">
            <div>
              <label htmlFor="live_url" className="text-label text-subtle block mb-2">
                Live Preview URL
              </label>
              <input
                type="url"
                id="live_url"
                value={formData.live_url}
                onChange={(e) => setFormData(prev => ({ ...prev, live_url: e.target.value }))}
                placeholder="https://example.com"
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
              />
            </div>

            <div>
              <label htmlFor="source_url" className="text-label text-subtle block mb-2">
                Source Code URL
              </label>
              <input
                type="url"
                id="source_url"
                value={formData.source_url}
                onChange={(e) => setFormData(prev => ({ ...prev, source_url: e.target.value }))}
                placeholder="https://github.com/..."
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
              />
            </div>
          </div>
        )}

        {/* Image Tab */}
        {activeTab === 'image' && (
          <div className="space-y-6">
            <div>
              <label htmlFor="cover_image_url" className="text-label text-subtle block mb-2">
                Cover Image URL
              </label>
              <input
                type="url"
                id="cover_image_url"
                value={formData.cover_image_url}
                onChange={(e) => setFormData(prev => ({ ...prev, cover_image_url: e.target.value }))}
                placeholder="https://example.com/image.jpg"
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
              />
              {formData.cover_image_url && (
                <div className="mt-4 aspect-video bg-surface border border-border overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formData.cover_image_url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="cover_image_alt_en" className="text-label text-subtle block mb-2">
                Image Alt Text (English)
              </label>
              <input
                type="text"
                id="cover_image_alt_en"
                value={formData.cover_image_alt_en}
                onChange={(e) => setFormData(prev => ({ ...prev, cover_image_alt_en: e.target.value }))}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
              />
            </div>

            <div dir="rtl">
              <label htmlFor="cover_image_alt_ar" className="text-label text-subtle block mb-2">
                نص بديل للصورة (عربي)
              </label>
              <input
                type="text"
                id="cover_image_alt_ar"
                value={formData.cover_image_alt_ar}
                onChange={(e) => setFormData(prev => ({ ...prev, cover_image_alt_ar: e.target.value }))}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
              />
            </div>

            {/* Gallery Images Section */}
            <div className="border-t border-border pt-6 mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-label text-foreground">Gallery Images (Optional)</h3>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      gallery_images: [
                        ...prev.gallery_images,
                        { url: '', alt_en: '', alt_ar: '', caption_en: '', caption_ar: '' }
                      ]
                    }));
                  }}
                  className="text-small text-background bg-foreground px-3 py-1.5 hover:bg-accent transition-colors focus-ring"
                >
                  + Add Image
                </button>
              </div>
              
              <p className="text-xs text-muted mb-4">
                Add additional images to showcase your project. These are optional.
              </p>

              {formData.gallery_images.length === 0 ? (
                <div className="border border-dashed border-border p-8 text-center">
                  <p className="text-small text-muted">No gallery images yet</p>
                  <p className="text-xs text-subtle mt-1">Click "Add Image" to add gallery images</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {formData.gallery_images.map((image, index) => (
                    <div key={index} className="border border-border p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-small text-foreground font-medium">
                          Image {index + 1}
                        </span>
                        <div className="flex gap-2">
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => {
                                const newImages = [...formData.gallery_images];
                                [newImages[index], newImages[index - 1]] = [newImages[index - 1], newImages[index]];
                                setFormData(prev => ({ ...prev, gallery_images: newImages }));
                              }}
                              className="text-xs text-muted hover:text-foreground transition-colors"
                            >
                              ↑ Move Up
                            </button>
                          )}
                          {index < formData.gallery_images.length - 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const newImages = [...formData.gallery_images];
                                [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
                                setFormData(prev => ({ ...prev, gallery_images: newImages }));
                              }}
                              className="text-xs text-muted hover:text-foreground transition-colors"
                            >
                              ↓ Move Down
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              const newImages = formData.gallery_images.filter((_, i) => i !== index);
                              setFormData(prev => ({ ...prev, gallery_images: newImages }));
                            }}
                            className="text-xs text-error hover:text-error/80 transition-colors"
                          >
                            ✕ Remove
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="text-label text-subtle block mb-2">
                          Image URL *
                        </label>
                        <input
                          type="url"
                          value={image.url}
                          onChange={(e) => {
                            const newImages = [...formData.gallery_images];
                            newImages[index] = { ...newImages[index], url: e.target.value };
                            setFormData(prev => ({ ...prev, gallery_images: newImages }));
                          }}
                          placeholder="https://example.com/image.jpg"
                          className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
                        />
                      </div>

                      {image.url && (
                        <div className="aspect-video bg-surface border border-border overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={image.url}
                            alt={image.alt_en || `Gallery image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-label text-subtle block mb-2">
                            Alt Text (English)
                          </label>
                          <input
                            type="text"
                            value={image.alt_en || ''}
                            onChange={(e) => {
                              const newImages = [...formData.gallery_images];
                              newImages[index] = { ...newImages[index], alt_en: e.target.value };
                              setFormData(prev => ({ ...prev, gallery_images: newImages }));
                            }}
                            placeholder="Describe the image"
                            className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
                          />
                        </div>

                        <div dir="rtl">
                          <label className="text-label text-subtle block mb-2">
                            نص بديل (عربي)
                          </label>
                          <input
                            type="text"
                            value={image.alt_ar || ''}
                            onChange={(e) => {
                              const newImages = [...formData.gallery_images];
                              newImages[index] = { ...newImages[index], alt_ar: e.target.value };
                              setFormData(prev => ({ ...prev, gallery_images: newImages }));
                            }}
                            placeholder="وصف الصورة"
                            className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-label text-subtle block mb-2">
                            Caption (English) - Optional
                          </label>
                          <input
                            type="text"
                            value={image.caption_en || ''}
                            onChange={(e) => {
                              const newImages = [...formData.gallery_images];
                              newImages[index] = { ...newImages[index], caption_en: e.target.value };
                              setFormData(prev => ({ ...prev, gallery_images: newImages }));
                            }}
                            placeholder="Image caption"
                            className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
                          />
                        </div>

                        <div dir="rtl">
                          <label className="text-label text-subtle block mb-2">
                            وصف (عربي) - اختياري
                          </label>
                          <input
                            type="text"
                            value={image.caption_ar || ''}
                            onChange={(e) => {
                              const newImages = [...formData.gallery_images];
                              newImages[index] = { ...newImages[index], caption_ar: e.target.value };
                              setFormData(prev => ({ ...prev, gallery_images: newImages }));
                            }}
                            placeholder="وصف الصورة"
                            className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Publishing Tab */}
        {activeTab === 'publishing' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                className="w-4 h-4"
              />
              <label htmlFor="is_featured" className="text-small text-foreground">
                Featured project
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="is_published"
                checked={formData.is_published}
                onChange={(e) => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
                className="w-4 h-4"
              />
              <label htmlFor="is_published" className="text-small text-foreground">
                Published
              </label>
            </div>

            <div>
              <label htmlFor="display_order" className="text-label text-subtle block mb-2">
                Display Order
              </label>
              <input
                type="number"
                id="display_order"
                value={formData.display_order}
                onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-8 border-t border-border">
          <button
            type="submit"
            disabled={saving}
            className="text-background bg-foreground px-6 py-3 hover:bg-accent transition-colors focus-ring disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
          
          <button
            type="button"
            onClick={() => handleSubmit(true)}
            disabled={saving}
            className="text-foreground border border-border px-6 py-3 hover:border-foreground transition-colors focus-ring disabled:opacity-50"
          >
            {formData.is_published ? 'Update & Keep Published' : 'Save & Publish'}
          </button>

          {project && (
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={saving}
              className="text-error border border-error/30 px-6 py-3 hover:bg-error/10 transition-colors focus-ring disabled:opacity-50 ms-auto"
            >
              Delete
            </button>
          )}
        </div>
      </form>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Project"
        message={
          <>
            Are you sure you want to delete <strong>{project?.title_en}</strong>?
            <br /><br />
            This action cannot be undone.
          </>
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
}
