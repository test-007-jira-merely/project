import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getAllPosts } from '@/lib/services/posts'
import PostsTable from '@/components/admin/PostsTable'

export default async function AdminPostsPage() {
  const posts = await getAllPosts()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Posts</h1>
          <p className="text-white/60">Manage your blog posts</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="px-4 py-2 bg-teal text-white rounded-lg font-medium hover:bg-teal-light transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          New Post
        </Link>
      </div>

      <PostsTable posts={posts} />
    </div>
  )
}
