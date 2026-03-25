'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/constants';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    // If not on home page, navigate to home first
    if (pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isHomePage = pathname === '/';
  const isBlogPage = pathname.startsWith('/blog');

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
          <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold cursor-pointer">
            <Link href={ROUTES.HOME}>
              Beezi Test <span className="text-teal">React</span>
            </Link>
          </motion.div>

          {/* Navigation Menu */}
          <div className="flex items-center gap-8">
            {isHomePage ? (
              <>
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
              </>
            ) : (
              <>
                <Link
                  href={ROUTES.HOME}
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  Home
                </Link>
                <Link
                  href="/#about"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  About Me
                </Link>
              </>
            )}

            <Link
              href={ROUTES.BLOG}
              className={`transition-colors duration-300 ${
                isBlogPage ? 'text-teal' : 'text-white/80 hover:text-white'
              }`}
            >
              Blog
            </Link>

            {isHomePage ? (
              <button
                onClick={() => scrollToSection('contact')}
                className="text-white/80 hover:text-white transition-colors duration-300"
              >
                Contact
              </button>
            ) : (
              <Link
                href="/#contact"
                className="text-white/80 hover:text-white transition-colors duration-300"
              >
                Contact
              </Link>
            )}
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
