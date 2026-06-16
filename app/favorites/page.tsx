'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, ExternalLink } from 'lucide-react'
import { useFavorites } from '@/context/FavoritesContext'
import { useJourney } from '@/context/JourneyContext'

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites()
  const { addEvent } = useJourney()

  useEffect(() => {
    addEvent('favorites_visit')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const colorMap: Record<string, string> = {
    purple: 'bg-purple-600',
    gray: 'bg-gray-600',
    teal: 'bg-teal-600',
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    orange: 'bg-orange-600',
    pink: 'bg-pink-600',
    indigo: 'bg-indigo-600',
    red: 'bg-red-600',
  }

  return (
    <div className="min-h-screen pt-32 pb-16 section-padding">
      <div className="container-custom">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-teal transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <div className="mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            Your <span className="text-gradient">Favorites</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg"
          >
            Projects you've saved ({favorites.length})
          </motion.p>
        </div>

        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-effect rounded-2xl p-16 text-center"
          >
            <Heart size={64} className="mx-auto mb-6 text-white/20" />
            <h2 className="text-2xl font-bold mb-4 text-white/80">
              No favorites yet
            </h2>
            <p className="text-white/60 mb-8">
              Start exploring projects and save your favorites by clicking the
              heart icon
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-teal text-white rounded-full font-medium hover:bg-teal-light transition-colors duration-300 shadow-lg"
            >
              Browse Projects
            </Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Link href={`/projects/${project.slug}`}>
                  <div className="glass-effect rounded-2xl overflow-hidden hover:border-teal transition-all duration-300 hover:glow-effect cursor-pointer">
                    <div
                      className={`h-48 ${colorMap[project.image]} relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50" />

                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          toggleFavorite(project.id)
                          addEvent(
                            'favorite_removed',
                            project.id,
                            project.title
                          )
                        }}
                        className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
                      >
                        <Heart
                          size={20}
                          className="fill-red-500 text-red-500"
                        />
                      </button>

                      <div className="absolute inset-0 bg-teal/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
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
                      <p className="text-white/60 text-sm">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-teal/20 text-teal text-xs rounded-full border border-teal/30">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
