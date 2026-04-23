export const SECTIONS = {
  HOME: 'home',
  ABOUT: 'about',
  WORKS: 'works',
  CONTACT: 'contact',
} as const

export type SectionId = typeof SECTIONS[keyof typeof SECTIONS]
