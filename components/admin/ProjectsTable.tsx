'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Edit, Trash2, Loader2, ExternalLink } from 'lucide-react'
import type { Project } from '@/lib/types/database'
import { deleteProject } from '@/lib/services/projects'

interface ProjectsTableProps {
  projects: Project[]
}

export default function ProjectsTable({ projects }: ProjectsTableProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    setDeletingId(id)
    try {
      await deleteProject(id)
      router.refresh()
    } catch (error) {
      console.error('Error deleting project:', error)
    } finally {
      setDeletingId(null)
    }
  }

  if (projects.length === 0) {
    return (
      <div className="glass-effect rounded-xl p-12 text-center">
        <p className="text-white/60 mb-4">No projects yet</p>
        <Link
          href="/admin/projects/new"
          className="inline-block px-6 py-3 bg-teal text-white rounded-lg font-medium hover:bg-teal-light transition-colors"
        >
          Add your first project
        </Link>
      </div>
    )
  }

  return (
    <div className="glass-effect rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-4 text-white/60 font-medium">Title</th>
              <th className="text-left p-4 text-white/60 font-medium">Category</th>
              <th className="text-left p-4 text-white/60 font-medium">Created</th>
              <th className="text-right p-4 text-white/60 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {projects.map((project) => (
                <motion.tr
                  key={project.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{project.title}</p>
                      <p className="text-white/40 text-sm line-clamp-1">{project.description}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex px-3 py-1 bg-teal/20 text-teal text-xs rounded-full border border-teal/30">
                      {project.category}
                    </span>
                  </td>
                  <td className="p-4 text-white/60 text-sm">
                    {new Date(project.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      {project.project_url && (
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                          title="View project"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="p-2 text-white/50 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                        title="Edit project"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
                        disabled={deletingId === project.id}
                        className="p-2 text-white/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete project"
                      >
                        {deletingId === project.id ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  )
}
