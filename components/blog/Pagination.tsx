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

  // Show limited pages with ellipsis for large page counts
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;

    if (currentPage <= 3) {
      return [...pages.slice(0, 4), -1, totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, -1, ...pages.slice(totalPages - 4)];
    }

    return [1, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages];
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className="flex justify-center items-center gap-2 mt-12" aria-label="Pagination">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 glass-effect rounded-lg hover:border-teal transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <ChevronLeft size={20} className="text-white" />
      </motion.button>

      {visiblePages.map((page, index) => (
        page === -1 ? (
          <span key={`ellipsis-${index}`} className="px-2 text-white/50">...</span>
        ) : (
          <motion.button
            key={page}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
              currentPage === page
                ? 'bg-teal text-white shadow-lg glow-effect'
                : 'glass-effect text-white/70 hover:text-white hover:border-teal'
            }`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </motion.button>
        )
      ))}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 glass-effect rounded-lg hover:border-teal transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <ChevronRight size={20} className="text-white" />
      </motion.button>
    </nav>
  );
}
