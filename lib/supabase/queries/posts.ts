import { createClient } from '../client'
import type { Post, CreatePostInput, UpdatePostInput } from '../types'

export async function getPosts(publishedOnly = false) {
  const supabase = createClient()

  let query = supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (publishedOnly) {
    query = query.eq('published', true)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching posts:', error)
    throw new Error('Failed to fetch posts')
  }

  return data as Post[]
}

export async function getPostBySlug(slug: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null // Post not found
    }
    console.error('Error fetching post:', error)
    throw new Error('Failed to fetch post')
  }

  return data as Post
}

export async function getPostById(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching post:', error)
    throw new Error('Failed to fetch post')
  }

  return data as Post
}

export async function createPost(input: CreatePostInput) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('posts')
    .insert(input)
    .select()
    .single()

  if (error) {
    console.error('Error creating post:', error)
    throw new Error('Failed to create post')
  }

  return data as Post
}

export async function updatePost(id: string, input: UpdatePostInput) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('posts')
    .update(input)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating post:', error)
    throw new Error('Failed to update post')
  }

  return data as Post
}

export async function deletePost(id: string) {
  const supabase = createClient()

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting post:', error)
    throw new Error('Failed to delete post')
  }
}

export async function togglePostPublished(id: string, published: boolean) {
  return updatePost(id, { published })
}
