import { getPostById } from '@/lib/services/posts'
import { notFound } from 'next/navigation'
import PostForm from '@/components/admin/PostForm'

export default async function EditPostPage({
  params,
}: {
  params: { id: string }
}) {
  const result = await getPostById(params.id)

  if (result.error || !result.data) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Edit Post</h1>
        <p className="text-slate-300">Update your blog post</p>
      </div>

      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8">
        <PostForm post={result.data} mode="edit" />
      </div>
    </div>
  )
}
