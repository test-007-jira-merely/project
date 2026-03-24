'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getVisiblePages = (): (number | string)[] => {
    if (totalPages <= 5) return pages;

    if (currentPage <= 3) {
      return [...pages.slice(0, 4), '...', totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, '...', ...pages.slice(-4)];
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 glass-effect rounded-lg hover:border-teal transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={20} />
      </motion.button>

      {getVisiblePages().map((page, index) => (
        <motion.button
          key={index}
          whileHover={typeof page === 'number' ? { scale: 1.1 } : undefined}
          whileTap={typeof page === 'number' ? { scale: 0.9 } : undefined}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...' || page === currentPage}
          className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
            page === currentPage
              ? 'bg-teal text-white'
              : page === '...'
              ? 'cursor-default text-white/50'
              : 'glass-effect hover:border-teal text-white/70 hover:text-white'
          }`}
        >
          {page}
        </motion.button>
      ))}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 glass-effect rounded-lg hover:border-teal transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight size={20} />
      </motion.button>
    </div>
  );
}
