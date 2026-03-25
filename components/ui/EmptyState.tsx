'use client';

import { motion } from 'framer-motion';
import { FileText, Folder } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: 'posts' | 'projects';
}

export function EmptyState({ title, description, icon = 'posts' }: EmptyStateProps) {
  const Icon = icon === 'posts' ? FileText : Folder;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
        <Icon className="w-8 h-8 text-white/40" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/60">{description}</p>
    </motion.div>
  );
}
