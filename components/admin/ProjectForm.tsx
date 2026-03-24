'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { projectsService } from '@/lib/services';
import { ROUTES, PROJECT_CATEGORIES, PROJECT_COLORS, COLOR_MAP } from '@/lib/constants';
import type { Project, ProjectCreate, ProjectUpdate } from '@/types/database';

interface ProjectFormProps {
  project?: Project;
  isEdit?: boolean;
}

export function ProjectForm({ project, isEdit = false }: ProjectFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: project?.title ?? '',
    description: project?.description ?? '',
    image_url: project?.image_url ?? '',
    project_url: project?.project_url ?? '',
    category: project?.category ?? 'UI',
    color: project?.color ?? 'purple',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const data: ProjectCreate | ProjectUpdate = {
      title: formData.title,
      description: formData.description,
      image_url: formData.image_url || null,
      project_url: formData.project_url || null,
      category: formData.category as 'UI' | 'UX' | 'Web Design',
      color: formData.color,
    };

    const result = isEdit && project
      ? await projectsService.update(project.id, data)
      : await projectsService.create(data as ProjectCreate);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      router.push(ROUTES.ADMIN_PROJECTS);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href={ROUTES.ADMIN_PROJECTS}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </Link>
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={!isLoading ? { scale: 1.02 } : undefined}
          whileTap={!isLoading ? { scale: 0.98 } : undefined}
          className="px-4 py-2 bg-teal text-white rounded-lg font-medium hover:bg-teal-light transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={18} />
              {isEdit ? 'Update' : 'Create'} Project
            </>
          )}
        </motion.button>
      </div>

      {/* Error Alert */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200"
        >
          {error}
        </motion.div>
      )}

      {/* Form */}
      <div className="glass-effect rounded-xl p-6 space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <label htmlFor="title" className="text-white/80 text-sm font-medium">
            Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Project title"
            className="w-full px-4 py-3 bg-navy-light border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal transition-colors duration-300"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label htmlFor="description" className="text-white/80 text-sm font-medium">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Brief project description"
            className="w-full px-4 py-3 bg-navy-light border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal transition-colors duration-300"
          />
        </div>

        {/* Category & Color */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="category" className="text-white/80 text-sm font-medium">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-navy-light border border-white/10 rounded-lg text-white focus:outline-none focus:border-teal transition-colors duration-300"
            >
              {PROJECT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="color" className="text-white/80 text-sm font-medium">
              Color (fallback)
            </label>
            <select
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-navy-light border border-white/10 rounded-lg text-white focus:outline-none focus:border-teal transition-colors duration-300"
            >
              {PROJECT_COLORS.map((color) => (
                <option key={color} value={color}>
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Color Preview */}
        <div className="flex items-center gap-4">
          <span className="text-white/60 text-sm">Color preview:</span>
          <div
            className={`w-12 h-12 rounded-lg ${
              COLOR_MAP[formData.color as keyof typeof COLOR_MAP]
            }`}
          />
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <label htmlFor="image_url" className="text-white/80 text-sm font-medium">
            Image URL
          </label>
          <input
            id="image_url"
            name="image_url"
            type="text"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-3 bg-navy-light border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal transition-colors duration-300"
          />
          {formData.image_url && (
            <div className="mt-2 rounded-lg overflow-hidden">
              <img
                src={formData.image_url}
                alt="Preview"
                className="w-full h-32 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        {/* Project URL */}
        <div className="space-y-2">
          <label htmlFor="project_url" className="text-white/80 text-sm font-medium">
            Project URL
          </label>
          <input
            id="project_url"
            name="project_url"
            type="text"
            value={formData.project_url}
            onChange={handleChange}
            placeholder="https://example.com"
            className="w-full px-4 py-3 bg-navy-light border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal transition-colors duration-300"
          />
        </div>
      </div>
    </form>
  );
}
