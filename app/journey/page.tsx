'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Globe,
  Eye,
  Heart,
  Trophy,
  FolderOpen,
  Map,
  Star,
} from 'lucide-react'
import { useJourney, type JourneyEvent } from '@/context/JourneyContext'

export default function JourneyPage() {
  const { events, addEvent } = useJourney()

  useEffect(() => {
    addEvent('journey_visit')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const getEventIcon = (type: JourneyEvent['type']) => {
    const icons = {
      homepage_visit: Globe,
      section_visit: Eye,
      project_visit: FolderOpen,
      favorites_visit: Heart,
      journey_visit: Map,
      favorite_added: Star,
      favorite_removed: Heart,
      achievement_unlocked: Trophy,
    }
    return icons[type] || Eye
  }

  const getEventLabel = (event: JourneyEvent) => {
    const labels = {
      homepage_visit: 'Visited Homepage',
      section_visit: `Viewed ${event.detail || 'Section'}`,
      project_visit: `Viewed Project${event.detail ? ': ' + event.detail : ''}`,
      favorites_visit: 'Visited Favorites Page',
      journey_visit: 'Visited Journey Page',
      favorite_added: `Added "${event.detail || 'Project'}" to Favorites`,
      favorite_removed: `Removed "${event.detail || 'Project'}" from Favorites`,
      achievement_unlocked: `Unlocked: ${event.detail || 'Achievement'}`,
    }
    return labels[event.type] || event.type
  }

  const getEventColor = (type: JourneyEvent['type']) => {
    const colors = {
      homepage_visit: 'bg-blue-500',
      section_visit: 'bg-purple-500',
      project_visit: 'bg-green-500',
      favorites_visit: 'bg-red-500',
      journey_visit: 'bg-orange-500',
      favorite_added: 'bg-pink-500',
      favorite_removed: 'bg-gray-500',
      achievement_unlocked: 'bg-yellow-500',
    }
    return colors[type] || 'bg-teal'
  }

  const reversedEvents = [...events].reverse()

  return (
    <div className="min-h-screen pt-32 pb-16 section-padding">
      <div className="container-custom">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-teal transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <div className="mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            Your <span className="text-gradient">Journey</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg"
          >
            {events.length} {events.length === 1 ? 'milestone' : 'milestones'}{' '}
            on your exploration
          </motion.p>
        </div>

        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-effect rounded-2xl p-16 text-center"
          >
            <Map size={64} className="mx-auto mb-6 text-white/20" />
            <h2 className="text-2xl font-bold mb-4 text-white/80">
              Your journey begins
            </h2>
            <p className="text-white/60 mb-8">
              Explore the portfolio and your activity will be tracked here
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-teal text-white rounded-full font-medium hover:bg-teal-light transition-colors duration-300 shadow-lg"
            >
              Start Exploring
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {reversedEvents.map((event, index) => {
              const Icon = getEventIcon(event.type)
              const color = getEventColor(event.type)

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-effect rounded-xl p-6 hover:border-teal transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-full ${color} flex items-center justify-center`}
                    >
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {getEventLabel(event)}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {new Date(event.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
