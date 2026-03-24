'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileText, Folder, Plus, TrendingUp } from 'lucide-react';
import { postsService, projectsService } from '@/lib/services';
import { ROUTES } from '@/lib/constants';
import { Skeleton } from '@/components/ui';
import type { Post } from '@/types/database';

interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalProjects: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [postsResult, projectsResult] = await Promise.all([
        postsService.getAll(),
        projectsService.getAll(),
      ]);

      if (postsResult.data && projectsResult.data) {
        const posts = postsResult.data;
        const projects = projectsResult.data;

        setStats({
          totalPosts: posts.length,
          publishedPosts: posts.filter((p) => p.published).length,
          draftPosts: posts.filter((p) => !p.published).length,
          totalProjects: projects.length,
        });

        setRecentPosts(posts.slice(0, 5));
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const statCards = [
    {
      label: 'Total Posts',
      value: stats?.totalPosts ?? 0,
      icon: FileText,
      color: 'bg-blue-500/20 text-blue-400',
    },
    {
      label: 'Published',
      value: stats?.publishedPosts ?? 0,
      icon: TrendingUp,
      color: 'bg-green-500/20 text-green-400',
    },
    {
      label: 'Drafts',
      value: stats?.draftPosts ?? 0,
      icon: FileText,
      color: 'bg-yellow-500/20 text-yellow-400',
    },
    {
      label: 'Projects',
      value: stats?.totalProjects ?? 0,
      icon: Folder,
      color: 'bg-purple-500/20 text-purple-400',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-white/60 mt-1">Welcome back to your admin panel</p>
        </div>
        <Link
          href={ROUTES.ADMIN_POST_NEW}
          className="px-4 py-2 bg-teal text-white rounded-lg font-medium hover:bg-teal-light transition-colors duration-300 flex items-center gap-2"
        >
          <Plus size={20} />
          New Post
        </Link>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass-effect rounded-xl p-6">
                <Skeleton className="h-10 w-10 rounded-lg mb-4" />
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))
          : statCards.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-xl p-6"
              >
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                  <stat.icon size={20} />
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </motion.div>
            ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Posts</h2>
            <Link
              href={ROUTES.ADMIN_POSTS}
              className="text-teal text-sm hover:underline"
            >
              View all
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : recentPosts.length === 0 ? (
            <p className="text-white/50 text-center py-8">No posts yet</p>
          ) : (
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={ROUTES.ADMIN_POST_EDIT(post.id)}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors duration-300"
                >
                  <div>
                    <p className="font-medium truncate">{post.title}</p>
                    <p className="text-white/50 text-sm">
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      post.published
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href={ROUTES.ADMIN_POST_NEW}
              className="flex items-center gap-3 p-4 rounded-lg bg-teal/10 hover:bg-teal/20 transition-colors duration-300"
            >
              <FileText size={20} className="text-teal" />
              <span>Create New Post</span>
            </Link>
            <Link
              href={ROUTES.ADMIN_PROJECT_NEW}
              className="flex items-center gap-3 p-4 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 transition-colors duration-300"
            >
              <Folder size={20} className="text-purple-400" />
              <span>Add New Project</span>
            </Link>
            <Link
              href={ROUTES.BLOG}
              target="_blank"
              className="flex items-center gap-3 p-4 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition-colors duration-300"
            >
              <TrendingUp size={20} className="text-blue-400" />
              <span>View Public Blog</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
