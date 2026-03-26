'use client'

import { useRouter } from 'next/navigation'
import { signOut } from '@/lib/supabase/auth'
import { LogOut } from 'lucide-react'
import type { User } from '@supabase/supabase-js'

interface AdminHeaderProps {
  user: User
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Logged in as</p>
          <p className="text-white font-medium">{user.email}</p>
        </div>

        <button
          onClick={handleSignOut}
          className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-slate-300 hover:text-white transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  )
}
