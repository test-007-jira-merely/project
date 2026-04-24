import type { SectionId } from './constants'

/**
 * Smoothly scrolls to a section by ID
 * @param id - The section ID to scroll to
 */
export function scrollToSection(id: SectionId | string): void {
  const element = document.getElementById(id)
  if (!element) {
    console.warn(`Section with id "${id}" not found`)
    return
  }

  element.scrollIntoView({ behavior: 'smooth' })
}

/**
 * Throttles a function to execute at most once per specified interval
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0

  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func(...args)
    }
  }
}
