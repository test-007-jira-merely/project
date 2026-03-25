import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/services/projects';
import ProjectForm from '@/components/admin/ProjectForm';

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const result = await getProjectById(id);

  if (result.error || !result.data) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Project</h1>
      <ProjectForm project={result.data} />
    </div>
  );
}

export const metadata = {
  title: 'Edit Project | Admin Dashboard',
};
