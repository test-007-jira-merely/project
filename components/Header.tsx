'use client'

import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { useScrollDetection } from '@/hooks/useScrollDetection'
import { scrollToSection } from '@/utils/scroll'
import { SECTIONS } from '@/constants/sections'
import { HOVER_SCALE, SLIDE_DOWN } from '@/constants/animations'

const NAV_ITEMS = [
  { id: SECTIONS.HOME, label: 'Home' },
  { id: SECTIONS.ABOUT, label: 'About Me' },
  { id: SECTIONS.CONTACT, label: 'Contact' },
] as const

export default function Header() {
  const isScrolled = useScrollDetection(20)

  const handleNavClick = useCallback((sectionId: string) => {
    scrollToSection(sectionId)
  }, [])

  return (
    <motion.header
      {...SLIDE_DOWN}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect shadow-lg' : ''
      }`}
    >
      <nav className="container-custom px-6 md:px-12 lg:px-24 py-6">
        <div className="flex items-center justify-between">
          <motion.button
            type="button"
            aria-label="Navigate to home section"
            whileHover={HOVER_SCALE}
            className="text-2xl font-bold cursor-pointer bg-transparent border-none"
            onClick={() => handleNavClick(SECTIONS.HOME)}
          >
            Beezi Test
          </motion.button>

          <div className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Navigate to ${item.label}`}
                onClick={() => handleNavClick(item.id)}
                className="text-white/80 hover:text-white transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </motion.header>
  )
}
