'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Eye } from 'lucide-react'
import { generateSlug } from '@/lib/services/posts'
import { validateSlug, sanitizeInput } from '@/lib/utils/validation'
import type { Post, PostInsert, PostUpdate } from '@/lib/types'

interface PostFormProps {
  post?: Post
  onSubmit: (data: PostInsert | PostUpdate) => Promise<void>
  saving: boolean
}

export default function PostForm({ post, onSubmit, saving }: PostFormProps) {
  const [title, setTitle] = useState(post?.title || '')
  const [slug, setSlug] = useState(post?.slug || '')
  const [content, setContent] = useState(post?.content || '')
  const [coverImage, setCoverImage] = useState(post?.cover_image || '')
  const [published, setPublished] = useState(post?.published || false)
  const [autoSlug, setAutoSlug] = useState(!post)

  useEffect(() => {
    if (autoSlug && title) {
      setSlug(generateSlug(title))
    }
  }, [title, autoSlug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateSlug(slug)) {
      alert('Slug can only contain lowercase letters, numbers, and hyphens')
      return
    }

    await onSubmit({
      title: sanitizeInput(title),
      slug,
      content,
      cover_image: coverImage || null,
      published,
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
            placeholder="Enter post title"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white/80">
            Slug *
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value)
                setAutoSlug(false)
              }}
              required
              disabled={saving}
              className="flex-1 px-4 py-3 bg-navy-light border border-white/10 rounded-lg focus:outline-none focus:border-teal transition-colors text-white placeholder:text-white/40 disabled:opacity-50"
              placeholder="post-url-slug"
            />
            <button
              type="button"
              onClick={() => {
                setSlug(generateSlug(title))
                setAutoSlug(true)
              }}
              className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-white/80 text-sm"
            >
              Auto-generate
            </button>
          </div>
          <p className="text-xs text-white/40 mt-1">
            URL: /blog/{slug || 'your-slug-here'}
          </p>
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white/80">
            Cover Image URL
          </label>
          <input
            type="url"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            disabled={saving}
            className="w-full px-4 py-3 bg-navy-light border border-white/10 rounded-lg focus:outline-none focus:border-teal transition-colors text-white placeholder:text-white/40 disabled:opacity-50"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white/80">
            Content *
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            disabled={saving}
            rows={15}
            className="w-full px-4 py-3 bg-navy-light border border-white/10 rounded-lg focus:outline-none focus:border-teal transition-colors text-white placeholder:text-white/40 disabled:opacity-50 font-mono text-sm resize-y"
            placeholder="Write your post content here... (supports markdown formatting)"
          />
          <p className="text-xs text-white/40 mt-1">
            Tip: Use markdown for formatting
          </p>
        </div>

        {/* Published Toggle */}
        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            disabled={saving}
            className="w-5 h-5 bg-navy-light border-2 border-white/20 rounded checked:bg-teal checked:border-teal focus:outline-none focus:ring-2 focus:ring-teal/50 transition-colors cursor-pointer disabled:opacity-50"
          />
          <label htmlFor="published" className="flex items-center gap-2 cursor-pointer">
            <Eye className="w-5 h-5 text-teal" />
            <div>
              <p className="font-medium text-white">Publish post</p>
              <p className="text-xs text-white/60">
                Make this post visible to the public
              </p>
            </div>
          </label>
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
          {saving ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
        </motion.button>
      </div>
    </form>
  )
}
