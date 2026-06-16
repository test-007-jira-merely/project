'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from 'react'

export type JourneyEvent = {
  id: string
  type:
    | 'homepage_visit'
    | 'section_visit'
    | 'favorites_visit'
    | 'journey_visit'
    | 'project_visit'
    | 'favorite_added'
    | 'favorite_removed'
    | 'achievement_unlocked'
  projectId?: number
  detail?: string
  timestamp: string
}

type JourneyContextType = {
  events: JourneyEvent[]
  addEvent: (
    type: JourneyEvent['type'],
    projectId?: number,
    detail?: string
  ) => void
  clearEvents: () => void
}

const JourneyContext = createContext<JourneyContextType>({
  events: [],
  addEvent: () => {},
  clearEvents: () => {},
})

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<JourneyEvent[]>([])
  const [mounted, setMounted] = useState(false)
  const eventCounterRef = useRef(0)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('portfolio_journey')
      if (stored) setEvents(JSON.parse(stored))
    } catch {
      // ignore
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('portfolio_journey', JSON.stringify(events))
    }
  }, [events, mounted])

  const addEvent = useCallback(
    (
      type: JourneyEvent['type'],
      projectId?: number,
      detail?: string
    ) => {
      const event: JourneyEvent = {
        id: `${Date.now()}-${eventCounterRef.current++}-${Math.random()
          .toString(36)
          .slice(2, 9)}`,
        type,
        projectId,
        detail,
        timestamp: new Date().toISOString(),
      }
      setEvents((prev) => [...prev, event])
    },
    []
  )

  const clearEvents = useCallback(() => setEvents([]), [])

  if (!mounted) return <>{children}</>

  return (
    <JourneyContext.Provider value={{ events, addEvent, clearEvents }}>
      {children}
    </JourneyContext.Provider>
  )
}

export const useJourney = () => useContext(JourneyContext)
