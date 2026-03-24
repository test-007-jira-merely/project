'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Loader2, ExternalLink } from 'lucide-react';
import { projectsService } from '@/lib/services';
import { ROUTES, COLOR_MAP } from '@/lib/constants';
import { Skeleton, EmptyState, ErrorState } from '@/components/ui';
import type { Project } from '@/types/database';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);

    const result = await projectsService.getAll();

    if (result.error) {
      setError(result.error);
    } else if (result.data) {
      setProjects(result.data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    setDeletingId(id);
    const result = await projectsService.delete(id);

    if (result.error) {
      alert(result.error);
    } else {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }

    setDeletingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-white/60 mt-1">Manage your portfolio projects</p>
        </div>
        <Link
          href={ROUTES.ADMIN_PROJECT_NEW}
          className="px-4 py-2 bg-teal text-white rounded-lg font-medium hover:bg-teal-light transition-colors duration-300 flex items-center gap-2"
        >
          <Plus size={20} />
          New Project
        </Link>
      </motion.div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-effect rounded-xl overflow-hidden">
              <Skeleton className="h-32 w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <ErrorState message={error} onRetry={fetchProjects} />
      ) : projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="Add your first project to showcase your work"
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-effect rounded-xl overflow-hidden group"
            >
              {/* Image */}
              <div
                className={`h-32 relative ${
                  project.image_url
                    ? ''
                    : COLOR_MAP[project.color as keyof typeof COLOR_MAP] ||
                      'bg-purple-600'
                }`}
              >
                {project.image_url && (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold mb-1">{project.title}</h3>
                <p className="text-white/60 text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 bg-teal/20 text-teal text-xs rounded-full">
                    {project.category}
                  </span>

                  <div className="flex items-center gap-1">
                    {project.project_url && (
                      <a
                        href={project.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                    <Link
                      href={ROUTES.ADMIN_PROJECT_EDIT(project.id)}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
                    >
                      <Edit size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      disabled={deletingId === project.id}
                      className="p-2 rounded-lg hover:bg-red-500/20 text-white/70 hover:text-red-400 transition-colors duration-300 disabled:opacity-50"
                    >
                      {deletingId === project.id ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
