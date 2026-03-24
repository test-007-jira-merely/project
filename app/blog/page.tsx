'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { postsService } from '@/lib/services';
import { BlogList, Pagination } from '@/components/blog';
import { PAGINATION, ROUTES } from '@/lib/constants';
import type { Post } from '@/types/database';

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<{ page: number; totalPages: number }>({
    page: PAGINATION.DEFAULT_PAGE,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async (page: number) => {
    setIsLoading(true);
    setError(null);

    const result = await postsService.getPublished({
      page,
      limit: PAGINATION.BLOG_POSTS_PER_PAGE,
    });

    if (result.error) {
      setError(result.error);
    } else if (result.data) {
      setPosts(result.data.data);
      setPagination({
        page: result.data.page,
        totalPages: result.data.totalPages,
      });
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts(pagination.page);
  }, []);

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
    fetchPosts(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen section-padding pt-32">
      <div className="container-custom">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-white/60 hover:text-teal transition-colors duration-300"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about design, development, and creativity.
          </p>
        </motion.div>

        {/* Blog Posts */}
        <BlogList
          posts={posts}
          isLoading={isLoading}
          error={error}
          onRetry={() => fetchPosts(pagination.page)}
        />

        {/* Pagination */}
        {!isLoading && !error && posts.length > 0 && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </main>
  );
}
