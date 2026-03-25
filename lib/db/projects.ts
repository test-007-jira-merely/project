import { supabase } from '../supabase';
import type { Project, ProjectInput, ProjectCategory, ApiResponse } from '@/types/database';

const TABLE_NAME = 'projects';

export async function getProjects(category?: ProjectCategory): Promise<ApiResponse<Project[]>> {
  try {
    let query = supabase
      .from(TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) throw error;

    return { data: data as Project[], error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to fetch projects',
    };
  }
}

export async function getProjectById(id: string): Promise<ApiResponse<Project>> {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return { data: data as Project, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Project not found',
    };
  }
}

export async function createProject(input: ProjectInput): Promise<ApiResponse<Project>> {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([{
        ...input,
        created_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) throw error;

    return { data: data as Project, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to create project',
    };
  }
}

export async function updateProject(id: string, input: Partial<ProjectInput>): Promise<ApiResponse<Project>> {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(input)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return { data: data as Project, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to update project',
    };
  }
}

export async function deleteProject(id: string): Promise<ApiResponse<boolean>> {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', id);

    if (error) throw error;

    return { data: true, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to delete project',
    };
  }
}
