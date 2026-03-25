export interface Post {
  id: string
  title: string
  slug: string
  content: string
  cover_image: string | null
  created_at: string
  updated_at: string
  published: boolean
}

export interface PostInsert {
  title: string
  slug: string
  content: string
  cover_image?: string | null
  published?: boolean
}

export interface PostUpdate {
  title?: string
  slug?: string
  content?: string
  cover_image?: string | null
  published?: boolean
}

export interface Project {
  id: string
  title: string
  description: string
  image_url: string
  project_url: string
  created_at: string
  tags?: string[]
  order_index?: number
}

export interface ProjectInsert {
  title: string
  description: string
  image_url: string
  project_url: string
  tags?: string[]
  order_index?: number
}

export interface ProjectUpdate {
  title?: string
  description?: string
  image_url?: string
  project_url?: string
  tags?: string[]
  order_index?: number
}

export interface Profile {
  id: string
  email: string
  role: 'admin' | 'editor'
  created_at: string
}

export type ServiceResponse<T> =
  | { data: T; error: null }
  | { data: null; error: string }

export type PaginatedResponse<T> = {
  data: T[]
  count: number
  page: number
  pageSize: number
  totalPages: number
}
