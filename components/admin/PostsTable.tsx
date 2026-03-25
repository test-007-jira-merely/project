'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Edit, Trash2, Eye, EyeOff, ExternalLink, Loader2 } from 'lucide-react';
import type { Post } from '@/lib/database.types';

interface PostsTableProps {
  posts: Post[];
}

export default function PostsTable({ posts }: PostsTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/posts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');

      router.refresh();
    } catch (error) {
      alert('Failed to delete post');
    } finally {
      setDeletingId(null);
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    setTogglingId(id);
    try {
      const response = await fetch(`/api/admin/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !currentStatus }),
      });

      if (!response.ok) throw new Error('Failed to update');

      router.refresh();
    } catch (error) {
      alert('Failed to update post');
    } finally {
      setTogglingId(null);
    }
  };

  if (posts.length === 0) {
    return (
      <div className="glass-effect rounded-2xl p-12 text-center">
        <p className="text-white/50 mb-4">No posts found</p>
        <Link
          href="/admin/posts/new"
          className="text-teal hover:text-teal-light transition-colors"
        >
          Create your first post
        </Link>
      </div>
    );
  }

  return (
    <div className="glass-effect rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-white/5">
          <tr>
            <th className="text-left px-6 py-4 text-white/60 font-medium">Title</th>
            <th className="text-left px-6 py-4 text-white/60 font-medium">Status</th>
            <th className="text-left px-6 py-4 text-white/60 font-medium">Date</th>
            <th className="text-right px-6 py-4 text-white/60 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {posts.map((post) => (
            <motion.tr
              key={post.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hover:bg-white/5 transition-colors"
            >
              <td className="px-6 py-4">
                <div>
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="font-medium hover:text-teal transition-colors"
                  >
                    {post.title}
                  </Link>
                  <p className="text-sm text-white/50">/blog/{post.slug}</p>
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    post.published
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </td>
              <td className="px-6 py-4 text-white/60">
                {new Date(post.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  {post.published && (
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="View"
                    >
                      <ExternalLink size={18} className="text-white/60" />
                    </a>
                  )}
                  <button
                    onClick={() => handleTogglePublish(post.id, post.published)}
                    disabled={togglingId === post.id}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
                    title={post.published ? 'Unpublish' : 'Publish'}
                  >
                    {togglingId === post.id ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : post.published ? (
                      <EyeOff size={18} className="text-yellow-400" />
                    ) : (
                      <Eye size={18} className="text-green-400" />
                    )}
                  </button>
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit size={18} className="text-teal" />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    disabled={deletingId === post.id}
                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    {deletingId === post.id ? (
                      <Loader2 size={18} className="animate-spin text-red-400" />
                    ) : (
                      <Trash2 size={18} className="text-red-400" />
                    )}
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
