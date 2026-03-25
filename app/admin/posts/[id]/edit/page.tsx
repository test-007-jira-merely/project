'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import PostForm from '@/components/admin/PostForm'
import { updatePost } from '@/lib/services/posts'
import type { Post, PostUpdate } from '@/lib/types'

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchPost() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error) {
        setError('Failed to load post')
      } else {
        setPost(data)
      }
      setLoading(false)
    }

    fetchPost()
  }, [params.id])

  const handleSubmit = async (data: PostUpdate) => {
    setSaving(true)
    setError('')

    const updated = await updatePost(params.id, data)

    if (updated) {
      router.push('/admin/posts')
      router.refresh()
    } else {
      setError('Failed to update post')
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin w-12 h-12 border-4 border-teal border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!post) {
    return <div className="text-center text-white/60">Post not found</div>
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
        <h2 className="text-3xl font-bold">Edit Post</h2>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500">
          {error}
        </div>
      )}

      <PostForm post={post} onSubmit={handleSubmit} saving={saving} />
    </div>
  )
}
