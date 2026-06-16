'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import { useJourney } from './JourneyContext'
import { projects } from '@/lib/projects'

export type Achievement = {
  id: string
  title: string
  description: string
  icon: string
}

const ALL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_visit',
    title: 'First Visit',
    description: 'Welcome to the portfolio!',
    icon: '🎉',
  },
  {
    id: 'explorer',
    title: 'Explorer',
    description: 'Visited all major sections',
    icon: '🧭',
  },
  {
    id: 'collector',
    title: 'Collector',
    description: 'Saved 3 projects to Favorites',
    icon: '💎',
  },
  {
    id: 'designer_fan',
    title: 'Designer Fan',
    description: 'Viewed projects from every category',
    icon: '🎨',
  },
  {
    id: 'curious_mind',
    title: 'Curious Mind',
    description: 'Visited the Journey page',
    icon: '🔍',
  },
]

type AchievementContextType = {
  unlockedIds: string[]
  unlockedAchievements: Achievement[]
  latestUnlock: Achievement | null
  dismissNotification: () => void
  unlock: (id: string) => void
}

const AchievementContext = createContext<AchievementContextType>({
  unlockedIds: [],
  unlockedAchievements: [],
  latestUnlock: null,
  dismissNotification: () => {},
  unlock: () => {},
})

export function AchievementProvider({ children }: { children: ReactNode }) {
  const [unlockedIds, setUnlockedIds] = useState<string[]>([])
  const [latestUnlock, setLatestUnlock] = useState<Achievement | null>(null)
  const [mounted, setMounted] = useState(false)
  const { events, addEvent } = useJourney()

  useEffect(() => {
    try {
      const stored = localStorage.getItem('portfolio_achievements')
      if (stored) setUnlockedIds(JSON.parse(stored))
    } catch {
      // ignore
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(
        'portfolio_achievements',
        JSON.stringify(unlockedIds)
      )
    }
  }, [unlockedIds, mounted])

  const unlock = useCallback(
    (id: string) => {
      setUnlockedIds((prev) => {
        if (prev.includes(id)) return prev
        const updated = [...prev, id]
        const achievement = ALL_ACHIEVEMENTS.find((a) => a.id === id)
        if (achievement) {
          queueMicrotask(() => {
            setLatestUnlock(achievement)
            addEvent('achievement_unlocked', undefined, achievement.title)
          })
        }
        return updated
      })
    },
    [addEvent]
  )

  const dismissNotification = useCallback(() => setLatestUnlock(null), [])

  // First Visit: always unlock on mount
  useEffect(() => {
    if (mounted) unlock('first_visit')
  }, [mounted, unlock])

  // Explorer: check if all 3 section_visit events exist
  useEffect(() => {
    const visited = new Set(
      events.filter((e) => e.type === 'section_visit').map((e) => e.detail)
    )
    if (['hero', 'about', 'works'].every((s) => visited.has(s))) {
      unlock('explorer')
    }
  }, [events, unlock])

  // Collector: 3+ favorite_added events
  useEffect(() => {
    const favCount = events.filter((e) => e.type === 'favorite_added').length
    if (favCount >= 3) unlock('collector')
  }, [events, unlock])

  // Designer Fan: project_visit for each category
  useEffect(() => {
    const visitedIds = new Set(
      events.filter((e) => e.type === 'project_visit').map((e) => e.projectId)
    )
    const visitedCategories = new Set(
      projects.filter((p) => visitedIds.has(p.id)).map((p) => p.category)
    )
    if (['UI', 'UX', 'Web Design'].every((c) => visitedCategories.has(c))) {
      unlock('designer_fan')
    }
  }, [events, unlock])

  // Curious Mind: journey_visit event exists
  useEffect(() => {
    if (events.some((e) => e.type === 'journey_visit')) unlock('curious_mind')
  }, [events, unlock])

  const unlockedAchievements = ALL_ACHIEVEMENTS.filter((a) =>
    unlockedIds.includes(a.id)
  )

  if (!mounted) return <>{children}</>

  return (
    <AchievementContext.Provider
      value={{
        unlockedIds,
        unlockedAchievements,
        latestUnlock,
        dismissNotification,
        unlock,
      }}
    >
      {children}
    </AchievementContext.Provider>
  )
}

export const useAchievements = () => useContext(AchievementContext)
