import type { ISODateString, PaginatedQuery, UUID } from '@/types/common'

export type PublishStatus = 'draft' | 'published'

export type Post = {
  id: UUID
  slug: string
  title: string
  excerpt: string | null
  contentMarkdown: string
  coverImageUrl: string | null
  tags: string[]
  status: PublishStatus
  publishedAt: ISODateString | null
  createdAt: ISODateString
  updatedAt: ISODateString
}

export type Project = {
  id: UUID
  slug: string
  title: string
  summary: string
  descriptionMarkdown: string | null
  projectUrl: string | null
  repositoryUrl: string | null
  coverImageUrl: string | null
  tags: string[]
  isFeatured: boolean
  isPublished: boolean
  publishedAt: ISODateString | null
  createdAt: ISODateString
  updatedAt: ISODateString
}

export type PostFilters = PaginatedQuery & {
  status?: PublishStatus
  search?: string
  tag?: string
}

export type ProjectFilters = PaginatedQuery & {
  featuredOnly?: boolean
  publishedOnly?: boolean
  search?: string
}

export type PostMutationInput = {
  slug?: string
  title: string
  excerpt?: string | null
  contentMarkdown: string
  coverImageUrl?: string | null
  tags?: string[]
  status?: PublishStatus
  publishedAt?: ISODateString | null
}

export type ProjectMutationInput = {
  slug?: string
  title: string
  summary: string
  descriptionMarkdown?: string | null
  projectUrl?: string | null
  repositoryUrl?: string | null
  coverImageUrl?: string | null
  tags?: string[]
  isFeatured?: boolean
  isPublished?: boolean
  publishedAt?: ISODateString | null
}
