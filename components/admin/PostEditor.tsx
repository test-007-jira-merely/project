'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Eye, Loader2, AlertCircle } from 'lucide-react';
import { createPost, updatePost, getPostBySlug } from '@/lib/db/posts';
import { ROUTES } from '@/lib/constants';
import type { Post, PostInput } from '@/types/database';

interface PostEditorProps {
  post?: Post;
  isNew?: boolean;
}

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function PostEditor({ post, isNew = false }: PostEditorProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<PostInput>({
    title: post?.title || '',
    slug: post?.slug || '',
    content: post?.content || '',
    cover_image: post?.cover_image || '',
    published: post?.published || false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!isNew);

  // Auto-generate slug from title
  useEffect(() => {
    if (isNew && !slugManuallyEdited && formData.title) {
      setFormData((prev) => ({ ...prev, slug: generateSlug(formData.title) }));
    }
  }, [formData.title, isNew, slugManuallyEdited]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent, publish: boolean = false) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // Check for duplicate slug on new posts
    if (isNew) {
      const existingPost = await getPostBySlug(formData.slug);
      if (existingPost.data) {
        setErrors({ slug: 'This slug is already in use' });
        setIsSubmitting(false);
        return;
      }
    }

    const dataToSubmit: PostInput = {
      ...formData,
      published: publish,
    };

    const result = isNew
      ? await createPost(dataToSubmit)
      : await updatePost(post!.id, dataToSubmit);

    if (result.error) {
      setErrors({ submit: result.error });
      setIsSubmitting(false);
      return;
    }

    router.push(ROUTES.ADMIN_POSTS);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
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
          {isNew ? 'Create New Post' : 'Edit Post'}
        </h1>
        <div className="w-20" /> {/* Spacer for alignment */}
      </div>

      {/* Form */}
      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
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
            placeholder="Enter post title"
          />
          {errors.title && (
            <p className="text-red-400 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Slug */}
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-white/80 mb-2">
            Slug *
          </label>
          <div className="flex items-center gap-2">
            <span className="text-white/40">/blog/</span>
            <input
              id="slug"
              type="text"
              value={formData.slug}
              onChange={(e) => {
                setSlugManuallyEdited(true);
                setFormData({ ...formData, slug: e.target.value.toLowerCase() });
              }}
              className={`flex-1 px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal transition-colors ${
                errors.slug ? 'border-red-500' : 'border-white/10'
              }`}
              placeholder="post-url-slug"
            />
          </div>
          {errors.slug && (
            <p className="text-red-400 text-sm mt-1">{errors.slug}</p>
          )}
        </div>

        {/* Cover Image */}
        <div>
          <label htmlFor="cover_image" className="block text-sm font-medium text-white/80 mb-2">
            Cover Image URL
          </label>
          <input
            id="cover_image"
            type="url"
            value={formData.cover_image || ''}
            onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal transition-colors"
            placeholder="https://example.com/image.jpg"
          />
          {formData.cover_image && (
            <div className="mt-3 rounded-lg overflow-hidden max-h-48">
              <img
                src={formData.cover_image}
                alt="Cover preview"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-white/80 mb-2">
            Content (Markdown) *
          </label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={15}
            className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal transition-colors font-mono text-sm ${
              errors.content ? 'border-red-500' : 'border-white/10'
            }`}
            placeholder="Write your post content in markdown..."
          />
          {errors.content && (
            <p className="text-red-400 text-sm mt-1">{errors.content}</p>
          )}
          <p className="text-white/40 text-sm mt-2">
            Supports Markdown formatting: **bold**, *italic*, # headings, [links](url), etc.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/10">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Save size={20} />
            )}
            Save as Draft
          </motion.button>

          <motion.button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white rounded-lg font-medium hover:bg-teal-light transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Eye size={20} />
            )}
            {isNew ? 'Publish' : 'Update & Publish'}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
