'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, Briefcase, Plus, TrendingUp } from 'lucide-react';
import { getPosts } from '@/lib/db/posts';
import { getProjects } from '@/lib/db/projects';
import { ROUTES } from '@/lib/constants';

interface Stats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalProjects: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalProjects: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [postsResult, projectsResult] = await Promise.all([
        getPosts(1, 1000, false), // Get all posts (published and drafts)
        getProjects(),
      ]);

      const posts = postsResult.data?.data || [];
      const projects = projectsResult.data || [];

      setStats({
        totalPosts: posts.length,
        publishedPosts: posts.filter((p) => p.published).length,
        draftPosts: posts.filter((p) => !p.published).length,
        totalProjects: projects.length,
      });

      setIsLoading(false);
    }

    fetchStats();
  }, []);

  const statCards = [
    {
      label: 'Total Posts',
      value: stats.totalPosts,
      icon: <FileText size={24} />,
      color: 'bg-blue-500/20 text-blue-400',
      href: ROUTES.ADMIN_POSTS,
    },
    {
      label: 'Published',
      value: stats.publishedPosts,
      icon: <TrendingUp size={24} />,
      color: 'bg-green-500/20 text-green-400',
      href: ROUTES.ADMIN_POSTS,
    },
    {
      label: 'Drafts',
      value: stats.draftPosts,
      icon: <FileText size={24} />,
      color: 'bg-yellow-500/20 text-yellow-400',
      href: ROUTES.ADMIN_POSTS,
    },
    {
      label: 'Projects',
      value: stats.totalProjects,
      icon: <Briefcase size={24} />,
      color: 'bg-purple-500/20 text-purple-400',
      href: ROUTES.ADMIN_PROJECTS,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-white/60">Welcome back! Here is an overview of your content.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={stat.href}>
              <div className="glass-effect rounded-xl p-6 hover:border-teal/50 transition-all duration-300">
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                  {stat.icon}
                </div>
                <p className="text-white/60 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">
                  {isLoading ? '-' : stat.value}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href={`${ROUTES.ADMIN_POSTS}/new`}
              className="flex items-center gap-3 px-4 py-3 bg-teal/10 hover:bg-teal/20 rounded-lg transition-colors"
            >
              <Plus size={20} className="text-teal" />
              <span className="text-white/80">Create New Post</span>
            </Link>
            <Link
              href={`${ROUTES.ADMIN_PROJECTS}/new`}
              className="flex items-center gap-3 px-4 py-3 bg-purple-500/10 hover:bg-purple-500/20 rounded-lg transition-colors"
            >
              <Plus size={20} className="text-purple-400" />
              <span className="text-white/80">Add New Project</span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-effect rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
          <ul className="space-y-3 text-white/60 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-teal">1.</span>
              <span>Create your first blog post to engage with your audience</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal">2.</span>
              <span>Add projects to showcase your work in the portfolio</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal">3.</span>
              <span>Publish content when you are ready for it to go live</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
