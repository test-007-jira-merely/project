import { z } from 'zod'

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const postStatusSchema = z.enum(['draft', 'published'])

export const postMutationSchema = z.object({
  slug: z.string().regex(slugRegex, 'Slug must use kebab-case').optional(),
  title: z.string().min(3).max(120),
  excerpt: z.string().max(280).nullable().optional(),
  contentMarkdown: z.string().min(1),
  coverImageUrl: z.string().url().nullable().optional(),
  tags: z.array(z.string().min(1)).max(20).default([]),
  status: postStatusSchema.default('draft'),
  publishedAt: z.string().datetime().nullable().optional(),
})

export const postFiltersSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
  status: postStatusSchema.optional(),
  search: z.string().trim().min(1).optional(),
  tag: z.string().trim().min(1).optional(),
})

export const postPublishSchema = z.object({
  status: postStatusSchema,
})

export type PostMutationValues = z.infer<typeof postMutationSchema>
export type PostFiltersValues = z.infer<typeof postFiltersSchema>
