import { achievementDefinitions } from '@/data/achievements'
import type { AchievementId, AchievementProgress, ActivityEvent } from '@/types/portfolio'

export function evaluateAchievementProgress({
  events,
  favoriteSlugs,
  unlockedAtMap,
  totalProjects,
}: {
  events: ActivityEvent[]
  favoriteSlugs: string[]
  unlockedAtMap: Partial<Record<AchievementId, string>>
  totalProjects: number
}) {
  const viewedProjects = new Set(
    events
      .filter((event) => event.type === 'project_viewed')
      .flatMap((event) => (event.metadata?.projectSlug ? [event.metadata.projectSlug] : [])),
  )

  const visitedSections = new Set(
    events
      .filter((event) => event.type === 'section_viewed')
      .flatMap((event) => (event.metadata?.section ? [event.metadata.section] : [])),
  )

  const openedJourney = events.some(
    (event) => event.type === 'route_opened' && event.route === '/journey',
  )

  const progressById: Record<AchievementId, number> = {
    'first-visit': events.some((event) => event.type === 'route_opened') ? 1 : 0,
    explorer: visitedSections.size,
    collector: favoriteSlugs.length,
    'designer-fan': viewedProjects.size,
    'curious-mind': openedJourney ? 1 : 0,
  }

  const achievementProgress: AchievementProgress[] = achievementDefinitions.map((achievement) => {
    const progress = Math.min(progressById[achievement.id], achievement.target)
    const unlockedAt = unlockedAtMap[achievement.id]
    const isUnlocked = Boolean(unlockedAt) || progress >= achievement.target

    return {
      ...achievement,
      progress,
      isUnlocked,
      unlockedAt,
    }
  })

  const newlyUnlocked = achievementProgress.filter(
    (achievement) => achievement.isUnlocked && !unlockedAtMap[achievement.id],
  )

  const unlockedAt = new Date().toISOString()
  const newUnlockedAtMap = newlyUnlocked.reduce<Partial<Record<AchievementId, string>>>(
    (accumulator, achievement) => {
      accumulator[achievement.id] = unlockedAt
      return accumulator
    },
    {},
  )

  return {
    achievementProgress: achievementProgress.map((achievement) => ({
      ...achievement,
      unlockedAt: achievement.unlockedAt ?? newUnlockedAtMap[achievement.id],
    })),
    newlyUnlocked: newlyUnlocked.map((achievement) => ({
      ...achievement,
      unlockedAt,
    })),
    newUnlockedAtMap,
    totalProjects,
  }
}
