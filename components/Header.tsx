'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useFavorites } from '@/context/FavoritesContext'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/hello', label: 'Hello' },
  { href: '/#about', label: 'About Me' },
  { href: '/#contact', label: 'Contact' },
  { href: '/favorites', label: 'Favorites' },
  { href: '/journey', label: 'Journey' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { favoriteIds } = useFavorites()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold cursor-pointer"
            >
              Beezi Test <span className="text-teal">React</span>
            </motion.div>
          </Link>

          {/* Navigation Menu */}
          <div className="flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${
                    isActive ? 'nav-link-active' : 'nav-link'
                  } relative flex items-center gap-2`}
                >
                  {link.label}
                  {link.href === '/favorites' && favoriteIds.length > 0 && (
                    <span className="px-2 py-0.5 text-xs bg-teal text-white rounded-full font-bold">
                      {favoriteIds.length}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </motion.header>
  )
}
