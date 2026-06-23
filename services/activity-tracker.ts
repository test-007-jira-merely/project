import type { ActivityEvent, ActivityType, TrackedSection } from '@/types/portfolio'

export const STORAGE_KEYS = {
  favorites: 'portfolio:favorites',
  activity: 'portfolio:activity',
  achievements: 'portfolio:achievements',
} as const

const sectionLabels: Record<TrackedSection, string> = {
  hero: 'Opened Hero Section',
  about: 'Opened About Section',
  works: 'Opened Works Section',
  favorites: 'Opened Favorites Section',
  journey: 'Opened Journey Section',
}

export const ActivityTracker = {
  createEvent(
    type: ActivityType,
    label: string,
    route: string,
    metadata: ActivityEvent['metadata'] = {},
  ): ActivityEvent {
    return {
      id:
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `${type}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      type,
      label,
      route,
      timestamp: new Date().toISOString(),
      metadata,
    }
  },

  routeLabel(pathname: string, projectTitle?: string) {
    if (pathname === '/') return 'Opened Homepage'
    if (pathname === '/favorites') return 'Opened Favorites Page'
    if (pathname === '/journey') return 'Opened Journey Page'
    return projectTitle ? `Opened ${projectTitle}` : 'Opened Portfolio Page'
  },

  sectionLabel(section: TrackedSection) {
    return sectionLabels[section]
  },

  projectLabel(title: string) {
    return `Viewed ${title}`
  },

  favoriteAddedLabel(title: string) {
    return `Added ${title} to Favorites`
  },

  favoriteRemovedLabel(title: string) {
    return `Removed ${title} from Favorites`
  },

  buildStats(
    events: ActivityEvent[],
    totalProjects: number,
    favoritesCount: number,
    unlockedCount: number,
  ) {
    const visitedSections = new Set(
      events
        .filter((event) => event.type === 'section_viewed')
        .flatMap((event) => (event.metadata?.section ? [event.metadata.section] : [])),
    )
    const viewedProjects = new Set(
      events
        .filter((event) => event.type === 'project_viewed')
        .flatMap((event) => (event.metadata?.projectSlug ? [event.metadata.projectSlug] : [])),
    )

    return {
      totalEvents: events.length,
      visitedSections: visitedSections.size,
      viewedProjects: viewedProjects.size,
      totalProjects,
      favoritesCount,
      unlockedCount,
    }
  },

  formatTime(timestamp: string) {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date(timestamp))
  },
}
