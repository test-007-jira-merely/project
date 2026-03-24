// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  BLOG_POSTS_PER_PAGE: 6,
} as const;

// Project categories
export const PROJECT_CATEGORIES = ['UI', 'UX', 'Web Design'] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

// Color options for projects
export const PROJECT_COLORS = [
  'purple',
  'gray',
  'teal',
  'blue',
  'green',
  'orange',
  'pink',
  'indigo',
  'red',
] as const;
export type ProjectColor = (typeof PROJECT_COLORS)[number];

// Color map for Tailwind classes
export const COLOR_MAP: Record<ProjectColor, string> = {
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

// Routes
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
