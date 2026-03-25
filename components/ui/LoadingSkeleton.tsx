'use client';

import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'card' | 'image';
}

export function LoadingSkeleton({ className = '', variant = 'text' }: LoadingSkeletonProps) {
  const baseClasses = 'bg-white/10 rounded animate-pulse';

  const variantClasses = {
    text: 'h-4 w-full',
    card: 'h-64 w-full rounded-2xl',
    image: 'h-48 w-full rounded-t-2xl',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
  );
}

export function PostCardSkeleton() {
  return (
    <div className="glass-effect rounded-2xl overflow-hidden">
      <LoadingSkeleton variant="image" />
      <div className="p-6 space-y-3">
        <LoadingSkeleton className="h-6 w-3/4" />
        <LoadingSkeleton className="h-4 w-full" />
        <LoadingSkeleton className="h-4 w-2/3" />
        <LoadingSkeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="glass-effect rounded-2xl overflow-hidden">
      <LoadingSkeleton variant="image" />
      <div className="p-6 space-y-3">
        <LoadingSkeleton className="h-6 w-3/4" />
        <LoadingSkeleton className="h-4 w-full" />
        <LoadingSkeleton className="h-6 w-16" />
      </div>
    </div>
  );
}

export function PostListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
}
