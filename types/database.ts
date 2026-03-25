// Database table types
export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image: string | null;
  created_at: string;
  updated_at: string;
  published: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  project_url: string | null;
  category: ProjectCategory;
  created_at: string;
}

// Enum types
export type ProjectCategory = 'UI' | 'UX' | 'Web Design';

// Input types for creating/updating
export interface PostInput {
  title: string;
  slug: string;
  content: string;
  cover_image?: string | null;
  published?: boolean;
}

export interface ProjectInput {
  title: string;
  description: string;
  image_url?: string | null;
  project_url?: string | null;
  category: ProjectCategory;
}

// Pagination types
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

// API Response types
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}
