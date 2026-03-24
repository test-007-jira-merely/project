import { BlogCardSkeleton } from '@/components/ui';

export default function BlogLoading() {
  return (
    <main className="min-h-screen section-padding pt-32">
      <div className="container-custom">
        <div className="h-8 w-32 bg-white/10 rounded mb-8 animate-pulse" />
        <div className="text-center mb-12">
          <div className="h-12 w-64 bg-white/10 rounded mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-96 max-w-full bg-white/10 rounded mx-auto animate-pulse" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
