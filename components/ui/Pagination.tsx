'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => {
    if (page === 1) return basePath;
    return `${basePath}?page=${page}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter(
    (page) =>
      page === 1 ||
      page === totalPages ||
      (page >= currentPage - 1 && page <= currentPage + 1)
  );

  return (
    <nav className="flex items-center justify-center gap-2 mt-12">
      {currentPage > 1 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="p-2 glass-effect rounded-lg hover:bg-white/10 transition-colors"
        >
          <ChevronLeft size={20} />
        </Link>
      )}

      {visiblePages.map((page, index) => {
        const prevPage = visiblePages[index - 1];
        const showEllipsis = prevPage && page - prevPage > 1;

        return (
          <span key={page} className="flex items-center gap-2">
            {showEllipsis && <span className="text-white/40 px-2">...</span>}
            <Link
              href={getPageUrl(page)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-all ${
                page === currentPage
                  ? 'bg-teal text-white'
                  : 'glass-effect hover:bg-white/10'
              }`}
            >
              {page}
            </Link>
          </span>
        );
      })}

      {currentPage < totalPages && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="p-2 glass-effect rounded-lg hover:bg-white/10 transition-colors"
        >
          <ChevronRight size={20} />
        </Link>
      )}
    </nav>
  );
}
