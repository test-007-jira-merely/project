'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className={`bg-white/10 rounded ${className}`}
    />
  );
}

export function PostCardSkeleton() {
  return (
    <div className="glass-effect rounded-2xl overflow-hidden">
      <Skeleton className="h-48 rounded-none" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="glass-effect rounded-2xl overflow-hidden">
      <Skeleton className="h-48 rounded-none" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}
