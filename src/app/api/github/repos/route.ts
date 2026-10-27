import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const username = request.nextUrl.searchParams.get('username');
  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    // Fetch user's public repos from GitHub
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Kirlous-Portfolio-App',
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'GitHub user not found' }, { status: 404 });
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();

    // Filter and map repos to return only needed info
    const mappedRepos = repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description || '',
      htmlUrl: repo.html_url,
      homepage: repo.homepage || '',
      language: repo.language || '',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at,
      topics: repo.topics || [],
      hasPages: repo.has_pages,
      isPrivate: repo.private,
      defaultBranch: repo.default_branch,
    }));

    return NextResponse.json({ repos: mappedRepos });
  } catch (error) {
    console.error('GitHub repos fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repos' },
      { status: 500 }
    );
  }
}
