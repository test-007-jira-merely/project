'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <main className="min-h-screen flex items-center justify-center section-padding">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20 mb-6">
          <AlertTriangle className="text-red-400" size={40} />
        </div>

        <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
        <p className="text-white/60 mb-8">
          An unexpected error occurred. Please try again or return to the homepage.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white rounded-lg font-medium hover:bg-teal-light transition-colors"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 glass-effect text-white rounded-lg font-medium hover:border-teal transition-colors"
          >
            <Home size={18} />
            Go Home
          </a>
        </div>
      </div>
    </main>
  )
}
