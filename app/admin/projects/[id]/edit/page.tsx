import { notFound } from 'next/navigation'
import ProjectForm from '@/components/admin/ProjectForm'
import { createClient } from '@/lib/supabase/server'

interface EditProjectPageProps {
  params: Promise<{ id: string }>
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !project) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Edit Project</h1>
        <p className="text-white/60">Update your portfolio project</p>
      </div>

      <ProjectForm project={project} />
    </div>
  )
}
