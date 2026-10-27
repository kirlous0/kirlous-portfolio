import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const projectName = request.nextUrl.searchParams.get('project');
  if (!projectName) {
    return NextResponse.json(
      { error: 'Project name is required' },
      { status: 400 }
    );
  }

  const vercelToken = process.env.VERCEL_TOKEN;
  if (!vercelToken) {
    return NextResponse.json(
      { error: 'VERCEL_TOKEN not configured' },
      { status: 500 }
    );
  }

  try {
    // Fetch latest production deployment from Vercel
    const response = await fetch(
      `https://api.vercel.com/v6/deployments?project=${encodeURIComponent(projectName)}&target=production&limit=1`,
      {
        headers: {
          'Authorization': `Bearer ${vercelToken}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Project not found on Vercel' },
          { status: 404 }
        );
      }
      throw new Error(`Vercel API error: ${response.status}`);
    }

    const data = await response.json();
    const deployments = data.deployments || [];

    if (deployments.length === 0) {
      return NextResponse.json(
        { error: 'No production deployments found' },
        { status: 404 }
      );
    }

    const deployment = deployments[0];
    const previewUrl = deployment.url
      ? `https://${deployment.url}`
      : deployment.alias && deployment.alias.length > 0
      ? `https://${deployment.alias[0]}`
      : null;

    if (!previewUrl) {
      return NextResponse.json(
        { error: 'No preview URL found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      previewUrl,
      deploymentUrl: deployment.url ? `https://${deployment.url}` : null,
      aliases: deployment.alias || [],
      state: deployment.state,
      createdAt: deployment.created,
    });
  } catch (error) {
    console.error('Vercel preview URL fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Vercel preview URL' },
      { status: 500 }
    );
  }
}
