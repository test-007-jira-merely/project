import { getPostById } from '@/lib/supabase/queries/posts'
import PostForm from '@/components/admin/PostForm'
import { notFound } from 'next/navigation'

export default async function EditPostPage({
  params,
}: {
  params: { id: string }
}) {
  const post = await getPostById(params.id)

  if (!post) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Edit Post</h1>
      <PostForm post={post} />
    </div>
  )
}
