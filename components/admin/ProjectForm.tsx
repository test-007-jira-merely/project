'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save } from 'lucide-react'
import { sanitizeInput } from '@/lib/utils/validation'
import { PROJECT_CATEGORIES } from '@/lib/utils/constants'
import type { Project, ProjectInsert, ProjectUpdate } from '@/lib/types'

interface ProjectFormProps {
  project?: Project
  onSubmit: (data: ProjectInsert | ProjectUpdate) => Promise<void>
  saving: boolean
}

export default function ProjectForm({ project, onSubmit, saving }: ProjectFormProps) {
  const [title, setTitle] = useState(project?.title || '')
  const [description, setDescription] = useState(project?.description || '')
  const [imageUrl, setImageUrl] = useState(project?.image_url || '')
  const [projectUrl, setProjectUrl] = useState(project?.project_url || '')
  const [category, setCategory] = useState(project?.category || 'Web Design')
  const [displayOrder, setDisplayOrder] = useState(project?.display_order || 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await onSubmit({
      title: sanitizeInput(title),
      description: sanitizeInput(description),
      image_url: imageUrl || null,
      project_url: projectUrl || null,
      category,
      display_order: displayOrder,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="glass-effect rounded-2xl p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white/80">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={saving}
            className="w-full px-4 py-3 bg-navy-light border border-white/10 rounded-lg focus:outline-none focus:border-teal transition-colors text-white placeholder:text-white/40 disabled:opacity-50"
            placeholder="Enter project title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white/80">
            Description *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={saving}
            rows={4}
            className="w-full px-4 py-3 bg-navy-light border border-white/10 rounded-lg focus:outline-none focus:border-teal transition-colors text-white placeholder:text-white/40 disabled:opacity-50 resize-y"
            placeholder="Brief description of the project"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white/80">
            Category *
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            disabled={saving}
            className="w-full px-4 py-3 bg-navy-light border border-white/10 rounded-lg focus:outline-none focus:border-teal transition-colors text-white disabled:opacity-50"
          >
            {PROJECT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white/80">
            Image URL
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            disabled={saving}
            className="w-full px-4 py-3 bg-navy-light border border-white/10 rounded-lg focus:outline-none focus:border-teal transition-colors text-white placeholder:text-white/40 disabled:opacity-50"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Project URL */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white/80">
            Project URL
          </label>
          <input
            type="url"
            value={projectUrl}
            onChange={(e) => setProjectUrl(e.target.value)}
            disabled={saving}
            className="w-full px-4 py-3 bg-navy-light border border-white/10 rounded-lg focus:outline-none focus:border-teal transition-colors text-white placeholder:text-white/40 disabled:opacity-50"
            placeholder="https://example.com"
          />
        </div>

        {/* Display Order */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white/80">
            Display Order
          </label>
          <input
            type="number"
            value={displayOrder}
            onChange={(e) => setDisplayOrder(Number(e.target.value))}
            disabled={saving}
            min="0"
            className="w-full px-4 py-3 bg-navy-light border border-white/10 rounded-lg focus:outline-none focus:border-teal transition-colors text-white placeholder:text-white/40 disabled:opacity-50"
            placeholder="0"
          />
          <p className="text-xs text-white/40 mt-1">
            Lower numbers appear first on the homepage
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-8 py-3 bg-teal hover:bg-teal-light text-white font-semibold rounded-lg transition-colors glow-effect disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5" />
          {saving ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
        </motion.button>
      </div>
    </form>
  )
}
