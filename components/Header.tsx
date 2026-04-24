'use client'

import { motion } from 'framer-motion'
import { useScrolled } from '@/hooks/useScrolled'
import { scrollToSection } from '@/lib/scroll'
import { SECTIONS, SCROLL_THRESHOLD } from '@/lib/constants'
import NavButton from './NavButton'

const NAV_ITEMS = [
  { id: SECTIONS.HOME, label: 'Home' },
  { id: SECTIONS.ABOUT, label: 'About Me' },
  { id: SECTIONS.CONTACT, label: 'Contact' },
] as const

export default function Header() {
  const isScrolled = useScrolled(SCROLL_THRESHOLD)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect shadow-lg' : ''
      }`}
    >
      <nav className="container-custom px-6 md:px-12 lg:px-24 py-6">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold cursor-pointer"
            onClick={() => scrollToSection(SECTIONS.HOME)}
            aria-label="Go to home"
          >
            Beezi Test
          </motion.div>

          <div className="flex items-center gap-8" role="navigation" aria-label="Main navigation">
            {NAV_ITEMS.map(({ id, label }) => (
              <NavButton key={id} sectionId={id} label={label} />
            ))}
          </div>
        </div>
      </nav>
    </motion.header>
  )
}
