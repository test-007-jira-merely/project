'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ProjectCard from '@/components/ProjectCard'
import SectionTracker from '@/components/SectionTracker'
import { usePortfolioExperience } from '@/providers/PortfolioExperienceProvider'

const trackerTargets = [{ elementId: 'favorites-page', section: 'favorites' as const }]

export default function FavoritesPage() {
  const { favoriteProjects, favoritesCount, isHydrated } = usePortfolioExperience()
  const savedProjects = [...favoriteProjects].reverse()

  return (
    <main id="favorites-page" className="min-h-screen section-padding pt-36">
      <SectionTracker targets={trackerTargets} />

      <div className="container-custom space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 text-center"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-teal">Favorites Collection</p>
          <h1 className="text-4xl md:text-5xl font-bold">Your saved projects</h1>
          <p className="mx-auto max-w-2xl text-white/65">
            Save standout work from the portfolio and come back to it whenever inspiration strikes.
          </p>
          <div className="inline-flex rounded-full border border-teal/30 bg-teal/10 px-5 py-2 text-sm font-medium text-teal">
            {favoritesCount} saved project{favoritesCount === 1 ? '' : 's'}
          </div>
        </motion.div>

        {!isHydrated ? (
          <div className="glass-effect rounded-3xl p-12 text-center text-white/60">
            Loading your saved collection…
          </div>
        ) : savedProjects.length === 0 ? (
          <div className="glass-effect rounded-3xl space-y-5 p-12 text-center">
            <h2 className="text-2xl font-semibold text-white">No favorites yet</h2>
            <p className="mx-auto max-w-xl text-white/60">
              Save projects from the Works section to build your own shortlist and revisit the designs you like most.
            </p>
            <Link
              href="/#works"
              className="inline-flex rounded-full bg-teal px-6 py-3 font-medium text-white transition-colors hover:bg-teal-light"
            >
              Browse Projects
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {savedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} favoriteMode="remove" />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
