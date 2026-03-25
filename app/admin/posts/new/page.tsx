'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PostForm from '@/components/admin/PostForm'
import { createPost, generateSlug } from '@/lib/services/posts'
import type { PostInsert } from '@/lib/types'

export default function NewPostPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (data: Omit<PostInsert, 'slug'> & { slug?: string }) => {
    setSaving(true)
    setError('')

    const slug = data.slug || generateSlug(data.title)

    const post = await createPost({
      ...data,
      slug,
    })

    if (post) {
      router.push('/admin/posts')
      router.refresh()
    } else {
      setError('Failed to create post. Slug might already exist.')
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-2 text-white/60 hover:text-teal transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to posts
        </Link>
        <h2 className="text-3xl font-bold">Create New Post</h2>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500">
          {error}
        </div>
      )}

      <PostForm onSubmit={handleSubmit} saving={saving} />
    </div>
  )
}
