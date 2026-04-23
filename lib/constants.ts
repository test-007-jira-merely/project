export const SECTIONS = {
  HOME: 'home',
  ABOUT: 'about',
  WORKS: 'works',
  CONTACT: 'contact',
} as const

export type SectionId = typeof SECTIONS[keyof typeof SECTIONS]

export const SCROLL_THRESHOLD = 20

export const ANIMATIONS = {
  HEADER_INITIAL_Y: -100,
  HEADER_DURATION: 0.5,
  HOVER_SCALE: 1.05,
  TAP_SCALE: 0.95,
} as const

export const STYLES = {
  NAV_BUTTON: 'text-white/80 hover:text-white transition-colors duration-300',
  TRANSITION_DEFAULT: 'transition-colors duration-300',
} as const
