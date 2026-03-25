'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import type { Post } from '@/types/database';
import { ROUTES } from '@/lib/constants';

interface BlogCardProps {
  post: Post;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link href={`${ROUTES.BLOG}/${post.slug}`}>
        <div className="glass-effect rounded-2xl overflow-hidden hover:border-teal transition-all duration-300 hover:glow-effect h-full">
          {/* Cover Image */}
          {post.cover_image ? (
            <div className="h-48 relative overflow-hidden">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
            </div>
          ) : (
            <div className="h-48 bg-gradient-to-br from-teal/20 to-purple-600/20 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl text-white/10 font-bold">
                  {post.title.charAt(0)}
                </span>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6 space-y-3">
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <Calendar size={14} />
              <time dateTime={post.created_at}>{formattedDate}</time>
            </div>

            <h3 className="text-xl font-semibold text-white group-hover:text-teal transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>

            <p className="text-white/60 text-sm line-clamp-3">
              {post.content.replace(/[#*`]/g, '').substring(0, 150)}...
            </p>

            <span className="inline-block text-teal text-sm font-medium group-hover:underline">
              Read more
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
