import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BlogCardSkeleton } from '@/components/ui';

export default function BlogLoading() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="min-h-screen section-padding pt-32">
        <div className="container-custom">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <div className="h-12 w-48 bg-white/10 rounded mx-auto mb-4 animate-pulse" />
            <div className="h-6 w-96 bg-white/10 rounded mx-auto animate-pulse" />
          </div>

          {/* Cards Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
