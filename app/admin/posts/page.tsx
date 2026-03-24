'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';
import { postsService } from '@/lib/services';
import { ROUTES } from '@/lib/constants';
import { Skeleton, EmptyState, ErrorState } from '@/components/ui';
import type { Post } from '@/types/database';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);

    const result = await postsService.getAll();

    if (result.error) {
      setError(result.error);
    } else if (result.data) {
      setPosts(result.data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    setDeletingId(id);
    const result = await postsService.delete(id);

    if (result.error) {
      alert(result.error);
    } else {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }

    setDeletingId(null);
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    setTogglingId(id);
    const result = await postsService.togglePublish(id, !currentStatus);

    if (result.error) {
      alert(result.error);
    } else if (result.data) {
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, published: !currentStatus } : p))
      );
    }

    setTogglingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Posts</h1>
          <p className="text-white/60 mt-1">Manage your blog posts</p>
        </div>
        <Link
          href={ROUTES.ADMIN_POST_NEW}
          className="px-4 py-2 bg-teal text-white rounded-lg font-medium hover:bg-teal-light transition-colors duration-300 flex items-center gap-2"
        >
          <Plus size={20} />
          New Post
        </Link>
      </motion.div>

      {/* Posts Table */}
      {isLoading ? (
        <div className="glass-effect rounded-xl overflow-hidden">
          <div className="p-4 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      ) : error ? (
        <ErrorState message={error} onRetry={fetchPosts} />
      ) : posts.length === 0 ? (
        <EmptyState
          title="No posts yet"
          description="Create your first blog post to get started"
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-effect rounded-xl overflow-hidden"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/60 font-medium">Title</th>
                <th className="text-left p-4 text-white/60 font-medium hidden md:table-cell">
                  Status
                </th>
                <th className="text-left p-4 text-white/60 font-medium hidden md:table-cell">
                  Created
                </th>
                <th className="text-right p-4 text-white/60 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <motion.tr
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{post.title}</p>
                      <p className="text-white/50 text-sm">/{post.slug}</p>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        post.published
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-4 text-white/60 hidden md:table-cell">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleTogglePublish(post.id, post.published)}
                        disabled={togglingId === post.id}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-300 disabled:opacity-50"
                        title={post.published ? 'Unpublish' : 'Publish'}
                      >
                        {togglingId === post.id ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : post.published ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                      <Link
                        href={ROUTES.ADMIN_POST_EDIT(post.id)}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        disabled={deletingId === post.id}
                        className="p-2 rounded-lg hover:bg-red-500/20 text-white/70 hover:text-red-400 transition-colors duration-300 disabled:opacity-50"
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
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
