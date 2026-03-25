'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Post, PostInsert, PostUpdate } from '@/lib/types/database'
import { createPost, updatePost, generateSlug } from '@/lib/services/posts'

interface PostFormProps {
  post?: Post
  mode: 'create' | 'edit'
}

export default function PostForm({ post, mode }: PostFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(post?.title || '')
  const [slug, setSlug] = useState(post?.slug || '')
  const [content, setContent] = useState(post?.content || '')
  const [coverImage, setCoverImage] = useState(post?.cover_image || '')
  const [published, setPublished] = useState(post?.published || false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [slugEdited, setSlugEdited] = useState(false)

  useEffect(() => {
    if (!slugEdited && title && mode === 'create') {
      const timeoutId = setTimeout(async () => {
        const newSlug = await generateSlug(title)
        setSlug(newSlug)
      }, 500)
      return () => clearTimeout(timeoutId)
    }
  }, [title, mode, slugEdited])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'create') {
        const postData: PostInsert = {
          title,
          slug,
          content,
          cover_image: coverImage || null,
          published,
        }
        const result = await createPost(postData)

        if (result.error) {
          setError(result.error)
        } else {
          router.push('/admin/posts')
          router.refresh()
        }
      } else if (post) {
        const updates: PostUpdate = {
          title,
          slug,
          content,
          cover_image: coverImage || null,
          published,
        }
        const result = await updatePost(post.id, updates)

        if (result.error) {
          setError(result.error)
        } else {
          router.push('/admin/posts')
          router.refresh()
        }
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="Enter post title"
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Slug *
        </label>
        <input
          type="text"
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value)
            setSlugEdited(true)
          }}
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="post-url-slug"
          disabled={loading}
        />
        <p className="text-slate-400 text-sm mt-1">
          URL: /blog/{slug || 'post-url-slug'}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Cover Image URL
        </label>
        <input
          type="url"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="https://example.com/image.jpg"
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Content * (Markdown supported)
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={15}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono text-sm"
          placeholder="Write your post content in Markdown..."
          disabled={loading}
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="published"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="w-5 h-5 rounded border-white/10 bg-white/5 text-teal-500 focus:ring-2 focus:ring-teal-500 focus:ring-offset-0"
          disabled={loading}
        />
        <label htmlFor="published" className="ml-3 text-slate-300">
          Publish immediately
        </label>
      </div>

      <div className="flex items-center space-x-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : mode === 'create' ? 'Create Post' : 'Update Post'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading}
          className="px-6 py-3 bg-white/5 text-slate-300 font-semibold rounded-lg hover:bg-white/10 transition-all disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
