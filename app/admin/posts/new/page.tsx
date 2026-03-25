import PostForm from '@/components/admin/PostForm'

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Create New Post</h1>
        <p className="text-white/60">Write and publish a new blog post</p>
      </div>

      <PostForm />
    </div>
  )
}
