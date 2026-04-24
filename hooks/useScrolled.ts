import { useState, useEffect } from 'react'
import { throttle } from '@/lib/scroll'

/**
 * Custom hook to detect if page has been scrolled past a threshold
 * @param threshold - Scroll position in pixels to trigger the state change
 * @returns boolean indicating if scrolled past threshold
 */
export function useScrolled(threshold: number = 20): boolean {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrolled = window.scrollY > threshold
      setIsScrolled(prev => prev !== scrolled ? scrolled : prev)
    }, 100) // Throttle to ~10 FPS for scroll events

    handleScroll() // Check initial scroll position
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return isScrolled
}
