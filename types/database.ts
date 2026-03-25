// Database entity types

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
  category: 'UI' | 'UX' | 'Web Design';
  created_at: string;
}

export interface UserProfile {
  id: string;
  role: 'admin' | 'editor';
  email: string;
}

// Form/Input types
export interface PostInput {
  title: string;
  slug: string;
  content: string;
  cover_image?: string | null;
  published: boolean;
}

export interface ProjectInput {
  title: string;
  description: string;
  image_url?: string | null;
  project_url?: string | null;
  category: 'UI' | 'UX' | 'Web Design';
}

// API Response types
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
