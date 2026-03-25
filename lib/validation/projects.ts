import { z } from 'zod'

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const projectMutationSchema = z.object({
  slug: z.string().regex(slugRegex, 'Slug must use kebab-case').optional(),
  title: z.string().min(3).max(120),
  summary: z.string().min(10).max(280),
  descriptionMarkdown: z.string().nullable().optional(),
  projectUrl: z.string().url().nullable().optional(),
  repositoryUrl: z.string().url().nullable().optional(),
  coverImageUrl: z.string().url().nullable().optional(),
  tags: z.array(z.string().min(1)).max(20).default([]),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  publishedAt: z.string().datetime().nullable().optional(),
})

export const projectFiltersSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
  featuredOnly: z.coerce.boolean().optional(),
  publishedOnly: z.coerce.boolean().optional(),
  search: z.string().trim().min(1).optional(),
})

export const projectPublishSchema = z.object({
  isPublished: z.boolean(),
})

export type ProjectMutationValues = z.infer<typeof projectMutationSchema>
export type ProjectFiltersValues = z.infer<typeof projectFiltersSchema>
