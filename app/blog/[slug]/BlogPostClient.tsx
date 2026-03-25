'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ROUTES } from '@/lib/constants';
import type { Post } from '@/types/database';

interface BlogPostClientProps {
  post: Post;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Estimate reading time (average 200 words per minute)
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <main className="min-h-screen">
      <Header />

      <article className="section-padding pt-32">
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
              <ArrowLeft size={18} />
              Back to Blog
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <time dateTime={post.created_at}>{formattedDate}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </motion.header>

          {/* Cover Image */}
          {post.cover_image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-10 rounded-2xl overflow-hidden"
            >
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-auto max-h-96 object-cover"
              />
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-white mt-10 mb-4">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold text-white mt-6 mb-3">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-white/80 leading-relaxed mb-4">{children}</p>
                ),
                a: ({ href, children }) => (
                  <a href={href} className="text-teal hover:text-teal-light underline">
                    {children}
                  </a>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside text-white/80 mb-4 space-y-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside text-white/80 mb-4 space-y-2">{children}</ol>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-teal pl-4 italic text-white/70 my-6">
                    {children}
                  </blockquote>
                ),
                code: ({ children, className }) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code className="bg-white/10 px-2 py-1 rounded text-teal text-sm">
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className="block bg-navy-dark p-4 rounded-lg overflow-x-auto text-sm">
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="bg-navy-dark rounded-lg overflow-x-auto my-6">
                    {children}
                  </pre>
                ),
                img: ({ src, alt }) => (
                  <img
                    src={src}
                    alt={alt}
                    className="rounded-lg my-6 w-full"
                  />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </motion.div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
