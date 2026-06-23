'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { usePathname } from 'next/navigation'
import type { AchievementDefinition } from '@/data/achievements'
import { getProjectBySlug, projects } from '@/data/projects'
import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { evaluateAchievementProgress } from '@/services/achievement-progress'
import { ActivityTracker, STORAGE_KEYS } from '@/services/activity-tracker'
import type {
  AchievementId,
  AchievementProgress,
  ActivityEvent,
  Project,
  TrackedSection,
} from '@/types/portfolio'

interface JourneyStats {
  totalEvents: number
  visitedSections: number
  viewedProjects: number
  totalProjects: number
  favoritesCount: number
  unlockedCount: number
}

interface ToastAchievement extends AchievementDefinition {
  progress: number
  isUnlocked: boolean
  unlockedAt?: string
}

interface PortfolioExperienceContextValue {
  isHydrated: boolean
  favoriteSlugs: string[]
  favoriteProjects: Project[]
  favoritesCount: number
  activityLog: ActivityEvent[]
  achievementProgress: AchievementProgress[]
  journeyStats: JourneyStats
  toastQueue: ToastAchievement[]
  addFavorite: (project: Project) => void
  removeFavorite: (project: Project) => void
  isFavorite: (slug: string) => boolean
  trackProjectView: (project: Project) => void
  trackSectionView: (section: TrackedSection) => void
  dismissToast: (achievementId: AchievementId) => void
}

const PortfolioExperienceContext = createContext<PortfolioExperienceContextValue | null>(null)

