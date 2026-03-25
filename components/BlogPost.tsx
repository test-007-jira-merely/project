'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'
import type { Post } from '@/lib/types'

interface BlogPostProps {
  post: Post
}

export default function BlogPost({ post }: BlogPostProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cover Image */}
      {post.cover_image && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative h-96 rounded-2xl overflow-hidden mb-8"
        >
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
        </motion.div>
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-6 text-white/60">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>{formatDate(post.created_at)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>{getReadingTime(post.content)}</span>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="prose prose-invert prose-lg max-w-none"
      >
        <div className="glass-effect rounded-2xl p-8 md:p-12">
          <div className="whitespace-pre-wrap text-white/80 leading-relaxed">
            {post.content}
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 pt-8 border-t border-white/10"
      >
        <p className="text-white/40 text-sm text-center">
          Published on {formatDate(post.created_at)}
          {post.updated_at !== post.created_at &&
            ` • Updated on ${formatDate(post.updated_at)}`}
        </p>
      </motion.div>
    </motion.article>
  )
}
