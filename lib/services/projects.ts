'use server'

import { createClient } from '@/lib/supabase/server'
import {
  Project,
  ProjectInsert,
  ProjectUpdate,
  ServiceResponse,
} from '@/lib/types/database'
import { revalidatePath } from 'next/cache'

export async function getProjects(): Promise<ServiceResponse<Project[]>> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      return { data: null, error: error.message }
    }

    return { data: data as Project[], error: null }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

export async function getProjectById(
  id: string
): Promise<ServiceResponse<Project>> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return { data: null, error: error.message }
    }

    return { data: data as Project, error: null }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

export async function createProject(
  project: ProjectInsert
): Promise<ServiceResponse<Project>> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single()

    if (error) {
      return { data: null, error: error.message }
    }

    revalidatePath('/')
    revalidatePath('/admin/projects')

    return { data: data as Project, error: null }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

export async function updateProject(
  id: string,
  updates: ProjectUpdate
): Promise<ServiceResponse<Project>> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return { data: null, error: error.message }
    }

    revalidatePath('/')
    revalidatePath('/admin/projects')

    return { data: data as Project, error: null }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

export async function deleteProject(
  id: string
): Promise<ServiceResponse<void>> {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from('projects').delete().eq('id', id)

    if (error) {
      return { data: null, error: error.message }
    }

    revalidatePath('/')
    revalidatePath('/admin/projects')

    return { data: undefined as void, error: null }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

export async function reorderProjects(
  projectIds: string[]
): Promise<ServiceResponse<void>> {
  try {
    const supabase = await createClient()

    const updates = projectIds.map((id, index) => ({
      id,
      order_index: index,
    }))

    const { error } = await supabase.from('projects').upsert(updates)

    if (error) {
      return { data: null, error: error.message }
    }

    revalidatePath('/')
    revalidatePath('/admin/projects')

    return { data: undefined as void, error: null }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}
