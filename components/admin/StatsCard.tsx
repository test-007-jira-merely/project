'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: number
  icon: LucideIcon
  color: 'teal' | 'green' | 'orange' | 'blue'
}

const colorMap = {
  teal: 'text-teal bg-teal/20',
  green: 'text-green-500 bg-green-500/20',
  orange: 'text-orange-500 bg-orange-500/20',
  blue: 'text-blue-500 bg-blue-500/20',
}

export default function StatsCard({ title, value, icon: Icon, color }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="glass-effect rounded-2xl p-6 hover:border-teal transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorMap[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <h3 className="text-3xl font-bold mb-1">{value}</h3>
      <p className="text-white/60 text-sm">{title}</p>
    </motion.div>
  )
}
