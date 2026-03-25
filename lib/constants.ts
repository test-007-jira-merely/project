// Application constants

export const APP_NAME = 'SaulDesign';

export const ROUTES = {
  HOME: '/',
  BLOG: '/blog',
  BLOG_POST: (slug: string) => `/blog/${slug}`,
  ADMIN: '/admin',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_POSTS: '/admin/posts',
  ADMIN_POST_NEW: '/admin/posts/new',
  ADMIN_POST_EDIT: (id: string) => `/admin/posts/${id}/edit`,
  ADMIN_PROJECTS: '/admin/projects',
  ADMIN_PROJECT_NEW: '/admin/projects/new',
  ADMIN_PROJECT_EDIT: (id: string) => `/admin/projects/${id}/edit`,
} as const;

export const PROJECT_CATEGORIES = ['UI', 'UX', 'Web Design'] as const;
export type ProjectCategory = typeof PROJECT_CATEGORIES[number];

export const PAGINATION = {
  POSTS_PER_PAGE: 10,
  PROJECTS_PER_PAGE: 12,
} as const;

// Color mapping for project categories (matching existing design)
export const CATEGORY_COLORS: Record<string, string> = {
  purple: 'bg-purple-600',
  gray: 'bg-gray-600',
  teal: 'bg-teal-600',
  blue: 'bg-blue-600',
  green: 'bg-green-600',
  orange: 'bg-orange-600',
  pink: 'bg-pink-600',
  indigo: 'bg-indigo-600',
  red: 'bg-red-600',
};

export const DEFAULT_PROJECT_COLORS = ['purple', 'gray', 'teal', 'blue', 'green', 'orange', 'pink', 'indigo', 'red'];
