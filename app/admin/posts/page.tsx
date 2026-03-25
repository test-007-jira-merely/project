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
          <h2 className="text-3xl font-bold">Posts</h2>
          <p className="text-white/60">Manage your blog posts</p>
        </div>
        <Link href="/admin/posts/new">
          <button className="flex items-center gap-2 px-6 py-3 bg-teal hover:bg-teal-light text-white font-semibold rounded-lg transition-colors glow-effect">
            <Plus className="w-5 h-5" />
            New Post
          </button>
        </Link>
      </div>

      <PostsTable posts={posts} />
    </div>
  )
}
