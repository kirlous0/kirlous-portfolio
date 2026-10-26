import { createServiceRoleClient, isAdmin } from './supabase/server';
import type { Project, Service, SiteSettings, PageContent } from '@/types';

// ===== PUBLIC DATA ACCESS (read-only, published only) =====

export async function getPublishedProjects(): Promise<Project[]> {
  try {
    const supabase = await createServiceRoleClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
    return (data || []) as Project[];
  } catch {
    return [];
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const supabase = await createServiceRoleClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_published', true)
      .eq('is_featured', true)
      .order('display_order', { ascending: true })
      .limit(6);

    if (error) {
      console.error('Error fetching featured projects:', error);
      return [];
    }
    return (data || []) as Project[];
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const supabase = await createServiceRoleClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (error) {
      return null;
    }
    return data as Project;
  } catch {
    return null;
  }
}

export async function getVisibleServices(): Promise<Service[]> {
  try {
    const supabase = await createServiceRoleClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_visible', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching services:', error);
      return [];
    }
    return (data || []) as Service[];
  } catch {
    return [];
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const supabase = await createServiceRoleClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .limit(1)
      .single();

    if (error) {
      return null;
    }
    return data as SiteSettings;
  } catch {
    return null;
  }
}

export async function getPageContent(pageKey: string): Promise<PageContent[]> {
  try {
    const supabase = await createServiceRoleClient();
    const { data, error } = await supabase
      .from('page_content')
      .select('*')
      .eq('page_key', pageKey);

    if (error) {
      return [];
    }
    return (data || []) as PageContent[];
  } catch {
    return [];
  }
}

// ===== ADMIN DATA ACCESS (requires authentication) =====

export async function getAllProjects(): Promise<Project[]> {
  if (!(await isAdmin())) return [];
  try {
    const supabase = await createServiceRoleClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) return [];
    return (data || []) as Project[];
  } catch {
    return [];
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  if (!(await isAdmin())) return null;
  try {
    const supabase = await createServiceRoleClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data as Project;
  } catch {
    return null;
  }
}

export async function createProject(project: Partial<Project>): Promise<Project | null> {
  if (!(await isAdmin())) return null;
  try {
    const supabase = await createServiceRoleClient();
    const { data, error } = await supabase
      .from('projects')
      .insert({
        ...project,
        technologies: project.technologies || [],
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      return null;
    }
    return data as Project;
  } catch {
    return null;
  }
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
  if (!(await isAdmin())) return null;
  try {
    const supabase = await createServiceRoleClient();
    const { data, error } = await supabase
      .from('projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating project:', error);
      return null;
    }
    return data as Project;
  } catch {
    return null;
  }
}

export async function deleteProject(id: string): Promise<boolean> {
  if (!(await isAdmin())) return false;
  try {
    const supabase = await createServiceRoleClient();
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    return !error;
  } catch {
    return false;
  }
}

export async function checkSlugUnique(slug: string, excludeId?: string): Promise<boolean> {
  try {
    const supabase = await createServiceRoleClient();
    let query = supabase
      .from('projects')
      .select('id')
      .eq('slug', slug);
    
    if (excludeId) {
      query = query.neq('id', excludeId);
    }
    
    const { data } = await query;
    return !data || data.length === 0;
  } catch {
    return true; // Assume unique on error
  }
}

// Services admin
export async function getAllServices(): Promise<Service[]> {
  if (!(await isAdmin())) return [];
  try {
    const supabase = await createServiceRoleClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) return [];
    return (data || []) as Service[];
  } catch {
    return [];
  }
}

export async function createService(service: Partial<Service>): Promise<Service | null> {
  if (!(await isAdmin())) return null;
  try {
    const supabase = await createServiceRoleClient();
    const { data, error } = await supabase
      .from('services')
      .insert(service)
      .select()
      .single();

    if (error) return null;
    return data as Service;
  } catch {
    return null;
  }
}

export async function updateService(id: string, updates: Partial<Service>): Promise<Service | null> {
  if (!(await isAdmin())) return null;
  try {
    const supabase = await createServiceRoleClient();
    const { data, error } = await supabase
      .from('services')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) return null;
    return data as Service;
  } catch {
    return null;
  }
}

export async function deleteService(id: string): Promise<boolean> {
  if (!(await isAdmin())) return false;
  try {
    const supabase = await createServiceRoleClient();
    const { error } = await supabase.from('services').delete().eq('id', id);
    return !error;
  } catch {
    return false;
  }
}

// Settings admin
export async function updateSiteSettings(updates: Partial<SiteSettings>): Promise<SiteSettings | null> {
  if (!(await isAdmin())) return null;
  try {
    const supabase = await createServiceRoleClient();
    
    // Check if settings exist
    const { data: existing } = await supabase.from('site_settings').select('id').limit(1);
    
    if (existing && existing.length > 0) {
      const { data, error } = await supabase
        .from('site_settings')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', existing[0].id)
        .select()
        .single();
      if (error) return null;
      return data as SiteSettings;
    } else {
      const { data, error } = await supabase
        .from('site_settings')
        .insert(updates)
        .select()
        .single();
      if (error) return null;
      return data as SiteSettings;
    }
  } catch {
    return null;
  }
}

// Page content admin
export async function upsertPageContent(content: Partial<PageContent>): Promise<PageContent | null> {
  if (!(await isAdmin())) return null;
  try {
    const supabase = await createServiceRoleClient();
    
    const { data: existing } = await supabase
      .from('page_content')
      .select('id')
      .eq('page_key', content.page_key!)
      .eq('section_key', content.section_key!)
      .single();

    if (existing) {
      const { data, error } = await supabase
        .from('page_content')
        .update({ 
          content_en: content.content_en, 
          content_ar: content.content_ar,
          updated_at: new Date().toISOString() 
        })
        .eq('id', existing.id)
        .select()
        .single();
      if (error) return null;
      return data as PageContent;
    } else {
      const { data, error } = await supabase
        .from('page_content')
        .insert({
          page_key: content.page_key,
          section_key: content.section_key,
          content_en: content.content_en,
          content_ar: content.content_ar,
        })
        .select()
        .single();
      if (error) return null;
      return data as PageContent;
    }
  } catch {
    return null;
  }
}

// Dashboard stats
export async function getDashboardStats() {
  if (!(await isAdmin())) return null;
  try {
    const supabase = await createServiceRoleClient();
    
    const [projects, services, settings] = await Promise.all([
      supabase.from('projects').select('id, is_published, is_featured, title_en, title_ar'),
      supabase.from('services').select('id, is_visible, description_en'),
      supabase.from('site_settings').select('*').limit(1).single(),
    ]);

    const projectList = projects.data || [];
    const serviceList = services.data || [];
    const settingsData = settings.data as SiteSettings | null;

    return {
      totalProjects: projectList.length,
      publishedProjects: projectList.filter((p: Record<string, unknown>) => p.is_published).length,
      draftProjects: projectList.filter((p: Record<string, unknown>) => !p.is_published).length,
      featuredProjects: projectList.filter((p: Record<string, unknown>) => p.is_featured).length,
      totalServices: serviceList.length,
      visibleServices: serviceList.filter((s: Record<string, unknown>) => s.is_visible).length,
      checklist: {
        hasContactMethod: !!(settingsData?.email || settingsData?.whatsapp),
        hasAboutEn: true,
        hasAboutAr: true,
        hasPublishedProjects: projectList.some((p: Record<string, unknown>) => p.is_published),
        hasServiceDescriptions: serviceList.some((s: Record<string, unknown>) => s.description_en),
      },
    };
  } catch {
    return null;
  }
}
