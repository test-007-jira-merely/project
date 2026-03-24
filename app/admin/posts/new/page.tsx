'use client';

import { motion } from 'framer-motion';
import { PostForm } from '@/components/admin/PostForm';

export default function NewPostPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <PostForm />
    </motion.div>
  );
}
