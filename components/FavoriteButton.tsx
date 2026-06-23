'use client'

import { Heart, HeartOff } from 'lucide-react'
import { usePortfolioExperience } from '@/providers/PortfolioExperienceProvider'
import type { Project } from '@/types/portfolio'

export default function FavoriteButton({
  project,
  mode = 'toggle',
}: {
  project: Project
  mode?: 'toggle' | 'remove'
}) {
  const { addFavorite, removeFavorite, isFavorite, isHydrated } = usePortfolioExperience()
  const saved = isFavorite(project.slug)
  const shouldRemove = mode === 'remove' || saved

  return (
    <button
      type="button"
      onClick={() => (shouldRemove ? removeFavorite(project) : addFavorite(project))}
      className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm font-medium text-white/80 transition-all duration-300 hover:border-teal hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      aria-pressed={saved}
      disabled={!isHydrated}
    >
      {shouldRemove ? <HeartOff size={16} /> : <Heart size={16} />}
      {!isHydrated
        ? 'Loading Favorites...'
        : mode === 'remove'
          ? 'Remove from Favorites'
          : saved
            ? 'Saved to Favorites'
            : 'Save to Favorites'}
    </button>
  )
}
