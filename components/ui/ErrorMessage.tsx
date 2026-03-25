'use client';

import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <div className="flex justify-center mb-4">
        <AlertCircle size={48} className="text-red-400" />
      </div>
      <h3 className="text-xl font-semibold text-red-400 mb-2">Error</h3>
      <p className="text-white/60 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-teal text-white rounded-full font-medium hover:bg-teal-light transition-colors inline-flex items-center gap-2"
        >
          <RefreshCw size={18} />
          Try Again
        </button>
      )}
    </motion.div>
  );
}
