'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import NavButton from './NavButton'
import { scrollToSection } from '@/lib/scroll'
import { SECTIONS, SCROLL_THRESHOLD, ANIMATIONS } from '@/lib/constants'

const NAV_ITEMS = [
  { section: SECTIONS.HOME, label: 'Home' },
  { section: SECTIONS.ABOUT, label: 'About Me' },
  { section: SECTIONS.CONTACT, label: 'Contact' },
] as const

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > SCROLL_THRESHOLD
      setIsScrolled(prev => prev !== scrolled ? scrolled : prev)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: ANIMATIONS.HEADER_INITIAL_Y }}
      animate={{ y: 0 }}
      transition={{ duration: ANIMATIONS.HEADER_DURATION }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect shadow-lg' : ''
      }`}
      role="banner"
    >
      <nav className="container-custom px-6 md:px-12 lg:px-24 py-6" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: ANIMATIONS.HOVER_SCALE }}
            className="text-2xl font-bold cursor-pointer"
            onClick={() => scrollToSection(SECTIONS.HOME)}
            aria-label="Go to home section"
          >
            Beezi Test
          </motion.button>

          <div className="flex items-center gap-8">
            {NAV_ITEMS.map(({ section, label }) => (
              <NavButton key={section} section={section} label={label} />
            ))}
          </div>
        </div>
      </nav>
    </motion.header>
  )
}
