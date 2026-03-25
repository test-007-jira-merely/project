'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff, Search, Loader2 } from 'lucide-react';
import { getPosts, deletePost, togglePostPublished } from '@/lib/db/posts';
import { ROUTES } from '@/lib/constants';
import { Skeleton, EmptyState, ErrorState } from '@/components/ui';
import type { Post } from '@/types/database';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const result = await getPosts(1, 100, false); // Get all posts including drafts

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    setPosts(result.data?.data || []);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    setDeletingId(id);
    const result = await deletePost(id);

    if (result.error) {
      alert(`Failed to delete post: ${result.error}`);
    } else {
      setPosts(posts.filter((p) => p.id !== id));
    }

    setDeletingId(null);
  };

  const handleTogglePublished = async (id: string, currentStatus: boolean) => {
    setTogglingId(id);
    const result = await togglePostPublished(id, !currentStatus);

    if (result.error) {
      alert(`Failed to update post: ${result.error}`);
    } else if (result.data) {
      setPosts(posts.map((p) => (p.id === id ? result.data! : p)));
    }

    setTogglingId(null);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Posts</h1>
          <p className="text-white/60">Manage your blog posts</p>
        </div>
        <Link
          href={`${ROUTES.ADMIN_POSTS}/new`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white rounded-lg font-medium hover:bg-teal-light transition-colors"
        >
          <Plus size={20} />
          New Post
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal transition-colors"
        />
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      ) : error ? (
        <ErrorState message={error} onRetry={fetchPosts} />
      ) : filteredPosts.length === 0 ? (
        <EmptyState
          title={searchQuery ? 'No posts found' : 'No posts yet'}
          description={searchQuery ? 'Try a different search term' : 'Create your first blog post to get started'}
        />
      ) : (
        <div className="glass-effect rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr className="text-left text-white/60 text-sm">
                  <th className="px-6 py-4 font-medium">Title</th>
                  <th className="px-6 py-4 font-medium hidden md:table-cell">Created</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredPosts.map((post) => (
                  <motion.tr
                    key={post.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-white">{post.title}</p>
                        <p className="text-white/40 text-sm">/{post.slug}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white/60 text-sm hidden md:table-cell">
                      {formatDate(post.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleTogglePublished(post.id, post.published)}
                        disabled={togglingId === post.id}
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          post.published
                            ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                            : 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                        }`}
                      >
                        {togglingId === post.id ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : post.published ? (
                          <Eye size={12} />
                        ) : (
                          <EyeOff size={12} />
                        )}
                        {post.published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`${ROUTES.BLOG}/${post.slug}`}
                          target="_blank"
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title="View post"
                        >
                          <Eye size={18} className="text-white/60" />
                        </Link>
                        <Link
                          href={`${ROUTES.ADMIN_POSTS}/${post.id}`}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title="Edit post"
                        >
                          <Edit size={18} className="text-white/60" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          disabled={deletingId === post.id}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                          title="Delete post"
                        >
                          {deletingId === post.id ? (
                            <Loader2 size={18} className="text-red-400 animate-spin" />
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
        </div>
      )}
    </div>
  );
}
