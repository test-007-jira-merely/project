import { createClient as createBrowserClient } from '@/lib/supabase/client'
import { createClient as createServerClient } from '@/lib/supabase/server'
import type { Post, PostInsert, PostUpdate, PaginatedResponse } from '@/lib/types'

export async function getPublishedPosts(
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedResponse<Post>> {
  const supabase = createBrowserClient()

  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, error, count } = await supabase
    .from('posts')
    .select('*', { count: 'exact' })
    .eq('published', true)
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    console.error('Error fetching published posts:', error)
    return { data: [], total: 0, page, pageSize }
  }

  return {
    data: data || [],
    total: count || 0,
    page,
    pageSize,
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = createBrowserClient()

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) {
    console.error('Error fetching post by slug:', error)
    return null
  }

  return data
}

export async function getAllPosts(): Promise<Post[]> {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching all posts:', error)
    return []
  }

  return data || []
}

export async function createPost(post: PostInsert): Promise<Post | null> {
  const supabase = createBrowserClient()

  const { data, error } = await supabase
    .from('posts')
    .insert(post)
    .select()
    .single()

  if (error) {
    console.error('Error creating post:', error)
    return null
  }

  return data
}

export async function updatePost(id: string, post: PostUpdate): Promise<Post | null> {
  const supabase = createBrowserClient()

  const { data, error } = await supabase
    .from('posts')
    .update(post)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating post:', error)
    return null
  }

  return data
}

export async function deletePost(id: string): Promise<boolean> {
  const supabase = createBrowserClient()

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting post:', error)
    return false
  }

  return true
}

export async function togglePostPublished(id: string, published: boolean): Promise<boolean> {
  const supabase = createBrowserClient()

  const { error } = await supabase
    .from('posts')
    .update({ published })
    .eq('id', id)

  if (error) {
    console.error('Error toggling post published status:', error)
    return false
  }

  return true
}

// Helper function to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}
