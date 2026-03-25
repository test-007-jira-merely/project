'use client';

import { motion } from 'framer-motion';
import { PostCard } from './PostCard';
import { EmptyState } from '@/components/ui/EmptyState';
import type { Post } from '@/types/database';

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <EmptyState
        icon="posts"
        title="No posts yet"
        description="Check back later for new blog posts."
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
        <PostCard key={post.id} post={post} index={index} />
      ))}
    </motion.div>
  );
}
