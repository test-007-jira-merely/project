'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getPosts, deletePost, togglePostPublished } from '@/lib/supabase/queries/posts'
import type { Post } from '@/lib/supabase/types'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      const data = await getPosts()
      setPosts(data)
    } catch (error) {
      toast.error('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    try {
      await deletePost(id)
      setPosts(posts.filter(p => p.id !== id))
      toast.success('Post deleted successfully')
    } catch (error) {
      toast.error('Failed to delete post')
    }
  }

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      await togglePostPublished(id, !currentStatus)
      setPosts(posts.map(p =>
        p.id === id ? { ...p, published: !currentStatus } : p
      ))
      toast.success(currentStatus ? 'Post unpublished' : 'Post published')
    } catch (error) {
      toast.error('Failed to update post')
    }
  }

  if (loading) {
    return <div className="text-white">Loading...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Posts</h1>
        <Link href="/admin/posts/new">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all">
            <Plus className="w-5 h-5" />
            <span>New Post</span>
          </button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-12 text-center">
          <p className="text-slate-400 mb-4">No posts yet</p>
          <Link href="/admin/posts/new">
            <button className="px-4 py-2 bg-teal-500/20 text-teal-400 font-medium rounded-lg hover:bg-teal-500/30 transition-colors">
              Create your first post
            </button>
          </Link>
        </div>
      ) : (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Title</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Slug</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Created</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{post.title}</td>
                  <td className="px-6 py-4 text-slate-400">{post.slug}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleTogglePublish(post.id, post.published)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        post.published
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Link href={`/admin/posts/${post.id}/edit`}>
                        <button className="p-2 text-slate-400 hover:text-teal-400 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
