'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'
import { Project } from '@/lib/types/database'

interface WorksProps {
  initialProjects: Project[]
}

export default function Works({ initialProjects }: WorksProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [activeFilter, setActiveFilter] = useState<string>('All')

  useEffect(() => {
    setProjects(initialProjects)
  }, [initialProjects])

  const allTags = Array.from(
    new Set(projects.flatMap((p) => p.tags || []))
  ).sort()

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) => project.tags?.includes(activeFilter))

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
        {allTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center gap-4 mb-12 flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter('All')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === 'All'
                  ? 'bg-teal text-white shadow-lg glow-effect'
                  : 'glass-effect text-white/70 hover:text-white hover:border-teal'
              }`}
            >
              All
            </motion.button>
            {allTags.map((tag) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(tag)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === tag
                    ? 'bg-teal text-white shadow-lg glow-effect'
                    : 'glass-effect text-white/70 hover:text-white hover:border-teal'
                }`}
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
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
                href={project.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block glass-effect rounded-2xl overflow-hidden hover:border-teal transition-all duration-300 hover:glow-effect cursor-pointer"
              >
                {/* Project Image */}
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50" />

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

                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-teal/20 text-teal text-xs rounded-full border border-teal/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Show message if no projects */}
        {filteredProjects.length === 0 && (
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
