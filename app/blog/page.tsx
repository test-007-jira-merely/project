import { Suspense } from 'react';
import type { Metadata } from 'next';
import { PostList } from '@/components/blog/PostList';
import { PostListSkeleton } from '@/components/ui/LoadingSkeleton';
import { Pagination } from '@/components/ui/Pagination';
import { getPublishedPosts } from '@/lib/services/posts';
import { ROUTES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Blog | SaulDesign',
  description: 'Read the latest articles about UI/UX design, web development, and creative technology.',
  openGraph: {
    title: 'Blog | SaulDesign',
    description: 'Read the latest articles about UI/UX design and web development.',
    type: 'website',
  },
};

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

async function BlogContent({ page }: { page: number }) {
  const { data: posts, totalPages } = await getPublishedPosts(page);

  return (
    <>
      <PostList posts={posts} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath={ROUTES.BLOG}
      />
    </>
  );
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  return (
    <main className="min-h-screen section-padding pt-32">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on design and development.
          </p>
        </div>

        {/* Posts */}
        <Suspense fallback={<PostListSkeleton />}>
          <BlogContent page={page} />
        </Suspense>
      </div>
    </main>
  );
}
