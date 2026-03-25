import { Metadata } from 'next'
import { getPublishedPosts } from '@/lib/services/posts'
import BlogList from '@/components/BlogList'

export const metadata: Metadata = {
  title: 'Blog | SaulDesign',
  description: 'Read the latest articles about UI/UX design, web development, and creative insights',
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const page = Number(searchParams.page) || 1
  const { data: posts, total, pageSize } = await getPublishedPosts(page)

  const totalPages = Math.ceil(total / pageSize)

  return (
    <div className="min-h-screen section-padding pt-24">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Blog & <span className="text-gradient">Insights</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Thoughts on design, development, and everything in between
          </p>
        </div>

        {/* Blog List */}
        <BlogList initialPosts={posts} initialPage={page} totalPages={totalPages} />
      </div>
    </div>
  )
}
