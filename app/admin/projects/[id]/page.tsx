'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ProjectEditor } from '@/components/admin/ProjectEditor';
import type { Project } from '@/types/database';

export default function EditProjectPage() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    async function fetchProject() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error || !data) {
        setNotFoundState(true);
        setIsLoading(false);
        return;
      }

      setProject(data as Project);
      setIsLoading(false);
    }

    if (params.id) {
      fetchProject();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-teal" />
      </div>
    );
  }

  if (notFoundState) {
    notFound();
  }

  return <ProjectEditor project={project!} />;
}
