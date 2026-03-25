export const PROJECT_CATEGORIES = ['UI', 'UX', 'Web Design'] as const
export type ProjectCategoryType = typeof PROJECT_CATEGORIES[number]

export const POSTS_PER_PAGE = 10

export const COLOR_MAP: Record<string, string> = {
  purple: 'bg-purple-600',
  gray: 'bg-gray-600',
  teal: 'bg-teal-600',
  blue: 'bg-blue-600',
  green: 'bg-green-600',
  orange: 'bg-orange-600',
  pink: 'bg-pink-600',
  indigo: 'bg-indigo-600',
  red: 'bg-red-600',
}

export const DEFAULT_PROJECT_COLORS = [
  'purple', 'gray', 'teal', 'blue', 'green', 'orange', 'pink', 'indigo', 'red'
]
