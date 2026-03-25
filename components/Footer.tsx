'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { Icon: Github, href: '#', label: 'GitHub' },
    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
    { Icon: Twitter, href: '#', label: 'Twitter' },
    { Icon: Mail, href: '#', label: 'Email' },
  ]

  return (
    <footer id="contact" className="section-padding bg-navy-dark/80 border-t border-white/5">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              Saul<span className="text-teal">Design</span>
            </h3>
            <p className="text-white/60 text-sm">
              Creating beautiful and functional digital experiences with passion and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-white/60 hover:text-teal transition-colors duration-300 text-sm"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-white/60 hover:text-teal transition-colors duration-300 text-sm"
                >
                  About Me
                </a>
              </li>
              <li>
                <a
                  href="#works"
                  className="text-white/60 hover:text-teal transition-colors duration-300 text-sm"
                >
                  My Works
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-white/60 hover:text-teal transition-colors duration-300 text-sm"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-white/60 hover:text-teal transition-colors duration-300 text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center hover:bg-teal/20 hover:border-teal transition-all duration-300"
                >
                  <social.Icon size={18} className="text-white/70 hover:text-teal" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              © {currentYear} SaulDesign. All rights reserved.
            </p>

            <p className="text-white/50 text-sm flex items-center gap-2">
              Made with <Heart size={16} className="text-red-500 fill-red-500" /> using Next.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
