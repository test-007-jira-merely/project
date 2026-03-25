'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { createProject, updateProject } from '@/lib/db/projects';
import { ROUTES, PROJECT_CATEGORIES } from '@/lib/constants';
import type { Project, ProjectInput, ProjectCategory } from '@/types/database';

interface ProjectEditorProps {
  project?: Project;
  isNew?: boolean;
}

export function ProjectEditor({ project, isNew = false }: ProjectEditorProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<ProjectInput>({
    title: project?.title || '',
    description: project?.description || '',
    image_url: project?.image_url || '',
    project_url: project?.project_url || '',
    category: project?.category || 'UI',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (formData.image_url && !isValidUrl(formData.image_url)) {
      newErrors.image_url = 'Please enter a valid URL';
    }

    if (formData.project_url && !isValidUrl(formData.project_url)) {
      newErrors.project_url = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    const result = isNew
      ? await createProject(formData)
      : await updateProject(project!.id, formData);

    if (result.error) {
      setErrors({ submit: result.error });
      setIsSubmitting(false);
      return;
    }

    router.push(ROUTES.ADMIN_PROJECTS);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <h1 className="text-2xl font-bold">
          {isNew ? 'Add New Project' : 'Edit Project'}
        </h1>
        <div className="w-20" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Global Error */}
        {errors.submit && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-3"
          >
            <AlertCircle className="text-red-400" size={20} />
            <p className="text-red-300">{errors.submit}</p>
          </motion.div>
        )}

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-white/80 mb-2">
            Title *
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal transition-colors ${
              errors.title ? 'border-red-500' : 'border-white/10'
            }`}
            placeholder="Enter project title"
          />
          {errors.title && (
            <p className="text-red-400 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-white/80 mb-2">
            Category *
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value as ProjectCategory })
            }
            className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white focus:outline-none focus:border-teal transition-colors ${
              errors.category ? 'border-red-500' : 'border-white/10'
            }`}
          >
            {PROJECT_CATEGORIES.map((category) => (
              <option key={category} value={category} className="bg-navy">
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-400 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-white/80 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal transition-colors ${
              errors.description ? 'border-red-500' : 'border-white/10'
            }`}
            placeholder="Describe your project..."
          />
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="image_url" className="block text-sm font-medium text-white/80 mb-2">
            Image URL
          </label>
          <input
            id="image_url"
            type="url"
            value={formData.image_url || ''}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal transition-colors ${
              errors.image_url ? 'border-red-500' : 'border-white/10'
            }`}
            placeholder="https://example.com/image.jpg"
          />
          {errors.image_url && (
            <p className="text-red-400 text-sm mt-1">{errors.image_url}</p>
          )}
          {formData.image_url && !errors.image_url && (
            <div className="mt-3 rounded-lg overflow-hidden max-h-40">
              <img
                src={formData.image_url}
                alt="Preview"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        {/* Project URL */}
        <div>
          <label htmlFor="project_url" className="block text-sm font-medium text-white/80 mb-2">
            Project URL
          </label>
          <input
            id="project_url"
            type="url"
            value={formData.project_url || ''}
            onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
            className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal transition-colors ${
              errors.project_url ? 'border-red-500' : 'border-white/10'
            }`}
            placeholder="https://example.com/project"
          />
          {errors.project_url && (
            <p className="text-red-400 text-sm mt-1">{errors.project_url}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/10">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white rounded-lg font-medium hover:bg-teal-light transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Save size={20} />
            )}
            {isNew ? 'Create Project' : 'Update Project'}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
