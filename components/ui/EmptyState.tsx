import { motion } from 'framer-motion';
import { FileX } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="flex justify-center mb-4">
        {icon || <FileX size={48} className="text-white/30" />}
      </div>
      <h3 className="text-xl font-semibold text-white/70 mb-2">{title}</h3>
      {description && (
        <p className="text-white/50">{description}</p>
      )}
    </motion.div>
  );
}
