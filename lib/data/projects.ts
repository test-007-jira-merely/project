import slugify from 'slugify'
import { z } from 'zod'

import { toRepositoryError } from '@/lib/supabase/errors'
import { type Database } from '@/lib/supabase/database.types'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import {
  projectFiltersSchema,
  projectMutationSchema,
  projectPublishSchema,
  type ProjectFiltersValues,
} from '@/lib/validation/projects'
import type { PaginatedResult, RepositoryResult } from '@/types/common'
import type { Project, ProjectFilters, ProjectMutationInput } from '@/types/content'

type ProjectRow = Database['public']['Tables']['projects']['Row']

const toValidationError = (error: z.ZodError): RepositoryResult<never> => ({
  ok: false,
  error: {
    code: 'VALIDATION_ERROR',
    message: 'Invalid project input',
    details: error.flatten(),
  },
})

const mapProject = (row: ProjectRow): Project => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  summary: row.summary,
  descriptionMarkdown: row.description_markdown,
  projectUrl: row.project_url,
  repositoryUrl: row.repository_url,
  coverImageUrl: row.cover_image_url,
  tags: row.tags,
  isFeatured: row.is_featured,
  isPublished: row.is_published,
  publishedAt: row.published_at,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
})

const normalizeProjectMutationInput = (input: ProjectMutationInput) => {
  const normalizedSlug = input.slug ?? slugify(input.title, { lower: true, strict: true, trim: true })

  return {
    slug: normalizedSlug,
    title: input.title,
    summary: input.summary,
    description_markdown: input.descriptionMarkdown ?? null,
    project_url: input.projectUrl ?? null,
    repository_url: input.repositoryUrl ?? null,
    cover_image_url: input.coverImageUrl ?? null,
    tags: input.tags ?? [],
    is_featured: input.isFeatured ?? false,
    is_published: input.isPublished ?? false,
    published_at: input.publishedAt ?? null,
  }
}

const applyFilters = (
  query: ReturnType<Awaited<ReturnType<typeof createSupabaseServerClient>>['from']>,
  filters: ProjectFiltersValues,
) => {
  if (filters.featuredOnly) {
    query = query.eq('is_featured', true)
  }

  if (filters.publishedOnly) {
    query = query.eq('is_published', true)
  }

  if (filters.search) {
    const searchTerm = `%${filters.search}%`
    query = query.or(`title.ilike.${searchTerm},summary.ilike.${searchTerm}`)
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

export const listPublicProjects = async (
  filters: Omit<ProjectFilters, 'publishedOnly'> = {},
): Promise<RepositoryResult<PaginatedResult<Project>>> => {
  const parsedFilters = projectFiltersSchema.safeParse({ ...filters, publishedOnly: true })
  if (!parsedFilters.success) {
    return toValidationError(parsedFilters.error)
  }

  const { page, pageSize } = parsedFilters.data
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const supabase = await createSupabaseServerClient()

  let query = supabase
    .from('projects')
    .select('*', { count: 'exact' })
    .order('is_featured', { ascending: false })
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })

  query = applyFilters(query, parsedFilters.data)

  const { data, error, count } = await query.range(from, to)

  if (error) {
    return {
      ok: false,
      error: toRepositoryError(error, 'Failed to list public projects'),
    }
  }

  return {
    ok: true,
    data: paginate((data ?? []).map(mapProject), page, pageSize, count ?? 0),
  }
}

export const listAdminProjects = async (
  filters: ProjectFilters = {},
): Promise<RepositoryResult<PaginatedResult<Project>>> => {
  const parsedFilters = projectFiltersSchema.safeParse(filters)
  if (!parsedFilters.success) {
    return toValidationError(parsedFilters.error)
  }

  const { page, pageSize } = parsedFilters.data
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const supabase = await createSupabaseServerClient()

  let query = supabase
    .from('projects')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  query = applyFilters(query, parsedFilters.data)

  const { data, error, count } = await query.range(from, to)

  if (error) {
    return {
      ok: false,
      error: toRepositoryError(error, 'Failed to list admin projects'),
    }
  }

  return {
    ok: true,
    data: paginate((data ?? []).map(mapProject), page, pageSize, count ?? 0),
  }
}

export const getPublicProjectBySlug = async (
  slug: string,
): Promise<RepositoryResult<Project | null>> => {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle()

  if (error) {
    return {
      ok: false,
      error: toRepositoryError(error, 'Failed to fetch project by slug'),
    }
  }

  return {
    ok: true,
    data: data ? mapProject(data) : null,
  }
}

