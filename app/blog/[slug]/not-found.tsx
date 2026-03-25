'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FileQuestion, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="glass-effect rounded-2xl p-12 max-w-md mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal/20 mb-6"
          >
            <FileQuestion className="w-10 h-10 text-teal" />
          </motion.div>

          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-white/60 mb-8">
            The blog post you're looking for doesn't exist or has been removed.
          </p>

          <Link href="/blog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal hover:bg-teal-light text-white font-semibold rounded-lg transition-colors duration-300 glow-effect"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to blog
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
