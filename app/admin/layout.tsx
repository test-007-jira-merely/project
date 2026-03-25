import { requireAdmin } from '@/lib/auth'
import AdminNav from '@/components/admin/AdminNav'
import { Suspense } from 'react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAdmin()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <AdminNav />
      <main className="container mx-auto px-4 py-8">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          }
        >
          {children}
        </Suspense>
      </main>
    </div>
  )
}
