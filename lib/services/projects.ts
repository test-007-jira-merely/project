import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import type { Project, ProjectInsert, ProjectUpdate } from '@/lib/types/database'

// Server-side functions
export async function getProjects(): Promise<Project[]> {
  const supabase = await createServerClient()

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }

  return projects ?? []
}

export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = await createServerClient()

  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching project:', error)
    return null
  }

  return project
}

// Client-side functions for admin
export async function createProject(project: ProjectInsert): Promise<Project | null> {
  const supabase = createBrowserClient()

  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single()

  if (error) {
    console.error('Error creating project:', error)
    throw new Error(error.message)
  }

  return data
}

export async function updateProject(id: string, project: ProjectUpdate): Promise<Project | null> {
  const supabase = createBrowserClient()

  const { data, error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating project:', error)
    throw new Error(error.message)
  }

  return data
}

export async function deleteProject(id: string): Promise<boolean> {
  const supabase = createBrowserClient()

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting project:', error)
    throw new Error(error.message)
  }

  return true
}
