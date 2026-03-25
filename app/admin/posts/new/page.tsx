import PostForm from '@/components/admin/PostForm'

export default function NewPostPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Create New Post</h1>
        <p className="text-slate-300">Write and publish a new blog post</p>
      </div>

      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8">
        <PostForm mode="create" />
      </div>
    </div>
  )
}
