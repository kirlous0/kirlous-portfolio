import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/supabase/server';
import { createProject, getAllProjects, checkSlugUnique } from '@/lib/data';
import { z } from 'zod';

const projectSchema = z.object({
  title_en: z.string().min(1, 'English title is required'),
  title_ar: z.string().min(1, 'Arabic title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  summary_en: z.string().nullable().optional(),
  summary_ar: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  technologies: z.array(z.string()).optional(),
  state: z.enum(['completed', 'in_progress', 'experiment']),
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

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const projects = await getAllProjects();
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validated = projectSchema.parse(body);

    // Check slug uniqueness
    const isUnique = await checkSlugUnique(validated.slug);
    if (!isUnique) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
    }

    const project = await createProject(validated);
    if (!project) {
      return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
