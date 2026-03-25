'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Save, Loader2, AlertCircle } from 'lucide-react'
import type { Project, ProjectInsert } from '@/lib/types/database'
import { createProject, updateProject } from '@/lib/services/projects'
import { PROJECT_CATEGORIES } from '@/lib/constants'

interface ProjectFormProps {
  project?: Project
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter()
  const isEditing = !!project

  const [formData, setFormData] = useState({
    title: project?.title ?? '',
    description: project?.description ?? '',
    category: project?.category ?? 'Web Design',
    image_url: project?.image_url ?? '',
    project_url: project?.project_url ?? '',
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const data: ProjectInsert = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        image_url: formData.image_url || null,
        project_url: formData.project_url || null,
      }

      if (isEditing) {
        await updateProject(project.id, data)
      } else {
        await createProject(data)
      }

      router.push('/admin/projects')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3"
        >
          <AlertCircle className="text-red-400 shrink-0" size={20} />
          <p className="text-red-200 text-sm">{error}</p>
        </motion.div>
      )}

      <div className="glass-effect rounded-xl p-6 space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-white/80">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
            className="w-full px-4 py-3 bg-navy-dark border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-teal transition-colors"
            placeholder="Project title"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-white/80">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            required
            rows={3}
            className="w-full px-4 py-3 bg-navy-dark border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-teal transition-colors resize-none"
            placeholder="Brief project description"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-medium text-white/80">
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full px-4 py-3 bg-navy-dark border border-white/10 rounded-lg text-white focus:outline-none focus:border-teal transition-colors"
          >
            {PROJECT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="image_url" className="block text-sm font-medium text-white/80">
            Image URL (optional)
          </label>
          <input
            id="image_url"
            type="url"
            value={formData.image_url}
            onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
            className="w-full px-4 py-3 bg-navy-dark border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-teal transition-colors"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="project_url" className="block text-sm font-medium text-white/80">
            Project URL (optional)
          </label>
          <input
            id="project_url"
            type="url"
            value={formData.project_url}
            onChange={(e) => setFormData(prev => ({ ...prev, project_url: e.target.value }))}
            className="w-full px-4 py-3 bg-navy-dark border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-teal transition-colors"
            placeholder="https://project-url.com"
          />
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        className="px-8 py-3 bg-teal text-white rounded-lg font-medium hover:bg-teal-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Saving...
          </>
        ) : (
          <>
            <Save size={18} />
            {isEditing ? 'Update Project' : 'Create Project'}
          </>
        )}
      </motion.button>
    </form>
  )
}
