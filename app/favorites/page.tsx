'use client'

import { motion } from 'framer-motion'
import { Heart, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { projects, colorMap } from '@/lib/projects'
import { useFavorites } from '@/hooks/useFavorites'
import FavoriteButton from '@/components/FavoriteButton'

export default function FavoritesPage() {
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites()

  const favoriteProjects = projects.filter((p) =>
    favoriteIds.includes(p.id)
  )

  return (
    <section className="min-h-screen section-padding pt-32">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient">Favorites</span>
          </h2>
          <div className="flex items-center justify-center gap-2 text-white/60">
            <Heart size={16} className={favoriteProjects.length > 0 ? 'fill-red-500 text-red-500' : ''} />
            <span>
              {favoriteProjects.length} saved project{favoriteProjects.length !== 1 ? 's' : ''}
            </span>
          </div>
        </motion.div>

        {/* Empty State */}
        {favoriteProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-20"
          >
            <Heart size={64} className="mx-auto mb-6 text-white/20" />
            <p className="text-white/50 text-lg mb-8">
              No favorites yet. Browse the works and save your favorites!
            </p>
            <Link
              href="/#works"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal text-white font-medium
                hover:bg-teal-dark transition-colors duration-300 glow-effect"
            >
              <ArrowLeft size={18} />
              Browse Works
            </Link>
          </motion.div>
        )}

        {/* Favorites Grid */}
        {favoriteProjects.length > 0 && (
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {favoriteProjects.map((project, index) => (
              <motion.div
                key={project.id}
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
                      isFavorite={isFavorite(project.id)}
                      onToggle={toggleFavorite}
                    />

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
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
