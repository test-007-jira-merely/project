// Database table types
export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  project_url: string | null;
  category: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  role: 'admin' | 'editor';
  created_at: string;
}

// Insert/Update types (omit auto-generated fields)
export type PostInsert = Omit<Post, 'id' | 'created_at' | 'updated_at'>;
export type PostUpdate = Partial<Omit<Post, 'id' | 'created_at' | 'updated_at'>>;

export type ProjectInsert = Omit<Project, 'id' | 'created_at'>;
export type ProjectUpdate = Partial<Omit<Project, 'id' | 'created_at'>>;

// API response types
export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ServiceResult<T> {
  data: T | null;
  error: string | null;
}
