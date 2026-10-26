'use client';

import { useState } from 'react';
import type { Service } from '@/types';

interface ServicesManagerProps {
  services: Service[];
}

interface EditingService {
  id?: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  scope_en: string;
  scope_ar: string;
  display_order: number;
  is_visible: boolean;
}

const emptyService: EditingService = {
  title_en: '',
  title_ar: '',
  description_en: '',
  description_ar: '',
  scope_en: '',
  scope_ar: '',
  display_order: 0,
  is_visible: true,
};

export function ServicesManager({ services: initialServices }: ServicesManagerProps) {
  const [services, setServices] = useState(initialServices);
  const [editing, setEditing] = useState<EditingService | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleNew = () => {
    setEditing({ ...emptyService, display_order: services.length });
  };

  const handleEdit = (service: Service) => {
    setEditing({
      id: service.id,
      title_en: service.title_en,
      title_ar: service.title_ar,
      description_en: service.description_en || '',
      description_ar: service.description_ar || '',
      scope_en: service.scope_en || '',
      scope_ar: service.scope_ar || '',
      display_order: service.display_order,
      is_visible: service.is_visible,
    });
  };

  const handleSave = async () => {
    if (!editing) return;
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const url = editing.id
        ? `/api/admin/services/${editing.id}`
        : '/api/admin/services';
      const method = editing.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editing,
          description_en: editing.description_en || null,
          description_ar: editing.description_ar || null,
          scope_en: editing.scope_en || null,
          scope_ar: editing.scope_ar || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save service');
      }

      const saved = await response.json();
      
      if (editing.id) {
        setServices(prev => prev.map(s => s.id === saved.id ? saved : s));
      } else {
        setServices(prev => [...prev, saved]);
      }

      setSuccess('Service saved');
      setEditing(null);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete service');
      }

      setServices(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl font-medium text-foreground mb-2">Services</h1>
          <p className="text-small text-muted">Manage your service offerings</p>
        </div>
        {!editing && (
          <button
            onClick={handleNew}
            className="text-small text-background bg-foreground px-4 py-2 hover:bg-accent transition-colors focus-ring"
          >
            + New Service
          </button>
        )}
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

      {/* Editor */}
      {editing && (
        <div className="border border-border p-6 mb-8">
          <h2 className="text-xl font-medium text-foreground mb-6">
            {editing.id ? 'Edit Service' : 'New Service'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-label text-subtle block mb-2">Title (English)</label>
              <input
                type="text"
                value={editing.title_en}
                onChange={(e) => setEditing(prev => prev ? { ...prev, title_en: e.target.value } : null)}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
              />
            </div>
            <div dir="rtl">
              <label className="text-label text-subtle block mb-2">العنوان (عربي)</label>
              <input
                type="text"
                value={editing.title_ar}
                onChange={(e) => setEditing(prev => prev ? { ...prev, title_ar: e.target.value } : null)}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-label text-subtle block mb-2">Description (English)</label>
              <textarea
                value={editing.description_en}
                onChange={(e) => setEditing(prev => prev ? { ...prev, description_en: e.target.value } : null)}
                rows={4}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent resize-y"
              />
            </div>
            <div dir="rtl">
              <label className="text-label text-subtle block mb-2">الوصف (عربي)</label>
              <textarea
                value={editing.description_ar}
                onChange={(e) => setEditing(prev => prev ? { ...prev, description_ar: e.target.value } : null)}
                rows={4}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent resize-y"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-label text-subtle block mb-2">Scope (English)</label>
              <textarea
                value={editing.scope_en}
                onChange={(e) => setEditing(prev => prev ? { ...prev, scope_en: e.target.value } : null)}
                rows={3}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent resize-y"
              />
            </div>
            <div dir="rtl">
              <label className="text-label text-subtle block mb-2">النطاق (عربي)</label>
              <textarea
                value={editing.scope_ar}
                onChange={(e) => setEditing(prev => prev ? { ...prev, scope_ar: e.target.value } : null)}
                rows={3}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent resize-y"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-label text-subtle block mb-2">Display Order</label>
              <input
                type="number"
                value={editing.display_order}
                onChange={(e) => setEditing(prev => prev ? { ...prev, display_order: parseInt(e.target.value) || 0 } : null)}
                className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
              />
            </div>
            <div className="flex items-center gap-3 pt-8">
              <input
                type="checkbox"
                id="is_visible"
                checked={editing.is_visible}
                onChange={(e) => setEditing(prev => prev ? { ...prev, is_visible: e.target.checked } : null)}
                className="w-4 h-4"
              />
              <label htmlFor="is_visible" className="text-small text-foreground">Visible on website</label>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              disabled={saving || !editing.title_en}
              className="text-background bg-foreground px-6 py-3 hover:bg-accent transition-colors focus-ring disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => setEditing(null)}
              className="text-muted border border-border px-6 py-3 hover:text-foreground transition-colors focus-ring"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Services List */}
      {services.length === 0 ? (
        <div className="border border-border p-12 text-center">
          <p className="text-body text-muted mb-4">No services configured</p>
          <button
            onClick={handleNew}
            className="text-small text-foreground underline hover:text-accent transition-colors"
          >
            Add your first service
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="border border-border p-6 flex items-start justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-label text-subtle">{String(service.display_order).padStart(2, '0')}</span>
                  <h3 className="text-foreground font-medium">{service.title_en}</h3>
                  {!service.is_visible && (
                    <span className="text-label text-subtle">Hidden</span>
                  )}
                </div>
                {service.title_ar && (
                  <p className="text-small text-muted" dir="rtl">{service.title_ar}</p>
                )}
                {service.description_en && (
                  <p className="text-small text-muted mt-2 line-clamp-2">{service.description_en}</p>
                )}
              </div>
              <div className="flex gap-3 shrink-0">
                <button
                  onClick={() => handleEdit(service)}
                  className="text-small text-muted hover:text-foreground transition-colors focus-ring"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="text-small text-error/70 hover:text-error transition-colors focus-ring"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
