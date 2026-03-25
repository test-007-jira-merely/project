import { createClient } from '@/lib/supabase/server';
import type { Project, ProjectInsert, ProjectUpdate, ServiceResult } from '@/lib/database.types';

export async function getProjects(limit?: number): Promise<ServiceResult<Project[]>> {
  try {
    const supabase = await createClient();

    let query = supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to fetch projects',
    };
  }
}

export async function getProjectById(id: string): Promise<ServiceResult<Project>> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to fetch project',
    };
  }
}

export async function createProject(project: ProjectInsert): Promise<ServiceResult<Project>> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to create project',
    };
  }
}

export async function updateProject(id: string, project: ProjectUpdate): Promise<ServiceResult<Project>> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('projects')
      .update(project)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to update project',
    };
  }
}

export async function deleteProject(id: string): Promise<ServiceResult<null>> {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return { data: null, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to delete project',
    };
  }
}
