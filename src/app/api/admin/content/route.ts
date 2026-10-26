import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/supabase/server';
import { upsertPageContent } from '@/lib/data';

export async function PUT(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    if (!body.page_key || !body.section_key) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const content = await upsertPageContent({
      page_key: body.page_key,
      section_key: body.section_key,
      content_en: body.content_en,
      content_ar: body.content_ar,
    });

    if (!content) {
      return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
    }

    return NextResponse.json(content);
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
