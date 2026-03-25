import { createClient as createBrowserClient } from '@/lib/supabase/client'
import { createClient as createServerClient } from '@/lib/supabase/server'
import type { Project, ProjectInsert, ProjectUpdate } from '@/lib/types'

export async function getProjects(): Promise<Project[]> {
  const supabase = createBrowserClient()

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }

  return data || []
}

export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = createBrowserClient()

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching project by id:', error)
    return null
  }

  return data
}

export async function createProject(project: ProjectInsert): Promise<Project | null> {
  const supabase = createBrowserClient()

  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single()

  if (error) {
    console.error('Error creating project:', error)
    return null
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
    return null
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
    return false
  }

  return true
}

export async function reorderProjects(projectIds: string[]): Promise<boolean> {
  const supabase = createBrowserClient()

  // Update display_order for each project
  const updates = projectIds.map((id, index) => ({
    id,
    display_order: index,
  }))

  for (const update of updates) {
    const { error } = await supabase
      .from('projects')
      .update({ display_order: update.display_order })
      .eq('id', update.id)

    if (error) {
      console.error('Error reordering projects:', error)
      return false
    }
  }

  return true
}
