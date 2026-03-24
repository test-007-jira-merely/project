import { supabase } from '@/lib/supabase';
import type {
  Post,
  PostCreate,
  PostUpdate,
  PaginationParams,
  PaginatedResponse,
  ServiceResponse,
} from '@/types/database';

const TABLE_NAME = 'posts';

export const postsService = {
  // Get all published posts with pagination
  async getPublished(params: PaginationParams): Promise<ServiceResponse<PaginatedResponse<Post>>> {
    const { page, limit } = params;
    const offset = (page - 1) * limit;

    try {
      // Get total count
      const { count, error: countError } = await supabase
        .from(TABLE_NAME)
        .select('*', { count: 'exact', head: true })
        .eq('published', true);

      if (countError) throw countError;

      // Get paginated data
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      return {
        data: {
          data: data as Post[],
          total: count ?? 0,
          page,
          limit,
          totalPages: Math.ceil((count ?? 0) / limit),
        },
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to fetch posts',
      };
    }
  },

  // Get single post by slug (public)
  async getBySlug(slug: string): Promise<ServiceResponse<Post>> {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) throw error;

      return { data: data as Post, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Post not found',
      };
    }
  },

  // Get all posts for admin (including drafts)
  async getAll(): Promise<ServiceResponse<Post[]>> {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { data: data as Post[], error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to fetch posts',
      };
    }
  },

  // Get single post by ID (admin)
  async getById(id: string): Promise<ServiceResponse<Post>> {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      return { data: data as Post, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Post not found',
      };
    }
  },

  // Create new post
  async create(post: PostCreate): Promise<ServiceResponse<Post>> {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .insert(post)
        .select()
        .single();

      if (error) throw error;

      return { data: data as Post, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to create post',
      };
    }
  },

  // Update post
  async update(id: string, post: PostUpdate): Promise<ServiceResponse<Post>> {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .update({ ...post, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return { data: data as Post, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to update post',
      };
    }
  },

  // Delete post
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
        error: error instanceof Error ? error.message : 'Failed to delete post',
      };
    }
  },

  // Toggle publish status
  async togglePublish(id: string, published: boolean): Promise<ServiceResponse<Post>> {
    return this.update(id, { published });
  },
};
