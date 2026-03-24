'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className={`bg-white/10 rounded ${className}`}
    />
  );
}

// Blog card skeleton
export function BlogCardSkeleton() {
  return (
    <div className="glass-effect rounded-2xl overflow-hidden">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
}

// Project card skeleton
export function ProjectCardSkeleton() {
  return (
    <div className="glass-effect rounded-2xl overflow-hidden">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  );
}
