'use client'

import { motion } from 'framer-motion'
import { Download, ChevronDown } from 'lucide-react'

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const floatingIcons = [
    { text: 'HTML5', x: 100, y: 50, delay: 0 },
    { text: 'CSS3', x: 150, y: 150, delay: 1 },
    { text: 'JS', x: 80, y: 250, delay: 2 },
    { text: 'React', x: 50, y: 180, delay: 1.5 },
    { text: 'AWS', x: 120, y: 300, delay: 2.5 },
  ]

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center section-padding pt-32"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container-custom grid lg:grid-cols-2 gap-12 items-center"
      >
        {/* Left Content */}
        <div className="space-y-8">
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              CREATIVE UI
              <br />
              <span className="text-gradient">DESIGNER</span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-teal text-white rounded-full font-medium hover:bg-teal-light transition-colors duration-300 shadow-lg hover:glow-effect"
            >
              Hire me
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-navy-light text-white rounded-full font-medium border border-white/20 hover:border-teal transition-all duration-300 flex items-center gap-2"
            >
              Download CV
              <Download size={18} />
            </motion.button>
          </motion.div>

          {/* Decorative text curve */}
          <motion.div
            variants={itemVariants}
            className="text-teal/30 text-6xl font-bold"
          >
            &lt;/&gt;
          </motion.div>
        </div>

        {/* Right Illustration */}
        <motion.div
          variants={itemVariants}
          className="relative flex items-center justify-center"
        >
          {/* Floating tech icons in background */}
          <div className="absolute inset-0">
            {floatingIcons.map((icon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 0.3,
                  scale: 1,
                  y: [0, -20, 0],
                }}
                transition={{
                  opacity: { delay: icon.delay, duration: 0.5 },
                  scale: { delay: icon.delay, duration: 0.5 },
                  y: {
                    delay: icon.delay + 0.5,
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
                className="absolute text-teal text-sm font-mono"
                style={{ left: `${icon.x}px`, top: `${icon.y}px` }}
              >
                {icon.text}
              </motion.div>
            ))}
          </div>

          {/* Main Illustration - Person with laptop */}
          <div className="relative z-10">
            <svg
              width="400"
              height="400"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-md"
            >
              {/* Person sitting */}
              <motion.g
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {/* Legs */}
                <path
                  d="M200 280 L180 320 L160 340"
                  stroke="#14b8a6"
                  strokeWidth="20"
                  strokeLinecap="round"
                />
                <path
                  d="M200 280 L220 320 L240 340"
                  stroke="#14b8a6"
                  strokeWidth="20"
                  strokeLinecap="round"
                />

                {/* Body */}
                <ellipse cx="200" cy="240" rx="40" ry="60" fill="#f5f5f5" />

                {/* Arms */}
                <path
                  d="M170 220 L140 260"
                  stroke="#f5f5f5"
                  strokeWidth="18"
                  strokeLinecap="round"
                />
                <path
                  d="M230 220 L260 240"
                  stroke="#f5f5f5"
                  strokeWidth="18"
                  strokeLinecap="round"
                />

                {/* Head */}
                <circle cx="200" cy="180" r="35" fill="#ffd1b3" />
                <path d="M185 170 Q200 175 215 170" stroke="#333" strokeWidth="2" fill="none" />

                {/* Hair */}
                <path
                  d="M165 165 Q200 140 235 165"
                  fill="#14b8a6"
                  stroke="#14b8a6"
                  strokeWidth="2"
                />

                {/* Laptop */}
                <rect
                  x="120"
                  y="260"
                  width="90"
                  height="60"
                  rx="4"
                  fill="#2d3748"
                  stroke="#14b8a6"
                  strokeWidth="2"
                />
                <rect x="130" y="270" width="70" height="40" rx="2" fill="#14b8a6" opacity="0.3" />
              </motion.g>
            </svg>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => scrollToSection('about')}
          className="p-4 glass-effect rounded-lg hover:bg-white/10 transition-colors duration-300"
        >
          <ChevronDown className="text-teal" size={24} />
        </motion.button>
      </motion.div>
    </section>
  )
}
