'use client'

import { motion } from 'framer-motion'
import {
  Compass,
  FolderOpenDot,
  Heart,
  HeartOff,
  MapPinned,
  Trophy,
} from 'lucide-react'
import { ActivityTracker } from '@/services/activity-tracker'
import type { ActivityEvent } from '@/types/portfolio'

const iconMap = {
  route_opened: Compass,
  section_viewed: MapPinned,
  project_viewed: FolderOpenDot,
  favorite_added: Heart,
  favorite_removed: HeartOff,
  achievement_unlocked: Trophy,
}

export default function JourneyTimeline({ events }: { events: ActivityEvent[] }) {
  return (
    <div className="space-y-4">
      {events.map((event, index) => {
        const Icon = iconMap[event.type]

        return (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: index * 0.03 }}
            className="relative flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <div className="relative flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/20 text-teal">
                <Icon size={18} />
              </div>
              {index !== events.length - 1 && <div className="mt-2 h-full w-px bg-white/10" />}
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.2em] text-teal/80">
                {ActivityTracker.formatTime(event.timestamp)}
              </p>
              <p className="text-base font-medium text-white">{event.label}</p>
              <p className="text-sm text-white/50">{event.route}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
