'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import type { Post } from '@/lib/database.types';

interface PostCardProps {
  post: Post;
  index?: number;
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Generate a color based on post id for variety
  const colors = ['bg-purple-600', 'bg-teal-600', 'bg-blue-600', 'bg-pink-600', 'bg-indigo-600'];
  const colorIndex = post.id.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="glass-effect rounded-2xl overflow-hidden hover:border-teal transition-all duration-300">
          {/* Cover Image or Placeholder */}
          <div className={`h-48 ${post.cover_image ? '' : bgColor} relative overflow-hidden`}>
            {post.cover_image ? (
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50" />
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-teal/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-medium flex items-center gap-2">
                Read More <ArrowRight size={18} />
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-3">
            <h2 className="text-xl font-semibold text-white group-hover:text-teal transition-colors line-clamp-2">
              {post.title}
            </h2>

            <p className="text-white/60 text-sm line-clamp-2">
              {post.content.substring(0, 150).replace(/[#*`]/g, '')}...
            </p>

            <div className="flex items-center gap-2 text-white/40 text-sm">
              <Calendar size={14} />
              <time dateTime={post.created_at}>{formattedDate}</time>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
