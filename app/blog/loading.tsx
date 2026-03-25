export default function BlogLoading() {
  return (
    <div className="min-h-screen section-padding pt-24">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="h-12 w-64 bg-white/10 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-96 bg-white/10 rounded-lg mx-auto animate-pulse" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass-effect rounded-2xl overflow-hidden">
              <div className="h-64 bg-white/10 animate-pulse" />
              <div className="p-6 space-y-4">
                <div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
                <div className="h-8 w-full bg-white/10 rounded animate-pulse" />
                <div className="h-20 w-full bg-white/10 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
