'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import FavoriteButton from '@/components/FavoriteButton'
import { projectToneClasses } from '@/data/projects'
import { usePortfolioExperience } from '@/providers/PortfolioExperienceProvider'
import type { Project } from '@/types/portfolio'

export default function ProjectCard({
  project,
  index = 0,
  isInView = true,
  favoriteMode = 'toggle',
}: {
  project: Project
  index?: number
  isInView?: boolean
  favoriteMode?: 'toggle' | 'remove'
}) {
  const { trackProjectView } = usePortfolioExperience()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -10 }}
      className="group"
    >
      <div className="glass-effect rounded-2xl overflow-hidden hover:border-teal transition-all duration-300 hover:glow-effect">
        <Link
          href={`/projects/${project.slug}`}
          onClick={() => trackProjectView(project)}
          className="block"
        >
          <div className={`h-48 ${projectToneClasses[project.imageTone]} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50" />

            <div className="absolute inset-0 bg-teal/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <motion.div initial={{ scale: 0 }} whileHover={{ scale: 1 }} className="text-white">
                <ExternalLink size={32} />
              </motion.div>
            </div>

            <div className="absolute top-4 left-4">
              <div className="w-16 h-16 border-2 border-white/20 rounded-lg" />
            </div>
            <div className="absolute bottom-4 right-4">
              <div className="w-12 h-12 bg-white/10 rounded-full backdrop-blur-sm" />
            </div>
          </div>

          <div className="p-6 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold text-white group-hover:text-teal transition-colors duration-300">
                {project.title}
              </h3>
              <ArrowRight size={18} className="text-white/40 group-hover:text-teal transition-colors" />
            </div>

            <p className="text-white/60 text-sm">{project.description}</p>
            <p className="text-white/50 text-sm leading-relaxed">{project.summary}</p>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-teal/20 text-teal text-xs rounded-full border border-teal/30">
                {project.category}
              </span>
              {project.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>

        <div className="border-t border-white/10 p-6 pt-4">
          <FavoriteButton project={project} mode={favoriteMode} />
        </div>
      </div>
    </motion.div>
  )
}
