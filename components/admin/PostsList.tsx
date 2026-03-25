'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Post } from '@/lib/types/database'
import { deletePost, togglePostPublished } from '@/lib/services/posts'
import { useRouter } from 'next/navigation'

interface PostsListProps {
  posts: Post[]
}

export default function PostsList({ posts }: PostsListProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return
    }

    setDeletingId(id)
    const result = await deletePost(id)

    if (result.error) {
      alert(`Error deleting post: ${result.error}`)
    } else {
      router.refresh()
    }

    setDeletingId(null)
  }

  const handleTogglePublished = async (id: string, currentStatus: boolean) => {
    setTogglingId(id)
    const result = await togglePostPublished(id, !currentStatus)

    if (result.error) {
      alert(`Error updating post: ${result.error}`)
    } else {
      router.refresh()
    }

    setTogglingId(null)
  }

  return (
    <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                Created
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-white font-medium hover:text-teal-400 transition-colors"
                    >
                      {post.title}
                    </Link>
                    <p className="text-slate-400 text-sm">/blog/{post.slug}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleTogglePublished(post.id, post.published)}
                    disabled={togglingId === post.id}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      post.published
                        ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                        : 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30'
                    } disabled:opacity-50`}
                  >
                    {togglingId === post.id
                      ? '...'
                      : post.published
                      ? 'Published'
                      : 'Draft'}
                  </button>
                </td>
                <td className="px-6 py-4 text-slate-300 text-sm">
                  {new Date(post.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded hover:bg-blue-500/30 text-sm font-medium transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    disabled={deletingId === post.id}
                    className="px-3 py-1 bg-red-500/20 text-red-300 rounded hover:bg-red-500/30 text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    {deletingId === post.id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
