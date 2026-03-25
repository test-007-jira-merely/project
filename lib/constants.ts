// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  BLOG_POSTS_PER_PAGE: 9,
} as const;

// Project categories
export const PROJECT_CATEGORIES = ['UI', 'UX', 'Web Design'] as const;
export const PROJECT_FILTER_OPTIONS = ['All', ...PROJECT_CATEGORIES] as const;

// Routes
export const ROUTES = {
  HOME: '/',
  BLOG: '/blog',
  ADMIN: '/admin',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_POSTS: '/admin/posts',
  ADMIN_PROJECTS: '/admin/projects',
} as const;

// Color map for project cards (maintaining existing design)
export const PROJECT_COLOR_MAP: Record<string, string> = {
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

// Default project colors for fallback
export const DEFAULT_PROJECT_COLORS = [
  'purple', 'gray', 'teal', 'blue', 'green', 'orange', 'pink', 'indigo', 'red'
] as const;
