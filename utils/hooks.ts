import { useState, useEffect } from 'react'

export const useScrolled = (threshold: number = 20): boolean => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > threshold
      setIsScrolled(prev => prev !== scrolled ? scrolled : prev)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return isScrolled
}
