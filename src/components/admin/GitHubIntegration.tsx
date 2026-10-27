'use client';

import { useState } from 'react';

interface GitHubIntegrationProps {
  onRepoSelect: (repoData: any) => void;
  onPreviewUrlFetch: (url: string) => void;
  currentSourceUrl?: string;
  currentLiveUrl?: string;
}

interface Repo {
  id: number;
  name: string;
  fullName: string;
  description: string;
  htmlUrl: string;
  homepage: string;
  language: string;
  stars: number;
  forks: number;
  updatedAt: string;
  topics: string[];
}

export function GitHubIntegration({
  onRepoSelect,
  onPreviewUrlFetch,
  currentSourceUrl,
  currentLiveUrl,
}: GitHubIntegrationProps) {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [repoInfo, setRepoInfo] = useState<any>(null);

  const handleFetchRepos = async () => {
    if (!username.trim()) {
      setError('Please enter a GitHub username');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/api/github/repos?username=${encodeURIComponent(username)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch repos');
      }

      setRepos(data.repos);
      if (data.repos.length === 0) {
        setError('No public repositories found');
      } else {
        setSuccess(`Found ${data.repos.length} repositories`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
    } finally {
      setLoading(false);
    }
  };

  const handleRepoChange = async (repoName: string) => {
    setSelectedRepo(repoName);
    setError('');
    setSuccess('');

    if (!repoName) {
      setRepoInfo(null);
      return;
    }

    const repo = repos.find(r => r.name === repoName);
    if (!repo) return;

    setLoading(true);

    try {
      const response = await fetch(
        `/api/github/repo-info?owner=${encodeURIComponent(username)}&repo=${encodeURIComponent(repoName)}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch repo info');
      }

      setRepoInfo(data.repo);
      onRepoSelect(data.repo);
      setSuccess('Repository information loaded');

      // Auto-fill preview URL if homepage exists
      if (data.repo.homepage) {
        onPreviewUrlFetch(data.repo.homepage);
        setSuccess('Repository info loaded. Preview URL auto-filled from homepage.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch repo info');
    } finally {
      setLoading(false);
    }
  };

  const handleFetchVercelPreview = async () => {
    if (!selectedRepo) {
      setError('Please select a repository first');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(
        `/api/vercel/preview-url?project=${encodeURIComponent(selectedRepo)}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch Vercel preview URL');
      }

      onPreviewUrlFetch(data.previewUrl);
      setSuccess(`Vercel preview URL loaded: ${data.previewUrl}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch Vercel preview URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border border-border p-6 space-y-4">
        <h3 className="text-label text-foreground mb-4">GitHub Integration</h3>

        {/* GitHub Username */}
        <div>
          <label htmlFor="github_username" className="text-label text-subtle block mb-2">
            GitHub Username
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="github_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g., kirlous0"
              className="flex-1 bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
            />
            <button
              type="button"
              onClick={handleFetchRepos}
              disabled={loading || !username.trim()}
              className="px-6 py-3 bg-foreground text-background hover:bg-accent transition-colors focus-ring disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Fetch Repos'}
            </button>
          </div>
        </div>

        {/* Repository Selection */}
        {repos.length > 0 && (
          <div>
            <label htmlFor="repo_select" className="text-label text-subtle block mb-2">
              Select Repository
            </label>
            <select
              id="repo_select"
              value={selectedRepo}
              onChange={(e) => handleRepoChange(e.target.value)}
              disabled={loading}
              className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent disabled:opacity-50"
            >
              <option value="">-- Select a repository --</option>
              {repos.map((repo) => (
                <option key={repo.id} value={repo.name}>
                  {repo.name} {repo.language ? `(${repo.language})` : ''}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Vercel Preview URL */}
        {selectedRepo && (
          <div>
            <button
              type="button"
              onClick={handleFetchVercelPreview}
              disabled={loading}
              className="w-full px-6 py-3 border border-border text-foreground hover:border-foreground transition-colors focus-ring disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Fetch Vercel Preview URL'}
            </button>
            <p className="text-small text-muted mt-2">
              Automatically fetches the latest production deployment URL from Vercel
            </p>
          </div>
        )}

        {/* Error/Success Messages */}
        {error && (
          <div className="p-3 border border-error/30 bg-error/10">
            <p className="text-small text-error">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-3 border border-success/30 bg-success/10">
            <p className="text-small text-success">{success}</p>
          </div>
        )}
      </div>

      {/* Repository Info Display */}
      {repoInfo && (
        <div className="border border-border p-6 space-y-4">
          <h4 className="text-label text-foreground">Repository Information</h4>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-small text-muted mb-1">Name</p>
              <p className="text-small text-foreground">{repoInfo.name}</p>
            </div>

            <div>
              <p className="text-small text-muted mb-1">Language</p>
              <p className="text-small text-foreground">{repoInfo.language || 'Not specified'}</p>
            </div>

            <div>
              <p className="text-small text-muted mb-1">Stars</p>
              <p className="text-small text-foreground">⭐ {repoInfo.stars}</p>
            </div>

            <div>
              <p className="text-small text-muted mb-1">Forks</p>
              <p className="text-small text-foreground">🍴 {repoInfo.forks}</p>
            </div>

            <div>
              <p className="text-small text-muted mb-1">License</p>
              <p className="text-small text-foreground">{repoInfo.license || 'None'}</p>
            </div>

            <div>
              <p className="text-small text-muted mb-1">Last Updated</p>
              <p className="text-small text-foreground">
                {new Date(repoInfo.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {repoInfo.description && (
            <div>
              <p className="text-small text-muted mb-1">Description</p>
              <p className="text-small text-foreground">{repoInfo.description}</p>
            </div>
          )}

          {repoInfo.topics && repoInfo.topics.length > 0 && (
            <div>
              <p className="text-small text-muted mb-2">Topics</p>
              <div className="flex flex-wrap gap-2">
                {repoInfo.topics.map((topic: string) => (
                  <span
                    key={topic}
                    className="px-2 py-1 bg-surface text-small text-muted border border-border"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {repoInfo.languages && repoInfo.languages.length > 0 && (
            <div>
              <p className="text-small text-muted mb-2">Languages</p>
              <div className="space-y-1">
                {repoInfo.languages.slice(0, 5).map((lang: any) => (
                  <div key={lang.name} className="flex justify-between text-small">
                    <span className="text-foreground">{lang.name}</span>
                    <span className="text-muted">{lang.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {repoInfo.homepage && (
            <div>
              <p className="text-small text-muted mb-1">Homepage</p>
              <a
                href={repoInfo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-small text-accent hover:underline"
              >
                {repoInfo.homepage}
              </a>
            </div>
          )}

          <div>
            <p className="text-small text-muted mb-1">GitHub URL</p>
            <a
              href={repoInfo.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-small text-accent hover:underline"
            >
              {repoInfo.htmlUrl}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
