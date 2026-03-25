'use server'

import { createClient } from '@/lib/supabase/server'
import {
  Post,
  PostInsert,
  PostUpdate,
  ServiceResponse,
  PaginatedResponse,
} from '@/lib/types/database'
import { revalidatePath } from 'next/cache'

export async function getPosts(params: {
  page?: number
  pageSize?: number
  publishedOnly?: boolean
}): Promise<ServiceResponse<PaginatedResponse<Post>>> {
  try {
    const { page = 1, pageSize = 10, publishedOnly = true } = params
    const supabase = await createClient()

    let query = supabase.from('posts').select('*', { count: 'exact' })

    if (publishedOnly) {
      query = query.eq('published', true)
    }

    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) {
      return { data: null, error: error.message }
    }

    return {
      data: {
        data: data as Post[],
        count: count || 0,
        page,
        pageSize,
        totalPages: Math.ceil((count || 0) / pageSize),
      },
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

export async function getPostBySlug(
  slug: string,
  publishedOnly = true
): Promise<ServiceResponse<Post>> {
  try {
    const supabase = await createClient()

    let query = supabase.from('posts').select('*').eq('slug', slug).single()

    if (publishedOnly) {
      query = query.eq('published', true)
    }

    const { data, error } = await query

    if (error) {
      return { data: null, error: error.message }
    }

    return { data: data as Post, error: null }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

export async function getPostById(id: string): Promise<ServiceResponse<Post>> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return { data: null, error: error.message }
    }

    return { data: data as Post, error: null }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

export async function createPost(
  post: PostInsert
): Promise<ServiceResponse<Post>> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('posts')
      .insert(post)
      .select()
      .single()

    if (error) {
      return { data: null, error: error.message }
    }

    revalidatePath('/blog')
    revalidatePath('/admin/posts')

    return { data: data as Post, error: null }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

export async function updatePost(
  id: string,
  updates: PostUpdate
): Promise<ServiceResponse<Post>> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return { data: null, error: error.message }
    }

    revalidatePath('/blog')
    revalidatePath(`/blog/${data.slug}`)
    revalidatePath('/admin/posts')

    return { data: data as Post, error: null }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

export async function deletePost(id: string): Promise<ServiceResponse<void>> {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from('posts').delete().eq('id', id)

    if (error) {
      return { data: null, error: error.message }
    }

    revalidatePath('/blog')
    revalidatePath('/admin/posts')

    return { data: undefined as void, error: null }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

export async function togglePostPublished(
  id: string,
  published: boolean
): Promise<ServiceResponse<Post>> {
  return updatePost(id, { published })
}

export async function generateSlug(title: string): Promise<string> {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  const supabase = await createClient()
  const { data } = await supabase
    .from('posts')
    .select('slug')
    .like('slug', `${baseSlug}%`)

  if (!data || data.length === 0) {
    return baseSlug
  }

  let counter = 1
  let slug = `${baseSlug}-${counter}`
  while (data.some((post) => post.slug === slug)) {
    counter++
    slug = `${baseSlug}-${counter}`
  }

  return slug
}
