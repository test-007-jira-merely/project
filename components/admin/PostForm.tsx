'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Save, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react'
import type { Post, PostInsert } from '@/lib/types/database'
import { createPost, updatePost } from '@/lib/services/posts'

interface PostFormProps {
  post?: Post
}

export default function PostForm({ post }: PostFormProps) {
  const router = useRouter()
  const isEditing = !!post

  const [formData, setFormData] = useState({
    title: post?.title ?? '',
    slug: post?.slug ?? '',
    content: post?.content ?? '',
    cover_image: post?.cover_image ?? '',
    published: post?.published ?? false,
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData(prev => ({
      ...prev,
      title,
      slug: isEditing ? prev.slug : generateSlug(title),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const data: PostInsert = {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        cover_image: formData.cover_image || null,
        published: formData.published,
      }

      if (isEditing) {
        await updatePost(post.id, data)
      } else {
        await createPost(data)
      }

      router.push('/admin/posts')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-effect rounded-xl p-6 space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-white/80">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                required
                className="w-full px-4 py-3 bg-navy-dark border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-teal transition-colors"
                placeholder="Enter post title"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="slug" className="block text-sm font-medium text-white/80">
                Slug
              </label>
              <div className="flex items-center">
                <span className="px-4 py-3 bg-navy-dark/50 border border-r-0 border-white/10 rounded-l-lg text-white/40">
                  /blog/
                </span>
                <input
                  id="slug"
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  required
                  className="flex-1 px-4 py-3 bg-navy-dark border border-white/10 rounded-r-lg text-white placeholder:text-white/30 focus:outline-none focus:border-teal transition-colors"
                  placeholder="post-slug"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="block text-sm font-medium text-white/80">
                Content (Markdown)
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                rows={15}
                className="w-full px-4 py-3 bg-navy-dark border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-teal transition-colors font-mono text-sm resize-none"
                placeholder="Write your post content in markdown..."
              />
              <p className="text-white/40 text-xs">Supports Markdown formatting</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="glass-effect rounded-xl p-6 space-y-6">
            <h3 className="font-semibold">Settings</h3>

            <div className="space-y-2">
              <label htmlFor="cover_image" className="block text-sm font-medium text-white/80">
                Cover Image URL
              </label>
              <input
                id="cover_image"
                type="url"
                value={formData.cover_image}
                onChange={(e) => setFormData(prev => ({ ...prev, cover_image: e.target.value }))}
                className="w-full px-4 py-3 bg-navy-dark border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-teal transition-colors"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white/80">Published</span>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, published: !prev.published }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.published ? 'bg-teal' : 'bg-white/20'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.published ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center gap-2 text-sm">
              {formData.published ? (
                <>
                  <Eye size={16} className="text-green-400" />
                  <span className="text-green-400">Will be visible to public</span>
                </>
              ) : (
                <>
                  <EyeOff size={16} className="text-yellow-400" />
                  <span className="text-yellow-400">Saved as draft</span>
                </>
              )}
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className="w-full py-3 bg-teal text-white rounded-lg font-medium hover:bg-teal-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                {isEditing ? 'Update Post' : 'Create Post'}
              </>
            )}
          </motion.button>
        </div>
      </div>
    </form>
  )
}
