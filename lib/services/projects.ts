import { createClient } from '@/lib/supabase/client';
import { createClient as createServerSupabase } from '@/lib/supabase/server';
import type { Project, ProjectInput, ApiResponse } from '@/types/database';

// Server-side function for homepage
export async function getProjects(): Promise<Project[]> {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data || [];
}

// Client-side functions for admin
export async function getAllProjectsClient(): Promise<Project[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data || [];
}

export async function getProjectById(id: string): Promise<ApiResponse<Project>> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function createProject(project: ProjectInput): Promise<ApiResponse<Project>> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('projects')
    .insert([
      {
        ...project,
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function updateProject(id: string, project: Partial<ProjectInput>): Promise<ApiResponse<Project>> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function deleteProject(id: string): Promise<ApiResponse<null>> {
  const supabase = createClient();

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: null, error: null };
}
