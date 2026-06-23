'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AchievementBadges from '@/components/AchievementBadges'

const navLinks = [
  { href: '/', label: 'Home', pathnameMatch: '/' },
  { href: '/#about', label: 'About' },
  { href: '/#works', label: 'Works' },
  { href: '/favorites', label: 'Favorites', pathnameMatch: '/favorites' },
  { href: '/journey', label: 'Journey', pathnameMatch: '/journey' },
  { href: '/#contact', label: 'Contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

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
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-4">
            <Link href="/">
              <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold cursor-pointer">
                Beezi Test <span className="text-teal">React</span>
              </motion.div>
            </Link>

            <div className="lg:hidden">
              <AchievementBadges />
            </div>
          </div>

          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-end">
            <div className="flex flex-wrap items-center gap-5 md:gap-8">
              {navLinks.map((link) => {
                const isActive = link.pathnameMatch
                  ? pathname === link.pathnameMatch || pathname.startsWith(`${link.pathnameMatch}/`)
                  : false

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={isActive ? 'nav-link-active' : 'nav-link'}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            <div className="hidden lg:block">
              <AchievementBadges />
            </div>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}
