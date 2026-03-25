'use client';

import { motion } from 'framer-motion';
import { FileX } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title, message, icon }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <div className="flex justify-center mb-4">
        {icon || <FileX size={48} className="text-white/30" />}
      </div>
      <h3 className="text-xl font-semibold text-white/80 mb-2">{title}</h3>
      <p className="text-white/50">{message}</p>
    </motion.div>
  );
}
