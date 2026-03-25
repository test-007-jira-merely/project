'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from '@/lib/auth'
import { useState } from 'react'

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleSignOut = async () => {
    setIsLoggingOut(true)
    await signOut()
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/posts', label: 'Posts' },
    { href: '/admin/projects', label: 'Projects' },
  ]

  return (
    <nav className="backdrop-blur-lg bg-white/5 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-white">
              Admin Panel
            </Link>
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'bg-teal-500/20 text-teal-300'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
            >
              View Site
            </Link>
            <button
              onClick={handleSignOut}
              disabled={isLoggingOut}
              className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 text-sm font-medium transition-colors disabled:opacity-50"
            >
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
