import { createClient } from '@/lib/supabase/server';
import type { Post, PostInsert, PostUpdate, PaginatedResponse, ServiceResult } from '@/lib/database.types';

const DEFAULT_PAGE_SIZE = 10;

export async function getPosts(
  page: number = 1,
  pageSize: number = DEFAULT_PAGE_SIZE,
  publishedOnly: boolean = true
): Promise<ServiceResult<PaginatedResponse<Post>>> {
  try {
    const supabase = await createClient();
    const offset = (page - 1) * pageSize;

    let query = supabase
      .from('posts')
      .select('*', { count: 'exact' });

    if (publishedOnly) {
      query = query.eq('published', true);
    }

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (error) throw error;

    return {
      data: {
        data: data || [],
        count: count || 0,
        page,
        pageSize,
        totalPages: Math.ceil((count || 0) / pageSize),
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

export async function getPostBySlug(slug: string): Promise<ServiceResult<Post>> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to fetch post',
    };
  }
}

export async function getPostById(id: string): Promise<ServiceResult<Post>> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to fetch post',
    };
  }
}

export async function createPost(post: PostInsert): Promise<ServiceResult<Post>> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('posts')
      .insert(post)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to create post',
    };
  }
}

export async function updatePost(id: string, post: PostUpdate): Promise<ServiceResult<Post>> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('posts')
      .update(post)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to update post',
    };
  }
}

export async function deletePost(id: string): Promise<ServiceResult<null>> {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return { data: null, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to delete post',
    };
  }
}

export async function togglePostPublished(id: string, published: boolean): Promise<ServiceResult<Post>> {
  return updatePost(id, { published });
}

// Utility to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
