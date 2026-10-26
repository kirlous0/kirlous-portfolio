import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/supabase/server';
import { updateService, deleteService } from '@/lib/data';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const service = await updateService(id, body);
    if (!service) {
      return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
    }
    return NextResponse.json(service);
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const success = await deleteService(id);
  
  if (!success) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
