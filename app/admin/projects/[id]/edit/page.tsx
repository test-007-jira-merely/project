'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import ProjectForm from '@/components/admin/ProjectForm'
import { updateProject } from '@/lib/services/projects'
import type { Project, ProjectUpdate } from '@/lib/types'

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchProject() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error) {
        setError('Failed to load project')
      } else {
        setProject(data)
      }
      setLoading(false)
    }

    fetchProject()
  }, [params.id])

  const handleSubmit = async (data: ProjectUpdate) => {
    setSaving(true)
    setError('')

    const updated = await updateProject(params.id, data)

    if (updated) {
      router.push('/admin/projects')
      router.refresh()
    } else {
      setError('Failed to update project')
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin w-12 h-12 border-4 border-teal border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!project) {
    return <div className="text-center text-white/60">Project not found</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-white/60 hover:text-teal transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to projects
        </Link>
        <h2 className="text-3xl font-bold">Edit Project</h2>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500">
          {error}
        </div>
      )}

      <ProjectForm project={project} onSubmit={handleSubmit} saving={saving} />
    </div>
  )
}
