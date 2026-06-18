'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

type FavoriteButtonProps = {
  projectId: number
  isFavorite: boolean
  onToggle: (id: number) => void
}

export default function FavoriteButton({
  projectId,
  isFavorite,
  onToggle,
}: FavoriteButtonProps) {
  return (
    <motion.button
      onClick={(e) => {
        e.stopPropagation()
        onToggle(projectId)
      }}
      whileTap={{ scale: 0.85 }}
      className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full glass-effect
        flex items-center justify-center transition-colors duration-300
        hover:border-teal"
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        size={18}
        className={`transition-all duration-300 ${
          isFavorite
            ? 'fill-red-500 text-red-500'
            : 'fill-none text-white/70'
        }`}
      />
    </motion.button>
  )
}
