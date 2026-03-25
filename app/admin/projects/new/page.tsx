'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ProjectForm from '@/components/admin/ProjectForm'
import { createProject } from '@/lib/services/projects'
import type { ProjectInsert } from '@/lib/types'

export default function NewProjectPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (data: ProjectInsert) => {
    setSaving(true)
    setError('')

    const project = await createProject(data)

    if (project) {
      router.push('/admin/projects')
      router.refresh()
    } else {
      setError('Failed to create project')
      setSaving(false)
    }
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
        <h2 className="text-3xl font-bold">Create New Project</h2>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500">
          {error}
        </div>
      )}

      <ProjectForm onSubmit={handleSubmit} saving={saving} />
    </div>
  )
}
