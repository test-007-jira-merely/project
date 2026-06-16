'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import { projects, type Project } from '@/lib/projects'

type FavoritesContextType = {
  favoriteIds: number[]
  favorites: Project[]
  toggleFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
}

const FavoritesContext = createContext<FavoritesContextType>({
  favoriteIds: [],
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
})

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('portfolio_favorites')
      if (stored) setFavoriteIds(JSON.parse(stored))
    } catch {
      // ignore
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('portfolio_favorites', JSON.stringify(favoriteIds))
    }
  }, [favoriteIds, mounted])

  const toggleFavorite = useCallback((id: number) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    )
  }, [])

  const isFavorite = useCallback(
    (id: number) => favoriteIds.includes(id),
    [favoriteIds]
  )

  const favorites = projects.filter((p) => favoriteIds.includes(p.id))

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)
