import { Suspense } from 'react';
import { getPosts } from '@/lib/services/posts';
import { PostCard } from '@/components/blog/PostCard';
import { Pagination } from '@/components/ui/Pagination';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { PostCardSkeleton } from '@/components/ui/Skeleton';
import { BookOpen } from 'lucide-react';

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

function BlogListSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
}

async function BlogList({ page }: { page: number }) {
  const result = await getPosts(page, 9, true);

  if (result.error) {
    return <ErrorMessage message={result.error} />;
  }

  const { data, totalPages } = result.data!;

  if (data.length === 0) {
    return (
      <EmptyState
        title="No posts yet"
        message="Check back soon for new content!"
        icon={<BookOpen size={48} className="text-teal/50" />}
      />
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/blog"
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
            Insights, tutorials, and updates from our team
          </p>
        </div>

        {/* Posts Grid */}
        <Suspense fallback={<BlogListSkeleton />}>
          <BlogList page={page} />
        </Suspense>
      </div>
    </main>
  );
}

export const metadata = {
  title: 'Blog | SaulDesign',
  description: 'Read our latest articles on UI/UX design, web development, and creative insights.',
};
