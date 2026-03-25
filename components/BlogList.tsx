'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { Post } from '@/lib/types'

interface BlogListProps {
  initialPosts: Post[]
  initialPage: number
  totalPages: number
}

export default function BlogList({ initialPosts, initialPage, totalPages }: BlogListProps) {
  const router = useRouter()

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

  const handlePageChange = (page: number) => {
    router.push(`/blog?page=${page}`)
  }

  if (initialPosts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <div className="glass-effect rounded-2xl p-12 max-w-md mx-auto">
          <p className="text-xl text-white/60 mb-4">No blog posts yet</p>
          <p className="text-white/40">Check back soon for new content!</p>
        </div>
      </motion.div>
    )
  }

  return (
    <>
      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {initialPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="glass-effect rounded-2xl overflow-hidden hover:border-teal transition-all duration-300 hover:glow-effect cursor-pointer h-full group">
                {/* Cover Image */}
                {post.cover_image && (
                  <div className="relative h-64 overflow-hidden bg-navy-light">
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent opacity-60" />
                  </div>
                )}

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{getReadingTime(post.content)}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-white group-hover:text-teal transition-colors duration-300">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-white/60 line-clamp-3">
                    {post.content.substring(0, 150)}...
                  </p>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-teal font-medium group-hover:gap-3 transition-all duration-300">
                    <span>Read more</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePageChange(initialPage - 1)}
            disabled={initialPage === 1}
            className="glass-effect px-4 py-2 rounded-lg text-white/80 hover:text-white hover:border-teal transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </motion.button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <motion.button
                key={pageNum}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handlePageChange(pageNum)}
                className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                  pageNum === initialPage
                    ? 'bg-teal text-white glow-effect'
                    : 'glass-effect text-white/60 hover:text-white hover:border-teal'
                }`}
              >
                {pageNum}
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePageChange(initialPage + 1)}
            disabled={initialPage === totalPages}
            className="glass-effect px-4 py-2 rounded-lg text-white/80 hover:text-white hover:border-teal transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      )}
    </>
  )
}
