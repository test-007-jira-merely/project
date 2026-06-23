'use client'

import { useEffect } from 'react'
import { usePortfolioExperience } from '@/providers/PortfolioExperienceProvider'
import type { TrackedSection } from '@/types/portfolio'

export default function SectionTracker({
  targets,
}: {
  targets: { elementId: string; section: TrackedSection }[]
}) {
  const { isHydrated, trackSectionView } = usePortfolioExperience()

  useEffect(() => {
    if (!isHydrated || typeof window === 'undefined') {
      return
    }

    const visibleState = new Map<Element, boolean>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasVisible = visibleState.get(entry.target) ?? false

          if (entry.isIntersecting && !wasVisible) {
            const matched = targets.find((target) => target.elementId === entry.target.id)
            if (matched) {
              trackSectionView(matched.section)
            }
          }

          visibleState.set(entry.target, entry.isIntersecting)
        })
      },
      { threshold: 0.35 },
    )

    const nodes = targets
      .map((target) => document.getElementById(target.elementId))
      .filter((node): node is HTMLElement => Boolean(node))

    nodes.forEach((node) => observer.observe(node))

    return () => {
      observer.disconnect()
    }
  }, [isHydrated, targets, trackSectionView])

  return null
}
