export default function PostLoading() {
  return (
    <main className="min-h-screen section-padding pt-32">
      <article className="container-custom max-w-4xl">
        {/* Back Link Skeleton */}
        <div className="h-6 bg-white/10 rounded w-32 mb-8 animate-pulse" />

        {/* Header Skeleton */}
        <header className="mb-8">
          <div className="h-64 md:h-96 bg-white/10 rounded-2xl mb-8 animate-pulse" />
          <div className="h-10 bg-white/10 rounded w-3/4 mb-4 animate-pulse" />
          <div className="flex gap-4">
            <div className="h-4 bg-white/10 rounded w-32 animate-pulse" />
            <div className="h-4 bg-white/10 rounded w-24 animate-pulse" />
          </div>
        </header>

        {/* Content Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-4 bg-white/10 rounded animate-pulse"
              style={{ width: `${Math.random() * 40 + 60}%` }}
            />
          ))}
        </div>
      </article>
    </main>
  )
}
