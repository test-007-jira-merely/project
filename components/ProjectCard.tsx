'use client'

import { motion } from 'framer-motion'
import FavoriteButton from '@/components/FavoriteButton'
import { colorMap, type Project } from '@/lib/projects'

type ProjectCardProps = {
  project: Project
  index: number
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
  showHoverOverlay?: boolean
}

export default function ProjectCard({
  project,
  index,
  isFavorite,
  onToggleFavorite,
  showHoverOverlay = false,
}: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group"
    >
      <div className="glass-effect rounded-2xl overflow-hidden hover:border-teal transition-all duration-300 hover:glow-effect">
        {/* Project Image Placeholder */}
        <div
          className={`h-48 ${colorMap[project.image]} relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50" />

          {/* Favorite Button */}
          <FavoriteButton
            projectId={project.id}
            isFavorite={isFavorite}
            onToggle={onToggleFavorite}
          />

          {/* Hover Overlay (Works page only) */}
          {showHoverOverlay && (
            <div className="absolute inset-0 bg-teal/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                className="text-white"
              >
                {/* ExternalLink imported lazily to avoid unused import when overlay is hidden */}
              </motion.div>
            </div>
          )}

          {/* Decorative elements */}
          <div className="absolute top-4 left-4">
            <div className="w-16 h-16 border-2 border-white/20 rounded-lg" />
          </div>
          <div className="absolute bottom-4 right-4">
            <div className="w-12 h-12 bg-white/10 rounded-full backdrop-blur-sm" />
          </div>
        </div>

        {/* Project Info */}
        <div className="p-6 space-y-3">
          <h3 className="text-xl font-semibold text-white group-hover:text-teal transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-white/60 text-sm">{project.description}</p>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-teal/20 text-teal text-xs rounded-full border border-teal/30">
              {project.category}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
