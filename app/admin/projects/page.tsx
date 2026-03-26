'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getProjects, deleteProject } from '@/lib/supabase/queries/projects'
import type { Project } from '@/lib/supabase/types'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const data = await getProjects()
      setProjects(data)
    } catch (error) {
      toast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    try {
      await deleteProject(id)
      setProjects(projects.filter(p => p.id !== id))
      toast.success('Project deleted successfully')
    } catch (error) {
      toast.error('Failed to delete project')
    }
  }

  if (loading) {
    return <div className="text-white">Loading...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Projects</h1>
        <Link href="/admin/projects/new">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all">
            <Plus className="w-5 h-5" />
            <span>New Project</span>
          </button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-12 text-center">
          <p className="text-slate-400 mb-4">No projects yet</p>
          <Link href="/admin/projects/new">
            <button className="px-4 py-2 bg-teal-500/20 text-teal-400 font-medium rounded-lg hover:bg-teal-500/30 transition-colors">
              Create your first project
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors"
            >
              <div className="aspect-video bg-slate-800">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {new Date(project.created_at).toLocaleDateString()}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Link href={`/admin/projects/${project.id}/edit`}>
                      <button className="p-2 text-slate-400 hover:text-teal-400 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id, project.title)}
                      className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
