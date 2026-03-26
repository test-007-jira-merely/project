export interface Post {
  id: string
  title: string
  slug: string
  content: string
  cover_image: string | null
  published: boolean
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  title: string
  description: string
  image_url: string
  project_url: string | null
  created_at: string
}

export interface CreatePostInput {
  title: string
  slug: string
  content: string
  cover_image?: string | null
  published?: boolean
}

export interface UpdatePostInput {
  title?: string
  slug?: string
  content?: string
  cover_image?: string | null
  published?: boolean
}

export interface CreateProjectInput {
  title: string
  description: string
  image_url: string
  project_url?: string | null
}

export interface UpdateProjectInput {
  title?: string
  description?: string
  image_url?: string
  project_url?: string | null
}
