import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 text-center max-w-md">
        <h2 className="text-2xl font-bold text-white mb-2">Post Not Found</h2>
        <p className="text-slate-300 mb-6">
          The post you're trying to edit doesn't exist.
        </p>
        <Link
          href="/admin/posts"
          className="inline-block px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all"
        >
          Back to Posts
        </Link>
      </div>
    </div>
  )
}
