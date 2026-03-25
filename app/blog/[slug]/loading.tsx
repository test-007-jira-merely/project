import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Skeleton } from '@/components/ui';

export default function BlogPostLoading() {
  return (
    <main className="min-h-screen">
      <Header />

      <article className="section-padding pt-32">
        <div className="container-custom max-w-4xl">
          {/* Back Link Skeleton */}
          <Skeleton className="h-6 w-32 mb-8" />

          {/* Title Skeleton */}
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-12 w-1/2 mb-6" />

          {/* Meta Skeleton */}
          <div className="flex gap-4 mb-8">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-24" />
          </div>

          {/* Cover Image Skeleton */}
          <Skeleton className="h-64 w-full rounded-2xl mb-10" />

          {/* Content Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-4/5" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
