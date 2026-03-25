// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 50;

// Categories for projects (matching existing Works component)
export const PROJECT_CATEGORIES = ['UI', 'UX', 'Web Design'] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

// Color map for project cards (matching existing Works component)
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

// Routes
export const ROUTES = {
  HOME: '/',
  BLOG: '/blog',
  ADMIN: '/admin',
  LOGIN: '/login',
} as const;
