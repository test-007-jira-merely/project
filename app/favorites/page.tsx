'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, Heart, Trash2 } from 'lucide-react'
import { useFavorites } from '@/lib/useFavorites'

export default function FavoritesPage() {
  const { favoriteProjects, favoriteCount, isHydrated, removeFavorite } = useFavorites()
  const displayedCount = isHydrated ? favoriteCount : 0

  return (
    <main className="min-h-screen pt-32 section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 space-y-5"
        >
          <h1 className="text-4xl md:text-5xl font-bold">
            Saved <span className="text-gradient">favorites</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Revisit the portfolio projects you saved from the Works section.
          </p>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-effect text-white/80">
            <Heart size={18} className={`text-teal ${displayedCount > 0 ? 'fill-teal' : ''}`} />
            <span>
              {displayedCount} saved {displayedCount === 1 ? 'project' : 'projects'}
            </span>
          </div>
        </motion.div>

        {!isHydrated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white/50 py-16"
          >
            Loading saved projects...
          </motion.div>
        )}

        {isHydrated && favoriteProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-effect rounded-3xl p-10 md:p-14 text-center max-w-2xl mx-auto"
          >
            <div className="w-16 h-16 rounded-full bg-teal/20 border border-teal/30 flex items-center justify-center mx-auto mb-6">
              <Heart size={30} className="text-teal" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">No favorites yet</h2>
            <p className="text-white/60 mb-8">
              Tap the heart on any project card to save it here for later.
            </p>
            <Link
              href="/#works"
              className="inline-flex items-center justify-center px-6 py-3 bg-teal text-white rounded-full font-medium hover:bg-teal-light transition-colors duration-300 shadow-lg hover:glow-effect"
            >
              Explore works
            </Link>
          </motion.div>
        )}

        {isHydrated && favoriteProjects.length > 0 && (
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
                  <div className={`h-48 ${project.accentColor} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50" />

                    <motion.button
                      type="button"
                      aria-label={`Remove ${project.title} from favorites`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => removeFavorite(project.id)}
                      className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full glass-effect flex items-center justify-center text-white/80 hover:text-teal hover:border-teal transition-all duration-300"
                    >
                      <Trash2 size={20} />
                    </motion.button>

                    <div className="absolute inset-0 z-10 pointer-events-none bg-teal/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <ExternalLink size={32} className="text-white" />
                    </div>

                    <div className="absolute top-4 left-4">
                      <div className="w-16 h-16 border-2 border-white/20 rounded-lg" />
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <div className="w-12 h-12 bg-white/10 rounded-full backdrop-blur-sm" />
                    </div>
                  </div>

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
    </main>
  )
}
