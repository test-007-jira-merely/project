import { useState, useEffect } from 'react'

export function useScrollDetection(threshold: number = 20): boolean {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      const scrolled = window.scrollY > threshold
      setIsScrolled((prev) => (prev === scrolled ? prev : scrolled))
    }

    // Throttle scroll events to ~100ms for performance
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })

    // Call once to set initial state
    handleScroll()

    return () => window.removeEventListener('scroll', throttledScroll)
  }, [threshold])

  return isScrolled
}
