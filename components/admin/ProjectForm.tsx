'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Project, CreateProjectInput } from '@/lib/supabase/types'
import { createProject, updateProject } from '@/lib/supabase/queries/projects'
import { toast } from 'sonner'

interface ProjectFormProps {
  project?: Project
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    image_url: project?.image_url || '',
    project_url: project?.project_url || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (project) {
        await updateProject(project.id, formData)
        toast.success('Project updated successfully')
      } else {
        await createProject(formData as CreateProjectInput)
        toast.success('Project created successfully')
      }
      router.push('/admin/projects')
      router.refresh()
    } catch (error) {
      toast.error(project ? 'Failed to update project' : 'Failed to create project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Project title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Description *
          </label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Brief project description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Image URL *
          </label>
          <input
            type="url"
            required
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="https://..."
          />
          {formData.image_url && (
            <div className="mt-4 rounded-lg overflow-hidden">
              <img
                src={formData.image_url}
                alt="Preview"
                className="w-full h-auto"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Project URL
          </label>
          <input
            type="url"
            value={formData.project_url}
            onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="https://..."
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-lg hover:from-teal-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-white/5 border border-white/10 text-slate-300 font-medium rounded-lg hover:bg-white/10 hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}
