export const POSTS_PER_PAGE = 10
export const MAX_TITLE_LENGTH = 200
export const MAX_SLUG_LENGTH = 200

export const PROJECT_CATEGORIES = [
  'UI',
  'UX',
  'Web Design',
  'Mobile App',
  'Branding',
] as const

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]
