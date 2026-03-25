'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            Beezi Test <span className="text-teal">React</span>
          </motion.div>

          {/* Navigation Menu */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-white/80 hover:text-white transition-colors duration-300"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-white/80 hover:text-white transition-colors duration-300"
            >
              About Me
            </button>
            <a
              href="/blog"
              className="text-white/80 hover:text-white transition-colors duration-300"
            >
              Blog
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white/80 hover:text-white transition-colors duration-300"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}
