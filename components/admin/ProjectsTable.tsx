'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Edit, Trash2, ExternalLink, Loader2 } from 'lucide-react';
import type { Project } from '@/lib/database.types';

interface ProjectsTableProps {
  projects: Project[];
}

export default function ProjectsTable({ projects }: ProjectsTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');

      router.refresh();
    } catch (error) {
      alert('Failed to delete project');
    } finally {
      setDeletingId(null);
    }
  };

  if (projects.length === 0) {
    return (
      <div className="glass-effect rounded-2xl p-12 text-center">
        <p className="text-white/50 mb-4">No projects found</p>
        <Link
          href="/admin/projects/new"
          className="text-teal hover:text-teal-light transition-colors"
        >
          Add your first project
        </Link>
      </div>
    );
  }

  return (
    <div className="glass-effect rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-white/5">
          <tr>
            <th className="text-left px-6 py-4 text-white/60 font-medium">Title</th>
            <th className="text-left px-6 py-4 text-white/60 font-medium">Category</th>
            <th className="text-left px-6 py-4 text-white/60 font-medium">Date</th>
            <th className="text-right px-6 py-4 text-white/60 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {projects.map((project) => (
            <motion.tr
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hover:bg-white/5 transition-colors"
            >
              <td className="px-6 py-4">
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="font-medium hover:text-teal transition-colors"
                >
                  {project.title}
                </Link>
              </td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 bg-teal/20 text-teal rounded-full text-xs">
                  {project.category}
                </span>
              </td>
              <td className="px-6 py-4 text-white/60">
                {new Date(project.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  {project.project_url && (
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="View Project"
                    >
                      <ExternalLink size={18} className="text-white/60" />
                    </a>
                  )}
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit size={18} className="text-teal" />
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id)}
                    disabled={deletingId === project.id}
                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    {deletingId === project.id ? (
                      <Loader2 size={18} className="animate-spin text-red-400" />
                    ) : (
                      <Trash2 size={18} className="text-red-400" />
                    )}
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
