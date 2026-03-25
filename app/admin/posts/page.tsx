import { getPosts } from '@/lib/services/posts'
import Link from 'next/link'
import PostsList from '@/components/admin/PostsList'

export default async function AdminPostsPage() {
  const result = await getPosts({ page: 1, pageSize: 50, publishedOnly: false })
  const posts = result.data?.data || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Blog Posts</h1>
          <p className="text-slate-300">Manage your blog posts</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all"
        >
          + New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-12 text-center">
          <p className="text-slate-300 text-lg mb-4">No posts yet</p>
          <Link
            href="/admin/posts/new"
            className="inline-block px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all"
          >
            Create your first post
          </Link>
        </div>
      ) : (
        <PostsList posts={posts} />
      )}
    </div>
  )
}
