import { supabase } from '../supabase';
import type { Post, PostInput, PaginatedResponse, ApiResponse } from '@/types/database';

const TABLE_NAME = 'posts';

export async function getPosts(
  page: number = 1,
  limit: number = 10,
  publishedOnly: boolean = true
): Promise<ApiResponse<PaginatedResponse<Post>>> {
  try {
    let query = supabase
      .from(TABLE_NAME)
      .select('*', { count: 'exact' });

    if (publishedOnly) {
      query = query.eq('published', true);
    }

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (error) throw error;

    return {
      data: {
        data: data as Post[],
        total: count || 0,
        page,
        totalPages: Math.ceil((count || 0) / limit),
      },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to fetch posts',
    };
  }
}

export async function getPostBySlug(slug: string): Promise<ApiResponse<Post>> {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;

    return { data: data as Post, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Post not found',
    };
  }
}

export async function createPost(input: PostInput): Promise<ApiResponse<Post>> {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([{
        ...input,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }])
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
}

export async function updatePost(id: string, input: Partial<PostInput>): Promise<ApiResponse<Post>> {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update({
        ...input,
        updated_at: new Date().toISOString(),
      })
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
}

export async function deletePost(id: string): Promise<ApiResponse<boolean>> {
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
}

export async function togglePostPublished(id: string, published: boolean): Promise<ApiResponse<Post>> {
  return updatePost(id, { published });
}
