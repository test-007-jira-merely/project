'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Edit, Trash2 } from 'lucide-react'
import { deleteProject } from '@/lib/services/projects'
import type { Project } from '@/lib/types'

interface ProjectsTableProps {
  projects: Project[]
}

export default function ProjectsTable({ projects }: ProjectsTableProps) {
  const router = useRouter()
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    setDeleting(id)
    const success = await deleteProject(id)

    if (success) {
      router.refresh()
    } else {
      alert('Failed to delete project')
      setDeleting(null)
    }
  }

  if (projects.length === 0) {
    return (
      <div className="glass-effect rounded-2xl p-12 text-center">
        <p className="text-white/60 mb-4">No projects yet</p>
        <p className="text-white/40 text-sm">Create your first project to get started</p>
      </div>
    )
  }

  return (
    <div className="glass-effect rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">
                Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">
                Order
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-white/80">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {projects.map((project) => (
              <motion.tr
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-white/5 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {project.image_url && (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <p className="font-medium text-white">{project.title}</p>
                      <p className="text-sm text-white/60 line-clamp-1">{project.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-teal/20 text-teal text-xs rounded-full">
                    {project.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-white/60 text-sm">
                  {project.display_order}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => router.push(`/admin/projects/${project.id}/edit`)}
                      className="p-2 hover:bg-teal/20 text-teal rounded-lg transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      disabled={deleting === project.id}
                      className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
