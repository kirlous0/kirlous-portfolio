import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/supabase/server';
import { getProjectById, updateProject, deleteProject, checkSlugUnique } from '@/lib/data';
import { z } from 'zod';

const updateProjectSchema = z.object({
  title_en: z.string().min(1).optional(),
  title_ar: z.string().min(1).optional(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  summary_en: z.string().nullable().optional(),
  summary_ar: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  technologies: z.array(z.string()).optional(),
  state: z.enum(['completed', 'in_progress', 'experiment']).optional(),
  is_featured: z.boolean().optional(),
  is_published: z.boolean().optional(),
  display_order: z.number().optional(),
  overview_en: z.string().nullable().optional(),
  overview_ar: z.string().nullable().optional(),
  problem_en: z.string().nullable().optional(),
  problem_ar: z.string().nullable().optional(),
  solution_en: z.string().nullable().optional(),
  solution_ar: z.string().nullable().optional(),
  technical_en: z.string().nullable().optional(),
  technical_ar: z.string().nullable().optional(),
  challenges_en: z.string().nullable().optional(),
  challenges_ar: z.string().nullable().optional(),
  outcome_en: z.string().nullable().optional(),
  outcome_ar: z.string().nullable().optional(),
  live_url: z.string().nullable().optional(),
  source_url: z.string().nullable().optional(),
  cover_image_url: z.string().nullable().optional(),
  cover_image_alt_en: z.string().nullable().optional(),
  cover_image_alt_ar: z.string().nullable().optional(),
  completed_at: z.string().nullable().optional(),
});

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const project = await getProjectById(id);
  
  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const validated = updateProjectSchema.parse(body);

    // Check slug uniqueness if slug is being changed
    if (validated.slug) {
      const isUnique = await checkSlugUnique(validated.slug, id);
      if (!isUnique) {
        return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
      }
    }

    const project = await updateProject(id, validated);
    if (!project) {
      return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }

    return NextResponse.json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const success = await deleteProject(id);
  
  if (!success) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
