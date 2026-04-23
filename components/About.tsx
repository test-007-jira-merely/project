'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code, Palette, Lightbulb, Cpu, Mail, Coffee, Laptop, Smartphone } from 'lucide-react'
import MotionButton from './MotionButton'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const floatingIcons = [
    { Icon: Code, x: '10%', y: '15%', delay: 0 },
    { Icon: Palette, x: '85%', y: '20%', delay: 0.5 },
    { Icon: Lightbulb, x: '15%', y: '75%', delay: 1 },
    { Icon: Cpu, x: '80%', y: '65%', delay: 1.5 },
    { Icon: Mail, x: '50%', y: '10%', delay: 0.7 },
    { Icon: Coffee, x: '90%', y: '85%', delay: 1.2 },
    { Icon: Laptop, x: '60%', y: '80%', delay: 0.9 },
    { Icon: Smartphone, x: '20%', y: '45%', delay: 1.8 },
  ]

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen flex items-center justify-center section-padding bg-navy-dark/50"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 items-center relative"
        >
          {/* Floating Background Icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {floatingIcons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isInView
                    ? {
                        opacity: 0.15,
                        scale: 1,
                        y: [0, -20, 0],
                      }
                    : { opacity: 0, scale: 0 }
                }
                transition={{
                  opacity: { delay: item.delay, duration: 0.5 },
                  scale: { delay: item.delay, duration: 0.5 },
                  y: {
                    delay: item.delay + 0.5,
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
                className="absolute text-teal"
                style={{ left: item.x, top: item.y }}
              >
                <item.Icon size={32} />
              </motion.div>
            ))}
          </div>

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 relative z-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              About <span className="text-gradient">me</span>
            </h2>

            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et
                velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora
                torquent per conubia nostra, per inceptos himenaeos.
              </p>

              <p>
                Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur tortor,
                ac ultrices tellus convallis vitae. Pellentesque habitant morbi tristique senectus
                et netus et malesuada fames ac turpis egestas.
              </p>
            </div>

            <MotionButton className="text-teal font-semibold hover:text-teal-light transition-colors duration-300 flex items-center gap-2">
              Read more
              <span className="text-2xl">→</span>
            </MotionButton>

            {/* Decorative code text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.2 } : { opacity: 0 }}
              transition={{ delay: 0.8 }}
              className="text-teal text-4xl font-mono mt-8"
            >
              {'<code/>'}
            </motion.div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative flex items-center justify-center z-10"
          >
            <svg
              width="400"
              height="400"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-md"
            >
              {/* Desk */}
              <rect x="100" y="280" width="200" height="10" rx="5" fill="#14b8a6" />
              <rect x="110" y="290" width="8" height="80" fill="#14b8a6" />
              <rect x="280" y="290" width="8" height="80" fill="#14b8a6" />

              {/* Chair */}
              <rect x="140" y="300" width="60" height="70" rx="10" fill="#0d9488" />
              <rect x="135" y="240" width="70" height="80" rx="15" fill="#14b8a6" />

              {/* Person at desk */}
              <motion.g
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Body */}
                <ellipse cx="230" cy="230" rx="35" ry="55" fill="#f5f5f5" />

                {/* Head */}
                <circle cx="230" cy="170" r="32" fill="#ffd1b3" />

                {/* Hair */}
                <path d="M200 155 Q230 135 260 155" fill="#14b8a6" />

                {/* Arm reaching to laptop */}
                <path
                  d="M195 210 L160 240"
                  stroke="#f5f5f5"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
              </motion.g>

              {/* Laptop on desk */}
              <rect x="140" y="250" width="80" height="50" rx="3" fill="#2d3748" />
              <rect x="145" y="255" width="70" height="40" rx="2" fill="#14b8a6" opacity="0.4" />

              {/* Monitor/Screen glow effect */}
              <circle cx="180" cy="270" r="40" fill="#14b8a6" opacity="0.1" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
