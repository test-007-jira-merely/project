import { motion } from 'framer-motion'
import { ANIMATIONS } from '@/lib/constants'
import type { ReactNode } from 'react'

interface MotionButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export default function MotionButton({ children, className, onClick }: MotionButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: ANIMATIONS.HOVER_SCALE }}
      whileTap={{ scale: ANIMATIONS.TAP_SCALE }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}
