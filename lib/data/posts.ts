import slugify from 'slugify'
import { z } from 'zod'

import { toRepositoryError } from '@/lib/supabase/errors'
import { type Database } from '@/lib/supabase/database.types'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import {
  postFiltersSchema,
  postMutationSchema,
  postPublishSchema,
  type PostFiltersValues,
} from '@/lib/validation/posts'
import type { PaginatedResult, RepositoryResult } from '@/types/common'
import type { Post, PostFilters, PostMutationInput, PublishStatus } from '@/types/content'

type PostRow = Database['public']['Tables']['posts']['Row']

const toValidationError = (error: z.ZodError): RepositoryResult<never> => ({
  ok: false,
  error: {
    code: 'VALIDATION_ERROR',
    message: 'Invalid post input',
    details: error.flatten(),
  },
})

const mapPost = (row: PostRow): Post => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  excerpt: row.excerpt,
  contentMarkdown: row.content_markdown,
  coverImageUrl: row.cover_image_url,
  tags: row.tags,
  status: row.status,
  publishedAt: row.published_at,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
})

const normalizePostMutationInput = (input: PostMutationInput) => {
  const normalizedSlug = input.slug ?? slugify(input.title, { lower: true, strict: true, trim: true })

  return {
    slug: normalizedSlug,
    title: input.title,
    excerpt: input.excerpt ?? null,
    content_markdown: input.contentMarkdown,
    cover_image_url: input.coverImageUrl ?? null,
    tags: input.tags ?? [],
    status: input.status ?? 'draft',
    published_at: input.publishedAt ?? null,
  }
}

const applyFilters = (
  query: ReturnType<Awaited<ReturnType<typeof createSupabaseServerClient>>['from']>,
  filters: PostFiltersValues,
) => {
  if (filters.status) {
    query = query.eq('status', filters.status)
  }

  if (filters.search) {
    const searchTerm = `%${filters.search}%`
    query = query.or(`title.ilike.${searchTerm},excerpt.ilike.${searchTerm}`)
  }

  if (filters.tag) {
    query = query.contains('tags', [filters.tag])
  }

  return query
}

const paginate = <T>(
  data: T[],
  page: number,
  pageSize: number,
  total: number,
): PaginatedResult<T> => ({
  data,
  page,
  pageSize,
  total,
  totalPages: Math.max(1, Math.ceil(total / pageSize)),
})

export const listPublicPosts = async (
  filters: Omit<PostFilters, 'status'> = {},
): Promise<RepositoryResult<PaginatedResult<Post>>> => {
  const parsedFilters = postFiltersSchema.safeParse({ ...filters, status: 'published' })
  if (!parsedFilters.success) {
    return toValidationError(parsedFilters.error)
  }

  const { page, pageSize } = parsedFilters.data
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const supabase = await createSupabaseServerClient()

  let query = supabase
    .from('posts')
    .select('*', { count: 'exact' })
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })

  query = applyFilters(query, parsedFilters.data)

  const { data, error, count } = await query.range(from, to)

  if (error) {
    return {
      ok: false,
      error: toRepositoryError(error, 'Failed to list public posts'),
    }
  }

  return {
    ok: true,
    data: paginate((data ?? []).map(mapPost), page, pageSize, count ?? 0),
  }
}

export const listAdminPosts = async (
  filters: PostFilters = {},
): Promise<RepositoryResult<PaginatedResult<Post>>> => {
  const parsedFilters = postFiltersSchema.safeParse(filters)
  if (!parsedFilters.success) {
    return toValidationError(parsedFilters.error)
  }

  const { page, pageSize } = parsedFilters.data
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const supabase = await createSupabaseServerClient()

  let query = supabase
    .from('posts')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  query = applyFilters(query, parsedFilters.data)

  const { data, error, count } = await query.range(from, to)

  if (error) {
    return {
      ok: false,
      error: toRepositoryError(error, 'Failed to list admin posts'),
    }
  }

  return {
    ok: true,
    data: paginate((data ?? []).map(mapPost), page, pageSize, count ?? 0),
  }
}

