import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="flex justify-center mb-4">
        <AlertCircle size={48} className="text-red-400" />
      </div>
      <h3 className="text-xl font-semibold text-white/70 mb-2">Something went wrong</h3>
      <p className="text-white/50 mb-4">{message}</p>
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="px-6 py-2 bg-teal text-white rounded-full font-medium hover:bg-teal-light transition-colors duration-300 flex items-center gap-2 mx-auto"
        >
          <RefreshCw size={18} />
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
}
