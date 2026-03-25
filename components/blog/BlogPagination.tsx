'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
}

export default function BlogPagination({ currentPage, totalPages }: BlogPaginationProps) {
  const searchParams = useSearchParams()

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    return `/blog?${params.toString()}`
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  // Show limited page numbers for many pages
  const getVisiblePages = () => {
    if (totalPages <= 7) return pages

    if (currentPage <= 3) {
      return [...pages.slice(0, 5), -1, totalPages]
    }

    if (currentPage >= totalPages - 2) {
      return [1, -1, ...pages.slice(totalPages - 5)]
    }

    return [1, -1, currentPage - 1, currentPage, currentPage + 1, -2, totalPages]
  }

  const visiblePages = getVisiblePages()

  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Blog pagination">
      <Link
        href={createPageUrl(currentPage - 1)}
        className={`p-2 rounded-lg transition-colors ${
          currentPage === 1
            ? 'text-white/20 pointer-events-none'
            : 'text-white/60 hover:text-white hover:bg-white/10'
        }`}
        aria-disabled={currentPage === 1}
      >
        <ChevronLeft size={20} />
        <span className="sr-only">Previous page</span>
      </Link>

      {visiblePages.map((page, index) => {
        if (page < 0) {
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-white/40">
              ...
            </span>
          )
        }

        return (
          <Link
            key={page}
            href={createPageUrl(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${
              page === currentPage
                ? 'bg-teal text-white'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </Link>
        )
      })}

      <Link
        href={createPageUrl(currentPage + 1)}
        className={`p-2 rounded-lg transition-colors ${
          currentPage === totalPages
            ? 'text-white/20 pointer-events-none'
            : 'text-white/60 hover:text-white hover:bg-white/10'
        }`}
        aria-disabled={currentPage === totalPages}
      >
        <ChevronRight size={20} />
        <span className="sr-only">Next page</span>
      </Link>
    </nav>
  )
}
