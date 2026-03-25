'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'
import { getProjects } from '@/lib/services/projects'
import type { Project } from '@/lib/types'

const filters = ['All', 'UI', 'UX', 'Web Design', 'Mobile App', 'Branding'] as const
type Filter = (typeof filters)[number]

export default function Works() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeFilter, setActiveFilter] = useState<Filter>('All')
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProjects() {
      const data = await getProjects()
      setProjects(data)
      setLoading(false)
    }
    loadProjects()
  }, [])

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) => project.category === activeFilter)

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

  // Fallback color based on index if no specific color
  const getProjectColor = (index: number) => {
    const colors = ['purple', 'teal', 'blue', 'green', 'orange', 'pink', 'indigo']
    return colors[index % colors.length]
  }

  return (
    <section id="works" ref={ref} className="min-h-screen section-padding">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My recent <span className="text-gradient">works</span>
          </h2>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12 flex-wrap"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-teal text-white shadow-lg glow-effect'
                  : 'glass-effect text-white/70 hover:text-white hover:border-teal'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass-effect rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-white/10" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-white/10 rounded w-3/4" />
                  <div className="h-4 bg-white/10 rounded w-full" />
                  <div className="h-8 bg-white/10 rounded w-20" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {!loading && (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const imageColor = getProjectColor(index)

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <a
                    href={project.project_url || '#'}
                    target={project.project_url ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="glass-effect rounded-2xl overflow-hidden hover:border-teal transition-all duration-300 hover:glow-effect cursor-pointer">
                      {/* Project Image */}
                      <div className="h-48 relative overflow-hidden">
                        {project.image_url ? (
                          <img
                            src={project.image_url}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        ) : (
                          <div className={`w-full h-full ${colorMap[imageColor]}`}>
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50" />
                          </div>
                        )}

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-teal/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            className="text-white"
                          >
                            <ExternalLink size={32} />
                          </motion.div>
                        </div>

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
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold text-white group-hover:text-teal transition-colors duration-300">
                            {project.title}
                          </h3>
                        </div>

                        <p className="text-white/60 text-sm">{project.description}</p>

                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-teal/20 text-teal text-xs rounded-full border border-teal/30">
                            {project.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white/50 py-12"
          >
            No projects found in this category.
          </motion.div>
        )}
      </div>
    </section>
  )
}
