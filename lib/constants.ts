// Section IDs for navigation
export const SECTIONS = {
  HOME: 'home',
  ABOUT: 'about',
  CONTACT: 'contact',
} as const

export type SectionId = typeof SECTIONS[keyof typeof SECTIONS]

// Scroll detection threshold
export const SCROLL_THRESHOLD = 20
