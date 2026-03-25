import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import type { Post, PostInsert, PostUpdate } from '@/lib/types/database'

const POSTS_PER_PAGE = 10

// Server-side functions
export async function getPublishedPosts(page = 1): Promise<{ posts: Post[]; totalPages: number }> {
  const supabase = await createServerClient()
  const from = (page - 1) * POSTS_PER_PAGE
  const to = from + POSTS_PER_PAGE - 1

  const { data: posts, error, count } = await supabase
    .from('posts')
    .select('*', { count: 'exact' })
    .eq('published', true)
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    console.error('Error fetching posts:', error)
    return { posts: [], totalPages: 0 }
  }

  const totalPages = count ? Math.ceil(count / POSTS_PER_PAGE) : 0
  return { posts: posts ?? [], totalPages }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = await createServerClient()

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) {
    console.error('Error fetching post:', error)
    return null
  }

  return post
}

export async function getAllPosts(): Promise<Post[]> {
  const supabase = await createServerClient()

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching all posts:', error)
    return []
  }

  return posts ?? []
}

// Client-side functions for admin
export async function createPost(post: PostInsert): Promise<Post | null> {
  const supabase = createBrowserClient()

  const { data, error } = await supabase
    .from('posts')
    .insert(post)
    .select()
    .single()

  if (error) {
    console.error('Error creating post:', error)
    throw new Error(error.message)
  }

  return data
}

export async function updatePost(id: string, post: PostUpdate): Promise<Post | null> {
  const supabase = createBrowserClient()

  const { data, error } = await supabase
    .from('posts')
    .update({ ...post, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating post:', error)
    throw new Error(error.message)
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
    throw new Error(error.message)
  }

  return true
}

export async function togglePostPublished(id: string, published: boolean): Promise<Post | null> {
  return updatePost(id, { published })
}
