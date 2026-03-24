'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import type { Post } from '@/types/database';
import { ROUTES } from '@/lib/constants';

interface BlogCardProps {
  post: Post;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
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
      <Link href={ROUTES.BLOG_POST(post.slug)}>
        <div className="glass-effect rounded-2xl overflow-hidden hover:border-teal transition-all duration-300 hover:glow-effect cursor-pointer h-full">
          {/* Cover Image */}
          {post.cover_image ? (
            <div className="h-48 relative overflow-hidden">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50" />
            </div>
          ) : (
            <div className="h-48 bg-gradient-to-br from-teal/30 to-navy-dark relative">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50" />
              <div className="absolute top-4 left-4">
                <div className="w-16 h-16 border-2 border-white/20 rounded-lg" />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6 space-y-3">
            <h2 className="text-xl font-semibold text-white group-hover:text-teal transition-colors duration-300 line-clamp-2">
              {post.title}
            </h2>

            <p className="text-white/60 text-sm line-clamp-3">
              {post.content.slice(0, 150).replace(/[#*`]/g, '')}...
            </p>

            <div className="flex items-center gap-2 text-white/40 text-xs">
              <Calendar size={14} />
              <time dateTime={post.created_at}>{formattedDate}</time>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
