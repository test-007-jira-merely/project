'use client'

import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'saul-favorites'

function readStored(): number[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeStored(ids: number[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    // LocalStorage unavailable — no-op
  }
}

export function useFavorites() {
  const [ids, setIds] = useState<number[]>([])

  useEffect(() => {
    setIds(readStored())
  }, [])

  const toggleFavorite = useCallback((id: number) => {
    setIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
      writeStored(next)
      return next
    })
  }, [])

  const isFavorite = useCallback(
    (id: number) => ids.includes(id),
    [ids]
  )

  return { favoriteIds: ids, toggleFavorite, isFavorite }
}
