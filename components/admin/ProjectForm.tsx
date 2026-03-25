'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Project, ProjectInsert } from '@/lib/database.types';
import { PROJECT_CATEGORIES } from '@/lib/constants';

interface ProjectFormProps {
  project?: Project;
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const isEditing = !!project;

  const [title, setTitle] = useState(project?.title || '');
  const [description, setDescription] = useState(project?.description || '');
  const [category, setCategory] = useState(project?.category || 'Web Design');
  const [imageUrl, setImageUrl] = useState(project?.image_url || '');
  const [projectUrl, setProjectUrl] = useState(project?.project_url || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const projectData: ProjectInsert = {
      title,
      description,
      category,
      image_url: imageUrl || null,
      project_url: projectUrl || null,
    };

    try {
      const url = isEditing
        ? `/api/admin/projects/${project.id}`
        : '/api/admin/projects';

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save project');
      }

      router.push('/admin/projects');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Back Link */}
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Projects
      </Link>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200"
        >
          {error}
        </motion.div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="glass-effect rounded-2xl p-6">
            <label className="block text-sm font-medium text-white/80 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 bg-navy-light border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal transition-colors"
              placeholder="Enter project title"
            />
          </div>

          {/* Description */}
          <div className="glass-effect rounded-2xl p-6">
            <label className="block text-sm font-medium text-white/80 mb-2">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-3 bg-navy-light border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal transition-colors"
              placeholder="Describe this project"
            />
          </div>

          {/* Project URL */}
          <div className="glass-effect rounded-2xl p-6">
            <label className="block text-sm font-medium text-white/80 mb-2">
              Project URL (optional)
            </label>
            <input
              type="url"
              value={projectUrl}
              onChange={(e) => setProjectUrl(e.target.value)}
              className="w-full px-4 py-3 bg-navy-light border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal transition-colors"
              placeholder="https://example.com"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Category */}
          <div className="glass-effect rounded-2xl p-6">
            <label className="block text-sm font-medium text-white/80 mb-2">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-navy-light border border-white/10 rounded-lg text-white focus:outline-none focus:border-teal transition-colors"
            >
              {PROJECT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Image URL */}
          <div className="glass-effect rounded-2xl p-6">
            <label className="block text-sm font-medium text-white/80 mb-2">
              Image URL (optional)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-3 bg-navy-light border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal transition-colors text-sm"
              placeholder="https://example.com/image.jpg"
            />
            {imageUrl && (
              <div className="mt-4">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-teal text-white rounded-lg font-medium hover:bg-teal-light transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Saving...
              </>
            ) : (
              <>
                <Save size={20} />
                {isEditing ? 'Update Project' : 'Create Project'}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
