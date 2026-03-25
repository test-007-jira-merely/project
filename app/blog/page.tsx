import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import { getPublishedPosts } from '@/lib/services/posts'
import BlogPagination from '@/components/blog/BlogPagination'

export const metadata: Metadata = {
  title: 'Blog - SaulDesign',
  description: 'Read our latest articles about UI/UX design, web development, and creative projects.',
}

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>
}

function BlogSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="glass-effect rounded-2xl overflow-hidden animate-pulse">
          <div className="h-48 bg-white/10" />
          <div className="p-6 space-y-3">
            <div className="h-4 bg-white/10 rounded w-1/3" />
            <div className="h-6 bg-white/10 rounded w-3/4" />
            <div className="h-4 bg-white/10 rounded" />
            <div className="h-4 bg-white/10 rounded w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

async function BlogContent({ page }: { page: number }) {
  const { posts, totalPages } = await getPublishedPosts(page)

  if (posts.length === 0) {
    return (
      <div className="glass-effect rounded-2xl p-12 text-center">
        <p className="text-white/60 text-lg mb-4">No posts published yet</p>
        <p className="text-white/40">Check back soon for new content!</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group"
          >
            <article className="glass-effect rounded-2xl overflow-hidden hover:border-teal transition-all duration-300 hover:glow-effect h-full">
              {/* Cover Image or Placeholder */}
              <div className="h-48 bg-gradient-to-br from-teal/20 to-teal-dark/30 relative overflow-hidden">
                {post.cover_image ? (
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl text-teal/30 font-bold">
                      {post.title.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <Calendar size={14} />
                  <time dateTime={post.created_at}>
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>

                <h2 className="text-xl font-semibold text-white group-hover:text-teal transition-colors line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-white/60 text-sm line-clamp-3">
                  {post.content.replace(/[#*`]/g, '').substring(0, 150)}...
                </p>

                <div className="flex items-center gap-2 text-teal text-sm font-medium pt-2">
                  Read more
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <BlogPagination currentPage={page} totalPages={totalPages} />
      )}
    </>
  )
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1

  return (
    <main className="min-h-screen section-padding pt-32">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Insights, tutorials, and stories from our design journey
          </p>
        </div>

        {/* Posts Grid */}
        <Suspense fallback={<BlogSkeleton />}>
          <BlogContent page={page} />
        </Suspense>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-teal transition-colors"
          >
            <ArrowRight size={16} className="rotate-180" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
