import { getProjects } from '@/lib/services/projects'
import ProjectsManager from '@/components/admin/ProjectsManager'

export default async function AdminProjectsPage() {
  const result = await getProjects()
  const projects = result.data || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Projects</h1>
        <p className="text-slate-300">
          Manage projects displayed in the Recent Works section
        </p>
      </div>

      <ProjectsManager projects={projects} />
    </div>
  )
}
