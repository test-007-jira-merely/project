import { PostCardSkeleton } from '@/components/LoadingSkeleton'

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-12 bg-white/10 rounded w-48 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-white/10 rounded w-96 mx-auto animate-pulse"></div>
          </div>

          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
