import ProjectForm from '@/components/admin/ProjectForm'

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Add New Project</h1>
        <p className="text-white/60">Add a new project to your portfolio</p>
      </div>

      <ProjectForm />
    </div>
  )
}
