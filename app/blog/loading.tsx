export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="h-12 w-64 bg-white/5 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-96 bg-white/5 rounded-lg mx-auto animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
              <div className="aspect-video bg-slate-800 animate-pulse" />
              <div className="p-6 space-y-3">
                <div className="h-6 bg-white/5 rounded animate-pulse" />
                <div className="h-4 bg-white/5 rounded w-3/4 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
