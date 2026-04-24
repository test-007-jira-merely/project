import { useState, useEffect, useRef } from 'react'
import { throttle } from '@/lib/scroll'

/**
 * Custom hook to detect if page has been scrolled past a threshold
 * @param threshold - Scroll position in pixels to trigger the state change
 * @returns boolean indicating if scrolled past threshold
 */
export function useScrolled(threshold: number = 20): boolean {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > threshold
      setIsScrolled(prev => prev !== scrolled ? scrolled : prev)
    }

    const throttledHandleScroll = throttle(handleScroll, 100) // Throttle to ~10 FPS for scroll events

    throttledHandleScroll() // Check initial scroll position
    window.addEventListener('scroll', throttledHandleScroll, { passive: true })

    return () => window.removeEventListener('scroll', throttledHandleScroll)
  }, [threshold])

  return isScrolled
}
