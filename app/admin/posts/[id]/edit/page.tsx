import { notFound } from 'next/navigation'
import PostForm from '@/components/admin/PostForm'
import { createClient } from '@/lib/supabase/server'

interface EditPostPageProps {
  params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !post) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Edit Post</h1>
        <p className="text-white/60">Update your blog post</p>
      </div>

      <PostForm post={post} />
    </div>
  )
}
