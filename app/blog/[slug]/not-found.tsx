import Link from 'next/link'
import { FileQuestion, ArrowLeft, Home } from 'lucide-react'

export default function PostNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center section-padding">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal/20 mb-6">
          <FileQuestion className="text-teal" size={40} />
        </div>

        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-white/60 mb-8 max-w-md">
          The blog post you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white rounded-lg font-medium hover:bg-teal-light transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Blog
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 glass-effect text-white rounded-lg font-medium hover:border-teal transition-colors"
          >
            <Home size={18} />
            Go Home
          </Link>
        </div>
      </div>
    </main>
  )
}
