'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart } from 'lucide-react'
import { getProjectBySlug } from '@/lib/projects'
import { useFavorites } from '@/context/FavoritesContext'
import { useJourney } from '@/context/JourneyContext'

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params.id as string
  const project = getProjectBySlug(slug)
  const { toggleFavorite, isFavorite } = useFavorites()
  const { addEvent } = useJourney()

  useEffect(() => {
    if (project) {
      addEvent('project_visit', project.id, project.title)
    }
  }, [project?.id]) // eslint-disable-line react-hooks/exhaustive-deps

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

  if (!project) {
    return (
      <div className="min-h-screen pt-32 pb-16 section-padding">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-effect rounded-2xl p-16"
          >
            <h1 className="text-4xl font-bold mb-4 text-white">
              Project Not Found
            </h1>
            <p className="text-white/60 mb-8">
              The project you're looking for doesn't exist
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-teal text-white rounded-full font-medium hover:bg-teal-light transition-colors duration-300 shadow-lg"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-16 section-padding">
      <div className="container-custom max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-teal transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-2xl overflow-hidden"
        >
          <div
            className={`h-96 ${colorMap[project.image]} relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50" />

            <button
              onClick={(e) => {
                e.preventDefault()
                const currentlyFavorited = isFavorite(project.id)
                toggleFavorite(project.id)
                addEvent(
                  currentlyFavorited
                    ? 'favorite_removed'
                    : 'favorite_added',
                  project.id,
                  project.title
                )
              }}
              className="absolute top-6 right-6 z-20 p-3 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
            >
              <Heart
                size={28}
                className={
                  isFavorite(project.id)
                    ? 'fill-red-500 text-red-500'
                    : 'text-white'
                }
              />
            </button>

            <div className="absolute top-6 left-6">
              <div className="w-24 h-24 border-2 border-white/20 rounded-lg" />
            </div>
            <div className="absolute bottom-6 right-6">
              <div className="w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm" />
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-teal/20 text-teal text-sm rounded-full border border-teal/30 mb-4">
                {project.category}
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                {project.title}
              </h1>
              <p className="text-white/80 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">
                About This Project
              </h2>
              <p className="text-white/70 leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">
                Technology Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-navy-light text-white/90 rounded-full border border-white/20 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
