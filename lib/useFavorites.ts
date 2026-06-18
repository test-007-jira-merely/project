'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { projects } from '@/lib/projects'

const FAVORITES_STORAGE_KEY = 'sauldesign:favorites'
const validProjectIds = new Set(projects.map((project) => project.id))

function normalizeFavoriteIds(value: unknown): number[] {
  if (!Array.isArray(value)) return []

  return Array.from(
    new Set(
      value.filter(
        (id): id is number =>
          typeof id === 'number' && Number.isInteger(id) && validProjectIds.has(id),
      ),
    ),
  )
}

function readStoredFavoriteIds(): number[] {
  if (typeof window === 'undefined') return []

  try {
    const rawValue = window.localStorage.getItem(FAVORITES_STORAGE_KEY)
    return rawValue ? normalizeFavoriteIds(JSON.parse(rawValue)) : []
  } catch {
    return []
  }
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setFavoriteIds(readStoredFavoriteIds())
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated || typeof window === 'undefined') return
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds))
  }, [favoriteIds, isHydrated])

  const isFavorite = useCallback(
    (projectId: number) => favoriteIds.includes(projectId),
    [favoriteIds],
  )

  const toggleFavorite = useCallback((projectId: number) => {
    if (!validProjectIds.has(projectId)) return

    setFavoriteIds((currentIds) =>
      currentIds.includes(projectId)
        ? currentIds.filter((id) => id !== projectId)
        : [...currentIds, projectId],
    )
  }, [])

  const removeFavorite = useCallback((projectId: number) => {
    setFavoriteIds((currentIds) => currentIds.filter((id) => id !== projectId))
  }, [])

  const favoriteProjects = useMemo(() => {
    const favoriteSet = new Set(favoriteIds)
    return projects.filter((project) => favoriteSet.has(project.id))
  }, [favoriteIds])

  return {
    favoriteIds,
    favoriteProjects,
    favoriteCount: favoriteIds.length,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    isHydrated,
  }
}
