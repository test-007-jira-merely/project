'use client'

import { motion } from 'framer-motion'
import { scrollToSection, type SectionId } from '@/utils/scroll'
import { useScrolled } from '@/utils/hooks'

const NAV_ITEMS: ReadonlyArray<{ id: SectionId; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Me' },
  { id: 'contact', label: 'Contact' },
]

const NAV_BUTTON_CLASS = 'text-white/80 hover:text-white transition-colors duration-300'

export default function Header() {
  const isScrolled = useScrolled()

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
            onClick={() => scrollToSection('home')}
          >
            Beezi Test
          </motion.div>

          <div className="flex items-center gap-8">
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={NAV_BUTTON_CLASS}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </motion.header>
  )
}
