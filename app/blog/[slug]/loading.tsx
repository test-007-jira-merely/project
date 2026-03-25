export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="h-4 bg-white/10 rounded w-32 mb-8 animate-pulse"></div>
          <div className="h-96 bg-white/10 rounded-2xl mb-8 animate-pulse"></div>
          <div className="mb-8 space-y-4">
            <div className="h-12 bg-white/10 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-white/10 rounded w-48 animate-pulse"></div>
          </div>
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-4 bg-white/10 rounded w-full animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
