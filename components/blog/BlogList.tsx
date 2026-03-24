'use client';

import { motion } from 'framer-motion';
import type { Post } from '@/types/database';
import { BlogCard } from './BlogCard';
import { BlogCardSkeleton, EmptyState, ErrorState } from '@/components/ui';
import { FileText } from 'lucide-react';

interface BlogListProps {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
}

export function BlogList({ posts, isLoading, error, onRetry }: BlogListProps) {
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (posts.length === 0) {
    return (
      <EmptyState
        title="No posts yet"
        description="Check back soon for new content!"
        icon={<FileText size={48} className="text-teal/50" />}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {posts.map((post, index) => (
        <BlogCard key={post.id} post={post} index={index} />
      ))}
    </motion.div>
  );
}
