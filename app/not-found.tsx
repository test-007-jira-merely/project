'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="text-9xl font-bold text-gradient mb-4"
        >
          404
        </motion.div>

        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>

        <p className="text-white/60 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="px-6 py-3 bg-teal text-white rounded-lg font-medium hover:bg-teal-light transition-colors duration-300 inline-flex items-center gap-2"
            >
              <Home size={18} />
              Go Home
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 glass-effect rounded-lg font-medium hover:border-teal transition-colors duration-300 inline-flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
