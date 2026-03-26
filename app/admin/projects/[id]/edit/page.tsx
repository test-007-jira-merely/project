import { getProjectById } from '@/lib/supabase/queries/projects'
import ProjectForm from '@/components/admin/ProjectForm'
import { notFound } from 'next/navigation'

export default async function EditProjectPage({
  params,
}: {
  params: { id: string }
}) {
  const project = await getProjectById(params.id)

  if (!project) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Edit Project</h1>
      <ProjectForm project={project} />
    </div>
  )
}
