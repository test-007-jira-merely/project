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
          <h2 className="text-3xl font-bold">Projects</h2>
          <p className="text-white/60">Manage your portfolio projects</p>
        </div>
        <Link href="/admin/projects/new">
          <button className="flex items-center gap-2 px-6 py-3 bg-teal hover:bg-teal-light text-white font-semibold rounded-lg transition-colors glow-effect">
            <Plus className="w-5 h-5" />
            New Project
          </button>
        </Link>
      </div>

      <ProjectsTable projects={projects} />
    </div>
  )
}
