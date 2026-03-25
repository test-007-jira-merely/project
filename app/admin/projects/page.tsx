import Link from 'next/link';
import { getProjects } from '@/lib/services/projects';
import { Plus } from 'lucide-react';
import ProjectsTable from '@/components/admin/ProjectsTable';

export default async function ProjectsPage() {
  const result = await getProjects();
  const projects = result.data || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-white/60 mt-1">Manage your portfolio projects</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal-light transition-colors"
        >
          <Plus size={20} />
          New Project
        </Link>
      </div>

      {/* Projects Table */}
      <ProjectsTable projects={projects} />
    </div>
  );
}

export const metadata = {
  title: 'Projects | Admin Dashboard',
};
