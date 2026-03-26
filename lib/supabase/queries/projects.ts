import { createClient } from '../client'
import type { Project, CreateProjectInput, UpdateProjectInput } from '../types'

export async function getProjects() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
    throw new Error('Failed to fetch projects')
  }

  return data as Project[]
}

export async function getProjectById(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching project:', error)
    throw new Error('Failed to fetch project')
  }

  return data as Project
}

export async function createProject(input: CreateProjectInput) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('projects')
    .insert(input)
    .select()
    .single()

  if (error) {
    console.error('Error creating project:', error)
    throw new Error('Failed to create project')
  }

  return data as Project
}

export async function updateProject(id: string, input: UpdateProjectInput) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('projects')
    .update(input)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating project:', error)
    throw new Error('Failed to update project')
  }

  return data as Project
}

export async function deleteProject(id: string) {
  const supabase = createClient()

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting project:', error)
    throw new Error('Failed to delete project')
  }
}
