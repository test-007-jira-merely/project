export function PostCardSkeleton() {
  return (
    <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-64 bg-white/5"></div>
      <div className="p-8 space-y-4">
        <div className="h-4 bg-white/10 rounded w-1/4"></div>
        <div className="h-8 bg-white/10 rounded w-3/4"></div>
        <div className="h-4 bg-white/10 rounded w-full"></div>
        <div className="h-4 bg-white/10 rounded w-5/6"></div>
        <div className="h-4 bg-white/10 rounded w-1/4"></div>
      </div>
    </div>
  )
}

export function ProjectCardSkeleton() {
  return (
    <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-64 bg-white/5"></div>
      <div className="p-6 space-y-3">
        <div className="h-6 bg-white/10 rounded w-3/4"></div>
        <div className="h-4 bg-white/10 rounded w-full"></div>
        <div className="h-4 bg-white/10 rounded w-5/6"></div>
        <div className="flex gap-2 mt-4">
          <div className="h-6 bg-white/10 rounded-full w-16"></div>
          <div className="h-6 bg-white/10 rounded-full w-20"></div>
        </div>
      </div>
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              {[1, 2, 3, 4].map((i) => (
                <th key={i} className="px-6 py-4">
                  <div className="h-4 bg-white/10 rounded w-24 animate-pulse"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {Array.from({ length: rows }).map((_, i) => (
              <tr key={i}>
                {[1, 2, 3, 4].map((j) => (
                  <td key={j} className="px-6 py-4">
                    <div className="h-4 bg-white/10 rounded w-32 animate-pulse"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="h-10 bg-white/10 rounded w-48 animate-pulse"></div>
        <div className="h-4 bg-white/10 rounded w-96 animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6"
          >
            <div className="h-4 bg-white/10 rounded w-24 mb-2 animate-pulse"></div>
            <div className="h-10 bg-white/10 rounded w-16 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
