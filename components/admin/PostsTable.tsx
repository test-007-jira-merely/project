'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Edit, Trash2, Eye, EyeOff, Loader2, ExternalLink } from 'lucide-react'
import type { Post } from '@/lib/types/database'
import { deletePost, togglePostPublished } from '@/lib/services/posts'

interface PostsTableProps {
  posts: Post[]
}

export default function PostsTable({ posts }: PostsTableProps) {
  const router = useRouter()
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleTogglePublish = async (post: Post) => {
    setLoadingId(post.id)
    try {
      await togglePostPublished(post.id, !post.published)
      router.refresh()
    } catch (error) {
      console.error('Error toggling publish:', error)
    } finally {
      setLoadingId(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    setDeletingId(id)
    try {
      await deletePost(id)
      router.refresh()
    } catch (error) {
      console.error('Error deleting post:', error)
    } finally {
      setDeletingId(null)
    }
  }

  if (posts.length === 0) {
    return (
      <div className="glass-effect rounded-xl p-12 text-center">
        <p className="text-white/60 mb-4">No posts yet</p>
        <Link
          href="/admin/posts/new"
          className="inline-block px-6 py-3 bg-teal text-white rounded-lg font-medium hover:bg-teal-light transition-colors"
        >
          Create your first post
        </Link>
      </div>
    )
  }

  return (
    <div className="glass-effect rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-4 text-white/60 font-medium">Title</th>
              <th className="text-left p-4 text-white/60 font-medium">Status</th>
              <th className="text-left p-4 text-white/60 font-medium">Created</th>
              <th className="text-right p-4 text-white/60 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {posts.map((post) => (
                <motion.tr
                  key={post.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{post.title}</p>
                      <p className="text-white/40 text-sm">/blog/{post.slug}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                        post.published
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {post.published ? <Eye size={12} /> : <EyeOff size={12} />}
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-4 text-white/60 text-sm">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      {post.published && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                          title="View post"
                        >
                          <ExternalLink size={18} />
                        </Link>
                      )}
                      <button
                        onClick={() => handleTogglePublish(post)}
                        disabled={loadingId === post.id}
                        className="p-2 text-white/50 hover:text-teal hover:bg-teal/10 rounded-lg transition-colors disabled:opacity-50"
                        title={post.published ? 'Unpublish' : 'Publish'}
                      >
                        {loadingId === post.id ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : post.published ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="p-2 text-white/50 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                        title="Edit post"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        disabled={deletingId === post.id}
                        className="p-2 text-white/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete post"
                      >
                        {deletingId === post.id ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  )
}
