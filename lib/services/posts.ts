import { createClient } from '@/lib/supabase/client';
import { createClient as createServerSupabase } from '@/lib/supabase/server';
import type { Post, PostInput, ApiResponse, PaginatedResponse } from '@/types/database';

const PAGE_SIZE = 10;

// Server-side functions
export async function getPublishedPosts(page = 1): Promise<PaginatedResponse<Post>> {
  const supabase = await createServerSupabase();
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from('posts')
    .select('*', { count: 'exact' })
    .eq('published', true)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Error fetching posts:', error);
    return { data: [], count: 0, page, pageSize: PAGE_SIZE, totalPages: 0 };
  }

  const totalPages = Math.ceil((count || 0) / PAGE_SIZE);
  return { data: data || [], count: count || 0, page, pageSize: PAGE_SIZE, totalPages };
}

export async function getPostBySlug(slug: string): Promise<ApiResponse<Post>> {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

// Admin functions (client-side)
export async function getAllPosts(): Promise<Post[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }

  return data || [];
}

export async function getPostById(id: string): Promise<ApiResponse<Post>> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function createPost(post: PostInput): Promise<ApiResponse<Post>> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        ...post,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function updatePost(id: string, post: Partial<PostInput>): Promise<ApiResponse<Post>> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('posts')
    .update({
      ...post,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function deletePost(id: string): Promise<ApiResponse<null>> {
  const supabase = createClient();

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: null, error: null };
}

export async function togglePostPublished(id: string, published: boolean): Promise<ApiResponse<Post>> {
  return updatePost(id, { published });
}
