'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { projectsService } from '@/lib/services';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { ErrorState } from '@/components/ui';
import { ROUTES } from '@/lib/constants';
import type { Project } from '@/types/database';

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      const result = await projectsService.getById(id);

      if (result.error) {
        setError(result.error);
      } else {
        setProject(result.data);
      }

      setIsLoading(false);
    };

    fetchProject();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-teal" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <ErrorState
        message={error || 'Project not found'}
        onRetry={() => router.push(ROUTES.ADMIN_PROJECTS)}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold mb-6">Edit Project</h1>
      <ProjectForm project={project} isEdit />
    </motion.div>
  );
}
