'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Post, CreatePostInput } from '@/lib/supabase/types'
import { createPost, updatePost } from '@/lib/supabase/queries/posts'
import { toast } from 'sonner'

interface PostFormProps {
  post?: Post
}

export default function PostForm({ post }: PostFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    content: post?.content || '',
    cover_image: post?.cover_image || '',
    published: post?.published || false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (post) {
        await updatePost(post.id, formData)
        toast.success('Post updated successfully')
      } else {
        await createPost(formData as CreatePostInput)
        toast.success('Post created successfully')
      }
      router.push('/admin/posts')
      router.refresh()
    } catch (error) {
      toast.error(post ? 'Failed to update post' : 'Failed to create post')
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    setFormData({ ...formData, slug })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
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
              placeholder="Enter post title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Slug *
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="post-slug"
              />
              <button
                type="button"
                onClick={generateSlug}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                Generate
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Content * (Markdown supported)
            </label>
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={20}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono text-sm"
              placeholder="Write your post content in markdown..."
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Publish</h3>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-5 h-5 rounded border-white/10 bg-white/5 text-teal-500 focus:ring-2 focus:ring-teal-500"
              />
              <label htmlFor="published" className="text-slate-300">
                Published
              </label>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-lg hover:from-teal-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="w-full py-3 px-4 bg-white/5 border border-white/10 text-slate-300 font-medium rounded-lg hover:bg-white/10 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Cover Image URL
            </label>
            <input
              type="url"
              value={formData.cover_image}
              onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="https://..."
            />
            {formData.cover_image && (
              <div className="mt-4 rounded-lg overflow-hidden">
                <img
                  src={formData.cover_image}
                  alt="Cover preview"
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}
