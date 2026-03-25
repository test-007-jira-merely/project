export default function BlogLoading() {
  return (
    <main className="min-h-screen section-padding pt-32">
      <div className="container-custom">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-12 bg-white/10 rounded-lg w-48 mx-auto mb-4 animate-pulse" />
          <div className="h-4 bg-white/10 rounded w-96 max-w-full mx-auto animate-pulse" />
        </div>

        {/* Posts Grid Skeleton */}
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
      </div>
    </main>
  )
}
