import { supabase } from '@/lib/supabase';
import type {
  Project,
  ProjectCreate,
  ProjectUpdate,
  ServiceResponse,
} from '@/types/database';

const TABLE_NAME = 'projects';

export const projectsService = {
  // Get all projects (sorted by created_at desc)
  async getAll(): Promise<ServiceResponse<Project[]>> {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { data: data as Project[], error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to fetch projects',
      };
    }
  },

  // Get project by ID
  async getById(id: string): Promise<ServiceResponse<Project>> {
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
  },

  // Create new project
  async create(project: ProjectCreate): Promise<ServiceResponse<Project>> {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .insert(project)
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
  },

  // Update project
  async update(id: string, project: ProjectUpdate): Promise<ServiceResponse<Project>> {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .update(project)
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
  },

  // Delete project
  async delete(id: string): Promise<ServiceResponse<boolean>> {
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
  },
};
