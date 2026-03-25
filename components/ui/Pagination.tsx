'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => {
    return page === 1 ? basePath : `${basePath}?page=${page}`;
  };

  const pages: (number | string)[] = [];

  // Always show first page
  pages.push(1);

  // Show ellipsis and pages around current
  if (currentPage > 3) {
    pages.push('...');
  }

  for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
    if (!pages.includes(i)) {
      pages.push(i);
    }
  }

  // Show ellipsis before last page
  if (currentPage < totalPages - 2) {
    pages.push('...');
  }

  // Always show last page
  if (totalPages > 1 && !pages.includes(totalPages)) {
    pages.push(totalPages);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-2 mt-12"
    >
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="p-2 glass-effect rounded-lg hover:border-teal transition-colors"
        >
          <ChevronLeft size={20} />
        </Link>
      ) : (
        <span className="p-2 glass-effect rounded-lg opacity-50 cursor-not-allowed">
          <ChevronLeft size={20} />
        </span>
      )}

      {/* Page Numbers */}
      {pages.map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="px-3 py-2 text-white/50">
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={getPageUrl(page as number)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              currentPage === page
                ? 'bg-teal text-white'
                : 'glass-effect hover:border-teal'
            }`}
          >
            {page}
          </Link>
        )
      ))}

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="p-2 glass-effect rounded-lg hover:border-teal transition-colors"
        >
          <ChevronRight size={20} />
        </Link>
      ) : (
        <span className="p-2 glass-effect rounded-lg opacity-50 cursor-not-allowed">
          <ChevronRight size={20} />
        </span>
      )}
    </motion.div>
  );
}
