'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import type { Post } from '@/types/database';
import { ROUTES } from '@/lib/constants';

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

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link href={ROUTES.BLOG_POST(post.slug)}>
        <div className="glass-effect rounded-2xl overflow-hidden hover:border-teal transition-all duration-300 hover:glow-effect cursor-pointer h-full flex flex-col">
          {/* Cover Image */}
          {post.cover_image ? (
            <div className="h-48 bg-gradient-to-br from-teal/20 to-purple-600/20 relative overflow-hidden">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          ) : (
            <div className="h-48 bg-gradient-to-br from-teal/30 to-purple-600/30 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-bold text-white/10">
                  {post.title.charAt(0)}
                </span>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6 space-y-3 flex-1 flex flex-col">
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <Calendar size={14} />
              <time dateTime={post.created_at}>{formattedDate}</time>
            </div>

            <h2 className="text-xl font-semibold text-white group-hover:text-teal transition-colors duration-300 line-clamp-2">
              {post.title}
            </h2>

            <p className="text-white/60 text-sm line-clamp-3 flex-1">
              {post.content.replace(/[#*`]/g, '').substring(0, 150)}...
            </p>

            <div className="flex items-center gap-2 text-teal group-hover:gap-3 transition-all duration-300">
              <span className="text-sm font-medium">Read more</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
