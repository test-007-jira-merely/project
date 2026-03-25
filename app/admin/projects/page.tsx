'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, ExternalLink, Search, Loader2 } from 'lucide-react';
import { getProjects, deleteProject } from '@/lib/db/projects';
import { ROUTES, PROJECT_FILTER_OPTIONS } from '@/lib/constants';
import { Skeleton, EmptyState, ErrorState } from '@/components/ui';
import type { Project } from '@/types/database';

type FilterOption = (typeof PROJECT_FILTER_OPTIONS)[number];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<FilterOption>('All');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const result = await getProjects();

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    setProjects(result.data || []);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    setDeletingId(id);
    const result = await deleteProject(id);

    if (result.error) {
      alert(`Failed to delete project: ${result.error}`);
    } else {
      setProjects(projects.filter((p) => p.id !== id));
    }

    setDeletingId(null);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || project.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="text-white/60">Manage your portfolio projects</p>
        </div>
        <Link
          href={`${ROUTES.ADMIN_PROJECTS}/new`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white rounded-lg font-medium hover:bg-teal-light transition-colors"
        >
          <Plus size={20} />
          New Project
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal transition-colors"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as FilterOption)}
          className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-teal transition-colors"
        >
          {PROJECT_FILTER_OPTIONS.map((option) => (
            <option key={option} value={option} className="bg-navy">
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      ) : error ? (
        <ErrorState message={error} onRetry={fetchProjects} />
      ) : filteredProjects.length === 0 ? (
        <EmptyState
          title={searchQuery || categoryFilter !== 'All' ? 'No projects found' : 'No projects yet'}
          description={
            searchQuery || categoryFilter !== 'All'
              ? 'Try different filters'
              : 'Add your first project to showcase your work'
          }
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-effect rounded-xl overflow-hidden"
            >
              {/* Image */}
              <div className="h-40 bg-gradient-to-br from-teal/20 to-purple-600/20 relative">
                {project.image_url && (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-white">{project.title}</h3>
                  <span className="px-2 py-1 bg-teal/20 text-teal text-xs rounded-full flex-shrink-0">
                    {project.category}
                  </span>
                </div>
                <p className="text-white/60 text-sm line-clamp-2">{project.description}</p>
                <p className="text-white/40 text-xs">{formatDate(project.created_at)}</p>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                  {project.project_url && (
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="View project"
                    >
                      <ExternalLink size={18} className="text-white/60" />
                    </a>
                  )}
                  <Link
                    href={`${ROUTES.ADMIN_PROJECTS}/${project.id}`}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Edit project"
                  >
                    <Edit size={18} className="text-white/60" />
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id)}
                    disabled={deletingId === project.id}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                    title="Delete project"
                  >
                    {deletingId === project.id ? (
                      <Loader2 size={18} className="text-red-400 animate-spin" />
                    ) : (
                      <Trash2 size={18} className="text-red-400" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
