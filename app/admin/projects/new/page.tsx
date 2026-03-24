'use client';

import { motion } from 'framer-motion';
import { ProjectForm } from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold mb-6">Add New Project</h1>
      <ProjectForm />
    </motion.div>
  );
}
