import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const owner = request.nextUrl.searchParams.get('owner');
  const repo = request.nextUrl.searchParams.get('repo');

  if (!owner || !repo) {
    return NextResponse.json(
      { error: 'Owner and repo are required' },
      { status: 400 }
    );
  }

  try {
    // Fetch repo details
    const repoResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Kirlous-Portfolio-App',
        },
        next: { revalidate: 300 },
      }
    );

    if (!repoResponse.ok) {
      if (repoResponse.status === 404) {
        return NextResponse.json({ error: 'Repository not found' }, { status: 404 });
      }
      throw new Error(`GitHub API error: ${repoResponse.status}`);
    }

    const repoData = await repoResponse.json();

    // Fetch README content
    let readmeContent = '';
    try {
      const readmeResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/readme`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3.raw',
            'User-Agent': 'Kirlous-Portfolio-App',
          },
          next: { revalidate: 300 },
        }
      );

      if (readmeResponse.ok) {
        readmeContent = await readmeResponse.text();
      }
    } catch (error) {
      console.log('No README found for repo');
    }

    // Fetch languages
    let languages: Record<string, number> = {};
    try {
      const langResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/languages`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Kirlous-Portfolio-App',
          },
          next: { revalidate: 300 },
        }
      );

      if (langResponse.ok) {
        languages = await langResponse.json();
      }
    } catch (error) {
      console.log('Failed to fetch languages');
    }

    // Calculate total bytes and percentages
    const totalBytes = Object.values(languages).reduce((a, b) => a + b, 0);
    const languagesWithPercentage = Object.entries(languages).map(([lang, bytes]) => ({
      name: lang,
      percentage: ((bytes / totalBytes) * 100).toFixed(1),
    }));

    const repoInfo = {
      id: repoData.id,
      name: repoData.name,
      fullName: repoData.full_name,
      description: repoData.description || '',
      htmlUrl: repoData.html_url,
      homepage: repoData.homepage || '',
      language: repoData.language || '',
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      watchers: repoData.watchers_count,
      openIssues: repoData.open_issues_count,
      license: repoData.license?.name || '',
      topics: repoData.topics || [],
      createdAt: repoData.created_at,
      updatedAt: repoData.updated_at,
      pushedAt: repoData.pushed_at,
      defaultBranch: repoData.default_branch,
      hasPages: repoData.has_pages,
      isPrivate: repoData.private,
      readme: readmeContent,
      languages: languagesWithPercentage,
      owner: {
        login: repoData.owner.login,
        avatarUrl: repoData.owner.avatar_url,
        htmlUrl: repoData.owner.html_url,
      },
    };

    return NextResponse.json({ repo: repoInfo });
  } catch (error) {
    console.error('GitHub repo info error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch repo info' },
      { status: 500 }
    );
  }
}
