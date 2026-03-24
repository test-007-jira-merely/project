'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Loader2, Eye } from 'lucide-react';
import Link from 'next/link';
import { postsService } from '@/lib/services';
import { ROUTES } from '@/lib/constants';
import type { Post, PostCreate, PostUpdate } from '@/types/database';

interface PostFormProps {
  post?: Post;
  isEdit?: boolean;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function PostForm({ post, isEdit = false }: PostFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: post?.title ?? '',
    slug: post?.slug ?? '',
    content: post?.content ?? '',
    cover_image: post?.cover_image ?? '',
    published: post?.published ?? false,
  });

  // Auto-generate slug from title for new posts
  useEffect(() => {
    if (!isEdit && formData.title && !formData.slug) {
      setFormData((prev) => ({ ...prev, slug: generateSlug(prev.title) }));
    }
  }, [formData.title, isEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const data: PostCreate | PostUpdate = {
      title: formData.title,
      slug: formData.slug,
      content: formData.content,
      cover_image: formData.cover_image || null,
      published: formData.published,
    };

    const result = isEdit && post
      ? await postsService.update(post.id, data)
      : await postsService.create(data as PostCreate);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      router.push(ROUTES.ADMIN_POSTS);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href={ROUTES.ADMIN_POSTS}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
        >
          <ArrowLeft size={20} />
          Back to Posts
        </Link>
        <div className="flex items-center gap-3">
          {isEdit && post?.published && (
            <Link
              href={ROUTES.BLOG_POST(post.slug)}
              target="_blank"
              className="px-4 py-2 glass-effect rounded-lg font-medium hover:border-teal transition-colors duration-300 flex items-center gap-2"
            >
              <Eye size={18} />
              View
            </Link>
          )}
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
                {isEdit ? 'Update' : 'Create'} Post
              </>
            )}
          </motion.button>
        </div>
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

      {/* Form Fields */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
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
                placeholder="Enter post title"
                className="w-full px-4 py-3 bg-navy-light border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal transition-colors duration-300"
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <label htmlFor="slug" className="text-white/80 text-sm font-medium">
                Slug *
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                value={formData.slug}
                onChange={handleChange}
                required
                placeholder="url-friendly-slug"
                className="w-full px-4 py-3 bg-navy-light border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal transition-colors duration-300"
              />
              <p className="text-white/40 text-xs">
                URL: /blog/{formData.slug || 'your-slug'}
              </p>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label htmlFor="content" className="text-white/80 text-sm font-medium">
                Content (Markdown) *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={15}
                placeholder="Write your post content in Markdown..."
                className="w-full px-4 py-3 bg-navy-light border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal transition-colors duration-300 font-mono text-sm"
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <div className="glass-effect rounded-xl p-6 space-y-4">
            <h3 className="font-semibold">Publish Settings</h3>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="w-5 h-5 rounded border-white/20 bg-navy-light text-teal focus:ring-teal focus:ring-offset-0"
              />
              <span className="text-white/80">Published</span>
            </label>
          </div>

          {/* Cover Image */}
          <div className="glass-effect rounded-xl p-6 space-y-4">
            <h3 className="font-semibold">Cover Image</h3>

            <input
              name="cover_image"
              type="text"
              value={formData.cover_image}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full px-4 py-3 bg-navy-light border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal transition-colors duration-300 text-sm"
            />

            {formData.cover_image && (
              <div className="rounded-lg overflow-hidden">
                <img
                  src={formData.cover_image}
                  alt="Cover preview"
                  className="w-full h-32 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
