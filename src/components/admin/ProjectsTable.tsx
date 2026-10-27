'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Project } from '@/types';
import { getProjectStateLabel } from '@/lib/utils';

interface ProjectsTableProps {
  projects: Project[];
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(project => {
    const query = searchQuery.toLowerCase();
    return (
      project.title_en?.toLowerCase().includes(query) ||
      project.title_ar?.toLowerCase().includes(query) ||
      project.category?.toLowerCase().includes(query) ||
      project.technologies?.some(t => t.toLowerCase().includes(query))
    );
  });

  return (
    <>
      {/* Search */}
      {projects.length > 0 && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search projects by title, category, or technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-border px-4 py-3 text-foreground focus-ring focus:border-accent"
          />
        </div>
      )}

      {filteredProjects.length === 0 ? (
        <div className="border border-border p-12 text-center">
          <p className="text-body text-muted mb-4">
            {projects.length === 0 ? 'No projects yet' : 'No projects match your search'}
          </p>
          {projects.length === 0 ? (
            <Link
              href="/admin/projects/new"
              className="text-small text-foreground underline hover:text-accent transition-colors"
            >
              Create your first project
            </Link>
          ) : (
            <button
              onClick={() => setSearchQuery('')}
              className="text-small text-foreground underline hover:text-accent transition-colors"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="border border-border">
          <table className="w-full">
            <thead className="border-b border-border bg-surface">
              <tr>
                <th className="text-start text-label text-subtle px-4 py-3">Title</th>
                <th className="text-start text-label text-subtle px-4 py-3 hidden md:table-cell">Category</th>
                <th className="text-start text-label text-subtle px-4 py-3 hidden md:table-cell">State</th>
                <th className="text-start text-label text-subtle px-4 py-3">Status</th>
                <th className="text-end text-label text-subtle px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.id} className="border-b border-border last:border-0 hover:bg-surface/50 transition-colors">
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-small text-foreground">{project.title_en || 'Untitled'}</p>
                      {project.title_ar && (
                        <p className="text-xs text-muted mt-0.5">{project.title_ar}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-small text-muted">{project.category || '—'}</span>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-small text-muted">{getProjectStateLabel(project.state, 'en')}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      {project.is_published ? (
                        <span className="text-label text-success">Published</span>
                      ) : (
                        <span className="text-label text-warning">Draft</span>
                      )}
                      {project.is_featured && (
                        <span className="text-label text-accent">★</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-end">
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="text-small text-muted hover:text-foreground transition-colors focus-ring"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {searchQuery && (
            <div className="p-4 border-t border-border bg-surface">
              <p className="text-small text-muted">
                Showing {filteredProjects.length} of {projects.length} projects
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
