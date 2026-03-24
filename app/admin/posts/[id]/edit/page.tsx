'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { postsService } from '@/lib/services';
import { PostForm } from '@/components/admin/PostForm';
import { ErrorState } from '@/components/ui';
import { ROUTES } from '@/lib/constants';
import type { Post } from '@/types/database';

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const result = await postsService.getById(id);

      if (result.error) {
        setError(result.error);
      } else {
        setPost(result.data);
      }

      setIsLoading(false);
    };

    fetchPost();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-teal" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <ErrorState
        message={error || 'Post not found'}
        onRetry={() => router.push(ROUTES.ADMIN_POSTS)}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <PostForm post={post} isEdit />
    </motion.div>
  );
}
