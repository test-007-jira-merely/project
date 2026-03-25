'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BlogList, Pagination } from '@/components/blog';
import { getPosts } from '@/lib/db/posts';
import { PAGINATION } from '@/lib/constants';
import type { Post } from '@/types/database';

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<{
    page: number;
    totalPages: number;
    total: number;
  }>({
    page: PAGINATION.DEFAULT_PAGE,
    totalPages: 1,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async (page: number) => {
    setIsLoading(true);
    setError(null);

    const result = await getPosts(page, PAGINATION.BLOG_POSTS_PER_PAGE, true);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    if (result.data) {
      setPosts(result.data.data);
      setPagination({
        page: result.data.page,
        totalPages: result.data.totalPages,
        total: result.data.total,
      });
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts(PAGINATION.DEFAULT_PAGE);
  }, [fetchPosts]);

  const handlePageChange = (newPage: number) => {
    fetchPosts(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen">
      <Header />

      <section className="min-h-screen section-padding pt-32">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Insights, tutorials, and updates from our team
            </p>
          </motion.div>

          {/* Blog List */}
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
      </section>

      <Footer />
    </main>
  );
}
