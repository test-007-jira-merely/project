// UUID type alias for clarity
export type UUID = string;

// Post entity - for blog system
export interface Post {
  id: UUID;
  title: string;
  slug: string;
  content: string;
  cover_image: string | null;
  created_at: string;
  updated_at: string;
  published: boolean;
}

// For creating new posts (omit auto-generated fields)
export type PostCreate = Omit<Post, 'id' | 'created_at' | 'updated_at'>;

// For updating posts (all fields optional except id)
export type PostUpdate = Partial<PostCreate>;

// Project entity - for "My Recent Works"
export interface Project {
  id: UUID;
  title: string;
  description: string;
  image_url: string | null;
  project_url: string | null;
  category: 'UI' | 'UX' | 'Web Design';
  color: string;
  created_at: string;
}

// For creating new projects
export type ProjectCreate = Omit<Project, 'id' | 'created_at'>;

// For updating projects
export type ProjectUpdate = Partial<ProjectCreate>;

// User roles for admin panel
export type UserRole = 'admin' | 'editor';

// User profile (extends Supabase auth user)
export interface UserProfile {
  id: UUID;
  email: string;
  role: UserRole;
  created_at: string;
}

// Pagination params
export interface PaginationParams {
  page: number;
  limit: number;
}

// Paginated response
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Service response wrapper for error handling
export interface ServiceResponse<T> {
  data: T | null;
  error: string | null;
}
