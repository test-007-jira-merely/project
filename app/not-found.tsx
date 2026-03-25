import Link from 'next/link'
import { FileQuestion, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center section-padding">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal/20 mb-6">
          <FileQuestion className="text-teal" size={40} />
        </div>

        <h1 className="text-6xl font-bold text-teal mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-white/60 mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white rounded-lg font-medium hover:bg-teal-light transition-colors"
          >
            <Home size={18} />
            Go Home
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 glass-effect text-white rounded-lg font-medium hover:border-teal transition-colors"
          >
            <ArrowLeft size={18} />
            Visit Blog
          </Link>
        </div>
      </div>
    </main>
  )
}
