'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Project, ProjectInsert, ProjectUpdate } from '@/lib/types/database'
import {
  createProject,
  updateProject,
  deleteProject,
} from '@/lib/services/projects'

interface ProjectsManagerProps {
  projects: Project[]
}

export default function ProjectsManager({ projects }: ProjectsManagerProps) {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const [formData, setFormData] = useState<ProjectInsert>({
    title: '',
    description: '',
    image_url: '',
    project_url: '',
  })

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await createProject(formData)

    if (result.error) {
      alert(`Error: ${result.error}`)
    } else {
      setFormData({
        title: '',
        description: '',
        image_url: '',
        project_url: '',
      })
      setIsCreating(false)
      router.refresh()
    }
  }

  const handleUpdate = async (id: string, updates: ProjectUpdate) => {
    const result = await updateProject(id, updates)

    if (result.error) {
      alert(`Error: ${result.error}`)
    } else {
      setEditingId(null)
      router.refresh()
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return
    }

    setDeletingId(id)
    const result = await deleteProject(id)

    if (result.error) {
      alert(`Error: ${result.error}`)
    } else {
      router.refresh()
    }

    setDeletingId(null)
  }

  return (
    <div className="space-y-6">
      {!isCreating ? (
        <button
          onClick={() => setIsCreating(true)}
          className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all"
        >
          + Add Project
        </button>
      ) : (
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">New Project</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <input
              type="text"
              placeholder="Project Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              rows={3}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
            />
            <input
              type="url"
              placeholder="Image URL"
              value={formData.image_url}
              onChange={(e) =>
                setFormData({ ...formData, image_url: e.target.value })
              }
              required
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
            />
            <input
              type="url"
              placeholder="Project URL"
              value={formData.project_url}
              onChange={(e) =>
                setFormData({ ...formData, project_url: e.target.value })
              }
              required
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
            />
            <div className="flex space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 bg-white/5 text-slate-300 rounded-lg hover:bg-white/10"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl overflow-hidden"
          >
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-3">
              <h3 className="text-white font-semibold">{project.title}</h3>
              <p className="text-slate-300 text-sm">{project.description}</p>
              <div className="flex space-x-2">
                <a
                  href={project.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:text-teal-300 text-sm"
                >
                  View →
                </a>
                <button
                  onClick={() => handleDelete(project.id, project.title)}
                  disabled={deletingId === project.id}
                  className="ml-auto text-red-400 hover:text-red-300 text-sm disabled:opacity-50"
                >
                  {deletingId === project.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