export function PortfolioExperienceProvider({ children }: { children: React.ReactNode }) {
  const [favoriteSlugs, setFavoriteSlugs, favoritesHydrated] = useLocalStorageState<string[]>(
    STORAGE_KEYS.favorites,
    [],
  )
  const [activityLog, setActivityLog, activityHydrated] = useLocalStorageState<ActivityEvent[]>(
    STORAGE_KEYS.activity,
    [],
  )
  const [unlockedAtMap, setUnlockedAtMap, achievementsHydrated] = useLocalStorageState<
    Partial<Record<AchievementId, string>>
  >(STORAGE_KEYS.achievements, {})
  const [toastQueue, setToastQueue] = useState<ToastAchievement[]>([])
  const pathname = usePathname()
  const lastTrackedPathRef = useRef<string | null>(null)

  const isHydrated = favoritesHydrated && activityHydrated && achievementsHydrated

  const favoriteProjects = useMemo(
    () =>
      favoriteSlugs
        .map((slug) => getProjectBySlug(slug))
        .filter((project): project is Project => Boolean(project)),
    [favoriteSlugs],
  )

  const appendEvent = useCallback(
    (event: ActivityEvent) => {
      setActivityLog((current) => [...current, event])
    },
    [setActivityLog],
  )

  useEffect(() => {
    if (!isHydrated || !pathname || lastTrackedPathRef.current === pathname) {
      return
    }

    const currentProject = pathname.startsWith('/projects/')
      ? projects.find((project) => pathname.endsWith(project.slug))
      : undefined

    lastTrackedPathRef.current = pathname
    appendEvent(
      ActivityTracker.createEvent(
        'route_opened',
        ActivityTracker.routeLabel(pathname, currentProject?.title),
        pathname,
      ),
    )
  }, [appendEvent, isHydrated, pathname])

  const achievementResult = useMemo(
    () =>
      evaluateAchievementProgress({
        events: activityLog,
        favoriteSlugs,
        unlockedAtMap,
        totalProjects: projects.length,
      }),
    [activityLog, favoriteSlugs, unlockedAtMap],
  )

  useEffect(() => {
    if (!isHydrated || achievementResult.newlyUnlocked.length === 0 || !pathname) {
      return
    }

    setUnlockedAtMap((current) => ({ ...current, ...achievementResult.newUnlockedAtMap }))
    setToastQueue((current) => [...current, ...achievementResult.newlyUnlocked])
    setActivityLog((current) => [
      ...current,
      ...achievementResult.newlyUnlocked.map((achievement) =>
        ActivityTracker.createEvent(
          'achievement_unlocked',
          `Achievement unlocked: ${achievement.name}`,
          pathname,
          { achievementId: achievement.id },
        ),
      ),
    ])
  }, [achievementResult, isHydrated, pathname, setActivityLog, setUnlockedAtMap])

  const addFavorite = useCallback(
    (project: Project) => {
      if (favoriteSlugs.includes(project.slug)) {
        return
      }

      setFavoriteSlugs((current) => [...current, project.slug])
      appendEvent(
        ActivityTracker.createEvent(
          'favorite_added',
          ActivityTracker.favoriteAddedLabel(project.title),
          pathname ?? '/',
          { projectSlug: project.slug },
        ),
      )
    },
    [appendEvent, favoriteSlugs, pathname, setFavoriteSlugs],
  )

  const removeFavorite = useCallback(
    (project: Project) => {
      if (!favoriteSlugs.includes(project.slug)) {
        return
      }

      setFavoriteSlugs((current) => current.filter((slug) => slug !== project.slug))
      appendEvent(
        ActivityTracker.createEvent(
          'favorite_removed',
          ActivityTracker.favoriteRemovedLabel(project.title),
          pathname ?? '/',
          { projectSlug: project.slug },
        ),
      )
    },
    [appendEvent, favoriteSlugs, pathname, setFavoriteSlugs],
  )

  const isFavorite = useCallback((slug: string) => favoriteSlugs.includes(slug), [favoriteSlugs])

  const trackProjectView = useCallback(
    (project: Project) => {
      appendEvent(
        ActivityTracker.createEvent(
          'project_viewed',
          ActivityTracker.projectLabel(project.title),
          `/projects/${project.slug}`,
          { projectSlug: project.slug },
        ),
      )
    },
    [appendEvent],
  )

  const trackSectionView = useCallback(
    (section: TrackedSection) => {
      appendEvent(
        ActivityTracker.createEvent(
          'section_viewed',
          ActivityTracker.sectionLabel(section),
          pathname ?? '/',
          { section },
        ),
      )
    },
    [appendEvent, pathname],
  )

  const dismissToast = useCallback((achievementId: AchievementId) => {
    setToastQueue((current) => current.filter((achievement) => achievement.id !== achievementId))
  }, [])

  const journeyStats = useMemo(
    () =>
      ActivityTracker.buildStats(
        activityLog,
        projects.length,
        favoriteProjects.length,
        achievementResult.achievementProgress.filter((achievement) => achievement.isUnlocked).length,
      ),
    [activityLog, achievementResult.achievementProgress, favoriteProjects.length],
  )

  const value = useMemo<PortfolioExperienceContextValue>(
    () => ({
      isHydrated,
      favoriteSlugs,
      favoriteProjects,
      favoritesCount: favoriteProjects.length,
      activityLog,
      achievementProgress: achievementResult.achievementProgress,
      journeyStats,
      toastQueue,
      addFavorite,
      removeFavorite,
      isFavorite,
      trackProjectView,
      trackSectionView,
      dismissToast,
    }),
    [
      achievementResult.achievementProgress,
      activityLog,
      addFavorite,
      dismissToast,
      favoriteProjects,
      favoriteSlugs,
      isFavorite,
      isHydrated,
      journeyStats,
      removeFavorite,
      toastQueue,
      trackProjectView,
      trackSectionView,
    ],
  )

  return <PortfolioExperienceContext.Provider value={value}>{children}</PortfolioExperienceContext.Provider>
}

export function usePortfolioExperience() {
  const context = useContext(PortfolioExperienceContext)

  if (!context) {
    throw new Error('usePortfolioExperience must be used within PortfolioExperienceProvider')
  }

  return context
}