export const getAdminProjectBySlug = async (
  slug: string,
): Promise<RepositoryResult<Project | null>> => {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    return {
      ok: false,
      error: toRepositoryError(error, 'Failed to fetch admin project by slug'),
    }
  }

  return {
    ok: true,
    data: data ? mapProject(data) : null,
  }
}

export const createProject = async (
  input: ProjectMutationInput,
): Promise<RepositoryResult<Project>> => {
  const parsedInput = projectMutationSchema.safeParse(input)
  if (!parsedInput.success) {
    return toValidationError(parsedInput.error)
  }

  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('projects')
    .insert(normalizeProjectMutationInput(parsedInput.data))
    .select('*')
    .single()

  if (error) {
    return {
      ok: false,
      error: toRepositoryError(error, 'Failed to create project'),
    }
  }

  return {
    ok: true,
    data: mapProject(data),
  }
}

export const updateProject = async (
  id: string,
  input: Partial<ProjectMutationInput>,
): Promise<RepositoryResult<Project>> => {
  const parsedInput = projectMutationSchema.partial().safeParse(input)
  if (!parsedInput.success) {
    return toValidationError(parsedInput.error)
  }

  const updates: Partial<Database['public']['Tables']['projects']['Update']> = {}

  if (parsedInput.data.slug !== undefined) {
    updates.slug = parsedInput.data.slug
  }

  if (parsedInput.data.title !== undefined) {
    updates.title = parsedInput.data.title
    if (parsedInput.data.slug === undefined) {
      updates.slug = slugify(parsedInput.data.title, { lower: true, strict: true, trim: true })
    }
  }

  if (parsedInput.data.summary !== undefined) {
    updates.summary = parsedInput.data.summary
  }

  if (parsedInput.data.descriptionMarkdown !== undefined) {
    updates.description_markdown = parsedInput.data.descriptionMarkdown ?? null
  }

  if (parsedInput.data.projectUrl !== undefined) {
    updates.project_url = parsedInput.data.projectUrl ?? null
  }

  if (parsedInput.data.repositoryUrl !== undefined) {
    updates.repository_url = parsedInput.data.repositoryUrl ?? null
  }

  if (parsedInput.data.coverImageUrl !== undefined) {
    updates.cover_image_url = parsedInput.data.coverImageUrl ?? null
  }

  if (parsedInput.data.tags !== undefined) {
    updates.tags = parsedInput.data.tags
  }

  if (parsedInput.data.isFeatured !== undefined) {
    updates.is_featured = parsedInput.data.isFeatured
  }

  if (parsedInput.data.isPublished !== undefined) {
    updates.is_published = parsedInput.data.isPublished
  }

  if (parsedInput.data.publishedAt !== undefined) {
    updates.published_at = parsedInput.data.publishedAt ?? null
  }

  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single()

  if (error) {
    return {
      ok: false,
      error: toRepositoryError(error, 'Failed to update project'),
    }
  }

  return {
    ok: true,
    data: mapProject(data),
  }
}

export const deleteProject = async (id: string): Promise<RepositoryResult<null>> => {
  const supabase = await createSupabaseServerClient()

  const { error } = await supabase.from('projects').delete().eq('id', id)

  if (error) {
    return {
      ok: false,
      error: toRepositoryError(error, 'Failed to delete project'),
    }
  }

  return {
    ok: true,
    data: null,
  }
}

export const setProjectPublishStatus = async (
  id: string,
  isPublished: boolean,
): Promise<RepositoryResult<Project>> => {
  const parsedStatus = projectPublishSchema.safeParse({ isPublished })
  if (!parsedStatus.success) {
    return toValidationError(parsedStatus.error)
  }

  const supabase = await createSupabaseServerClient()
  const publishedAt = parsedStatus.data.isPublished ? new Date().toISOString() : null

  const { data, error } = await supabase
    .from('projects')
    .update({
      is_published: parsedStatus.data.isPublished,
      published_at: publishedAt,
    })
    .eq('id', id)
    .select('*')
    .single()

  if (error) {
    return {
      ok: false,
      error: toRepositoryError(error, 'Failed to update project publish status'),
    }
  }

  return {
    ok: true,
    data: mapProject(data),
  }
}
