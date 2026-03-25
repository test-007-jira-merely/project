'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { deletePost, togglePostPublished } from '@/lib/services/posts'
import type { Post } from '@/lib/types'

interface PostsTableProps {
  posts: Post[]
}

export default function PostsTable({ posts }: PostsTableProps) {
  const router = useRouter()
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    setDeleting(id)
    const success = await deletePost(id)

    if (success) {
      router.refresh()
    } else {
      alert('Failed to delete post')
      setDeleting(null)
    }
  }

  const handleTogglePublished = async (id: string, published: boolean) => {
    const success = await togglePostPublished(id, !published)

    if (success) {
      router.refresh()
    } else {
      alert('Failed to update post status')
    }
  }

  if (posts.length === 0) {
    return (
      <div className="glass-effect rounded-2xl p-12 text-center">
        <p className="text-white/60 mb-4">No posts yet</p>
        <p className="text-white/40 text-sm">Create your first blog post to get started</p>
      </div>
    )
  }

  return (
    <div className="glass-effect rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">
                Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">
                Created
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-white/80">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {posts.map((post) => (
              <motion.tr
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-white/5 transition-colors"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-white">{post.title}</p>
                    <p className="text-sm text-white/60">/blog/{post.slug}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleTogglePublished(post.id, post.published)}
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      post.published
                        ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                        : 'bg-orange-500/20 text-orange-500 hover:bg-orange-500/30'
                    }`}
                  >
                    {post.published ? (
                      <>
                        <Eye className="w-3 h-3" />
                        Published
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3" />
                        Draft
                      </>
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 text-white/60 text-sm">
                  {new Date(post.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => router.push(`/admin/posts/${post.id}/edit`)}
                      className="p-2 hover:bg-teal/20 text-teal rounded-lg transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      disabled={deleting === post.id}
                      className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
