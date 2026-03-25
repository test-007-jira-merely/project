import { redirect } from 'next/navigation'
import { getUser } from '@/lib/auth'
import AdminNav from '@/components/admin/AdminNav'
import AdminHeader from '@/components/admin/AdminHeader'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-navy">
      <AdminHeader user={user} />
      <div className="flex">
        <AdminNav />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}
