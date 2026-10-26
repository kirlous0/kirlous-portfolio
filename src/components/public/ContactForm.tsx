'use client';

import { useState, type FormEvent } from 'react';
import type { Locale } from '@/types';
import { getTranslations } from '@/lib/i18n';
import { getWhatsAppUrl, getMailtoUrl } from '@/lib/utils';
import { cn } from '@/lib/cn';

interface ContactFormProps {
  locale: Locale;
  settings: {
    email?: string | null;
    whatsapp?: string | null;
  } | null;
}

interface FormData {
  name: string;
  email: string;
  projectType: string;
  description: string;
  budget: string;
  timeline: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  projectType?: string;
  description?: string;
}

export function ContactForm({ locale, settings }: ContactFormProps) {
  const t = getTranslations(locale);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    projectType: '',
    description: '',
    budget: '',
    timeline: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const hasWhatsApp = !!settings?.whatsapp;
  const hasEmail = !!settings?.email;
  const hasContactMethod = hasWhatsApp || hasEmail;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t.contact.required;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t.contact.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.contact.invalidEmail;
    }
    
    if (!formData.projectType) {
      newErrors.projectType = t.contact.required;
    }
    
    if (!formData.description.trim()) {
      newErrors.description = t.contact.required;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildMessage = (): string => {
    const projectTypeLabel = t.contact.projectTypes[formData.projectType as keyof typeof t.contact.projectTypes] || formData.projectType;
    const budgetLabel = formData.budget ? (t.contact.budgets[formData.budget as keyof typeof t.contact.budgets] || formData.budget) : '';
    const timelineLabel = formData.timeline ? (t.contact.timelines[formData.timeline as keyof typeof t.contact.timelines] || formData.timeline) : '';

    const lines = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Project Type: ${projectTypeLabel}`,
      '',
      `Description:`,
      formData.description,
    ];

    if (budgetLabel) {
      lines.push('', `Budget: ${budgetLabel}`);
    }
    if (timelineLabel) {
      lines.push(`Timeline: ${timelineLabel}`);
    }

    return lines.join('\n');
  };

  const handleSubmit = (method: 'whatsapp' | 'email') => (e: FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    const message = buildMessage();
    
    if (method === 'whatsapp' && settings?.whatsapp) {
      const url = getWhatsAppUrl(settings.whatsapp, message);
      window.open(url, '_blank', 'noopener,noreferrer');
    } else if (method === 'email' && settings?.email) {
      const subject = `Project Inquiry from ${formData.name}`;
      const url = getMailtoUrl(settings.email, subject, message);
      window.location.href = url;
    }
  };

  if (!hasContactMethod) {
    return (
      <div className="py-20 text-center">
        <p className="text-body text-muted">{t.contact.noContactMethod}</p>
      </div>
    );
  }

  const projectTypes = [
    { value: 'webApp', label: t.contact.projectTypes.webApp },
    { value: 'website', label: t.contact.projectTypes.website },
    { value: 'api', label: t.contact.projectTypes.api },
    { value: 'frontend', label: t.contact.projectTypes.frontend },
    { value: 'backend', label: t.contact.projectTypes.backend },
    { value: 'other', label: t.contact.projectTypes.other },
  ];

  const budgets = [
    { value: 'small', label: t.contact.budgets.small },
    { value: 'medium', label: t.contact.budgets.medium },
    { value: 'large', label: t.contact.budgets.large },
    { value: 'discuss', label: t.contact.budgets.discuss },
  ];

  const timelines = [
    { value: 'urgent', label: t.contact.timelines.urgent },
    { value: 'normal', label: t.contact.timelines.normal },
    { value: 'flexible', label: t.contact.timelines.flexible },
    { value: 'discuss', label: t.contact.timelines.discuss },
  ];

  return (
    <form className="space-y-8" onSubmit={handleSubmit(hasWhatsApp ? 'whatsapp' : 'email')}>
      {/* Name */}
      <div>
        <label htmlFor="name" className="text-label text-subtle block mb-2">
          {t.contact.nameLabel}
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder={t.contact.namePlaceholder}
          className={cn(
            'w-full bg-transparent border border-border px-4 py-3 text-foreground placeholder:text-subtle focus-ring focus:border-accent transition-colors',
            errors.name && 'border-error'
          )}
        />
        {errors.name && (
          <p className="text-small text-error mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="text-label text-subtle block mb-2">
          {t.contact.emailLabel}
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder={t.contact.emailPlaceholder}
          className={cn(
            'w-full bg-transparent border border-border px-4 py-3 text-foreground placeholder:text-subtle focus-ring focus:border-accent transition-colors',
            errors.email && 'border-error'
          )}
        />
        {errors.email && (
          <p className="text-small text-error mt-1">{errors.email}</p>
        )}
      </div>

      {/* Project Type */}
      <div>
        <label htmlFor="projectType" className="text-label text-subtle block mb-2">
          {t.contact.projectTypeLabel}
        </label>
        <select
          id="projectType"
          value={formData.projectType}
          onChange={(e) => setFormData(prev => ({ ...prev, projectType: e.target.value }))}
          className={cn(
            'w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent transition-colors appearance-none',
            errors.projectType && 'border-error'
          )}
        >
          <option value="">{t.contact.projectTypePlaceholder}</option>
          {projectTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
        {errors.projectType && (
          <p className="text-small text-error mt-1">{errors.projectType}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="text-label text-subtle block mb-2">
          {t.contact.descriptionLabel}
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder={t.contact.descriptionPlaceholder}
          rows={6}
          className={cn(
            'w-full bg-transparent border border-border px-4 py-3 text-foreground placeholder:text-subtle focus-ring focus:border-accent transition-colors resize-y',
            errors.description && 'border-error'
          )}
        />
        {errors.description && (
          <p className="text-small text-error mt-1">{errors.description}</p>
        )}
      </div>

      {/* Budget */}
      <div>
        <label htmlFor="budget" className="text-label text-subtle block mb-2">
          {t.contact.budgetLabel}
        </label>
        <select
          id="budget"
          value={formData.budget}
          onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
          className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent transition-colors appearance-none"
        >
          <option value="">{t.contact.budgetPlaceholder}</option>
          {budgets.map(b => (
            <option key={b.value} value={b.value}>{b.label}</option>
          ))}
        </select>
      </div>

      {/* Timeline */}
      <div>
        <label htmlFor="timeline" className="text-label text-subtle block mb-2">
          {t.contact.timelineLabel}
        </label>
        <select
          id="timeline"
          value={formData.timeline}
          onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
          className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent transition-colors appearance-none"
        >
          <option value="">{t.contact.timelinePlaceholder}</option>
          {timelines.map(tl => (
            <option key={tl.value} value={tl.value}>{tl.label}</option>
          ))}
        </select>
      </div>

      {/* Submit Buttons */}
      <div className="pt-8 space-y-4">
        {hasWhatsApp && (
          <div>
            <button
              type="submit"
              onClick={handleSubmit('whatsapp')}
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 text-background bg-foreground px-8 py-4 hover:bg-accent transition-colors focus-ring"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t.contact.sendViaWhatsApp}
            </button>
            <p className="text-small text-subtle mt-2">{t.contact.whatsappNotice}</p>
          </div>
        )}

        {hasEmail && (
          <div>
            <button
              type="button"
              onClick={handleSubmit('email')}
              className={cn(
                'w-full md:w-auto inline-flex items-center justify-center gap-3 text-foreground border border-border px-8 py-4 hover:border-foreground transition-colors focus-ring',
                hasWhatsApp && 'mt-4'
              )}
            >
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1" y="1" width="18" height="14" rx="1" />
                <path d="M1 1l9 7 9-7" />
              </svg>
              {t.contact.sendViaEmail}
            </button>
            {hasEmail && !hasWhatsApp && (
              <p className="text-small text-subtle mt-2">{t.contact.emailNotice}</p>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