export const getPublicPostBySlug = async (slug: string): Promise<RepositoryResult<Post | null>> => {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()

  if (error) {
    return {
      ok: false,
      error: toRepositoryError(error, 'Failed to fetch post by slug'),
    }
  }

  return {
    ok: true,
    data: data ? mapPost(data) : null,
  }
}

export const getAdminPostBySlug = async (slug: string): Promise<RepositoryResult<Post | null>> => {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase.from('posts').select('*').eq('slug', slug).maybeSingle()

  if (error) {
    return {
      ok: false,
      error: toRepositoryError(error, 'Failed to fetch admin post by slug'),
    }
  }

  return {
    ok: true,
    data: data ? mapPost(data) : null,
  }
}

export const createPost = async (input: PostMutationInput): Promise<RepositoryResult<Post>> => {
  const parsedInput = postMutationSchema.safeParse(input)
  if (!parsedInput.success) {
    return toValidationError(parsedInput.error)
  }

  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('posts')
    .insert(normalizePostMutationInput(parsedInput.data))
    .select('*')
    .single()

  if (error) {
    return {
      ok: false,
      error: toRepositoryError(error, 'Failed to create post'),
    }
  }

  return {
    ok: true,
    data: mapPost(data),
  }
}

export const updatePost = async (
  id: string,
  input: Partial<PostMutationInput>,
): Promise<RepositoryResult<Post>> => {
  const parsedInput = postMutationSchema.partial().safeParse(input)
  if (!parsedInput.success) {
    return toValidationError(parsedInput.error)
  }

  const updates: Partial<Database['public']['Tables']['posts']['Update']> = {}

  if (parsedInput.data.slug !== undefined) {
    updates.slug = parsedInput.data.slug
  }

  if (parsedInput.data.title !== undefined) {
    updates.title = parsedInput.data.title
    if (parsedInput.data.slug === undefined) {
      updates.slug = slugify(parsedInput.data.title, { lower: true, strict: true, trim: true })
    }
  }

  if (parsedInput.data.excerpt !== undefined) {
    updates.excerpt = parsedInput.data.excerpt ?? null
  }

  if (parsedInput.data.contentMarkdown !== undefined) {
    updates.content_markdown = parsedInput.data.contentMarkdown
  }

  if (parsedInput.data.coverImageUrl !== undefined) {
    updates.cover_image_url = parsedInput.data.coverImageUrl ?? null
  }

  if (parsedInput.data.tags !== undefined) {
    updates.tags = parsedInput.data.tags
  }

  if (parsedInput.data.status !== undefined) {
    updates.status = parsedInput.data.status
  }

  if (parsedInput.data.publishedAt !== undefined) {
    updates.published_at = parsedInput.data.publishedAt ?? null
  }

  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single()

  if (error) {
    return {
      ok: false,
      error: toRepositoryError(error, 'Failed to update post'),
    }
  }

  return {
    ok: true,
    data: mapPost(data),
  }
}

export const deletePost = async (id: string): Promise<RepositoryResult<null>> => {
  const supabase = await createSupabaseServerClient()

  const { error } = await supabase.from('posts').delete().eq('id', id)

  if (error) {
    return {
      ok: false,
      error: toRepositoryError(error, 'Failed to delete post'),
    }
  }

  return {
    ok: true,
    data: null,
  }
}

export const setPostPublishStatus = async (
  id: string,
  status: PublishStatus,
): Promise<RepositoryResult<Post>> => {
  const parsedStatus = postPublishSchema.safeParse({ status })
  if (!parsedStatus.success) {
    return toValidationError(parsedStatus.error)
  }

  const supabase = await createSupabaseServerClient()
  const publishedAt = parsedStatus.data.status === 'published' ? new Date().toISOString() : null

  const { data, error } = await supabase
    .from('posts')
    .update({
      status: parsedStatus.data.status,
      published_at: publishedAt,
    })
    .eq('id', id)
    .select('*')
    .single()

  if (error) {
    return {
      ok: false,
      error: toRepositoryError(error, 'Failed to update post publish status'),
    }
  }

  return {
    ok: true,
    data: mapPost(data),
  }
}
