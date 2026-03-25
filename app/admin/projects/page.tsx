import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getProjects } from '@/lib/services/projects'
import ProjectsTable from '@/components/admin/ProjectsTable'

export default async function AdminProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="text-white/60">Manage your portfolio projects</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="px-4 py-2 bg-teal text-white rounded-lg font-medium hover:bg-teal-light transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          New Project
        </Link>
      </div>

      <ProjectsTable projects={projects} />
    </div>
  )
}
