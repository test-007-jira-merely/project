import { TableSkeleton } from '@/components/LoadingSkeleton'

export default function AdminPostsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-10 bg-white/10 rounded w-48 animate-pulse"></div>
          <div className="h-4 bg-white/10 rounded w-64 animate-pulse"></div>
        </div>
        <div className="h-12 bg-white/10 rounded w-32 animate-pulse"></div>
      </div>
      <TableSkeleton rows={8} />
    </div>
  )
}
