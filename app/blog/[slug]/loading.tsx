export default function PostLoading() {
  return (
    <div className="min-h-screen section-padding pt-24">
      <div className="container-custom max-w-4xl">
        <div className="h-96 bg-white/10 rounded-2xl mb-8 animate-pulse" />
        <div className="space-y-4">
          <div className="h-12 w-3/4 bg-white/10 rounded animate-pulse" />
          <div className="h-6 w-48 bg-white/10 rounded animate-pulse" />
          <div className="glass-effect rounded-2xl p-12 space-y-4">
            <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
            <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
