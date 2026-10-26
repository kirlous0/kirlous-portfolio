import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Locale } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLocalizedPath(path: string, locale: Locale): string {
  // Remove existing locale prefix
  const pathWithoutLocale = path.replace(/^\/(en|ar)/, '');
  return `/${locale}${pathWithoutLocale}`;
}

export function getCurrentLocale(pathname: string): Locale {
  if (pathname.startsWith('/ar')) return 'ar';
  return 'en';
}

export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export function formatDate(date: string | null, locale: Locale = 'en'): string {
  if (!date) return '';
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
  };
  const localeStr = locale === 'ar' ? 'ar-EG' : 'en-US';
  return d.toLocaleDateString(localeStr, options);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}

export function isValidUrl(str: string): boolean {
  try {
    const url = new URL(str);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function getProjectStateLabel(state: string, locale: Locale): string {
  const labels: Record<string, Record<Locale, string>> = {
    completed: { en: 'Completed', ar: 'مكتمل' },
    in_progress: { en: 'In Progress', ar: 'قيد التنفيذ' },
    experiment: { en: 'Experiment', ar: 'تجريبي' },
  };
  return labels[state]?.[locale] || state;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
}

export function getWhatsAppUrl(phone: string, message: string): string {
  const cleanedPhone = phone.replace(/[^0-9]/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanedPhone}?text=${encodedMessage}`;
}

export function getMailtoUrl(email: string, subject: string, body: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}
