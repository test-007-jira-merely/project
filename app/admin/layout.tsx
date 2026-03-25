import { redirect } from 'next/navigation';
import { getUser } from '@/lib/services/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen flex">
      <AdminSidebar userEmail={user.email || 'Admin'} />
      <main className="flex-1 p-8 ml-64">
        {children}
      </main>
    </div>
  );
}
