'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar } from 'lucide-react';
import { postsService } from '@/lib/services';
import { Skeleton, ErrorState } from '@/components/ui';
import { ROUTES } from '@/lib/constants';
import type { Post } from '@/types/database';

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      setError(null);

      const result = await postsService.getBySlug(slug);

      if (result.error) {
        setError(result.error);
      } else {
        setPost(result.data);
      }

      setIsLoading(false);
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const formattedDate = post
    ? new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  if (isLoading) {
    return (
      <main className="min-h-screen section-padding pt-32">
        <div className="container-custom max-w-4xl">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-48 mb-8" />
          <Skeleton className="h-64 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen section-padding pt-32">
        <div className="container-custom max-w-4xl">
          <ErrorState
            message={error || 'Post not found'}
            onRetry={() => router.push(ROUTES.BLOG)}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen section-padding pt-32">
      <div className="container-custom max-w-4xl">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href={ROUTES.BLOG}
            className="inline-flex items-center gap-2 text-white/60 hover:text-teal transition-colors duration-300"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </motion.div>

        {/* Article */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-2 text-white/60">
              <Calendar size={18} />
              <time dateTime={post.created_at}>{formattedDate}</time>
            </div>
          </header>

          {/* Cover Image */}
          {post.cover_image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8 rounded-2xl overflow-hidden"
            >
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-auto"
              />
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-white/80 prose-a:text-teal prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:text-teal prose-code:bg-navy-light prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-navy-dark prose-pre:border prose-pre:border-white/10"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </motion.div>
        </motion.article>
      </div>
    </main>
  );
}
