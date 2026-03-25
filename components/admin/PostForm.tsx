'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Save, Eye, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Post, PostInsert } from '@/lib/database.types';
import { generateSlug } from '@/lib/services/posts';

interface PostFormProps {
  post?: Post;
}

export default function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const isEditing = !!post;

  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [content, setContent] = useState(post?.content || '');
  const [coverImage, setCoverImage] = useState(post?.cover_image || '');
  const [published, setPublished] = useState(post?.published || false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    // Auto-generate slug if not editing
    if (!isEditing) {
      setSlug(generateSlug(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const postData: PostInsert = {
      title,
      slug,
      content,
      cover_image: coverImage || null,
      published,
    };

    try {
      const url = isEditing
        ? `/api/admin/posts/${post.id}`
        : '/api/admin/posts';

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save post');
      }

      router.push('/admin/posts');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Back Link */}
      <Link
        href="/admin/posts"
        className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Posts
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
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              className="w-full px-4 py-3 bg-navy-light border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal transition-colors"
              placeholder="Enter post title"
            />
          </div>

          {/* Slug */}
          <div className="glass-effect rounded-2xl p-6">
            <label className="block text-sm font-medium text-white/80 mb-2">
              Slug *
            </label>
            <div className="flex items-center gap-2">
              <span className="text-white/40">/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="flex-1 px-4 py-3 bg-navy-light border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal transition-colors"
                placeholder="post-slug"
              />
            </div>
          </div>

          {/* Content */}
          <div className="glass-effect rounded-2xl p-6">
            <label className="block text-sm font-medium text-white/80 mb-2">
              Content * (Markdown supported)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={20}
              className="w-full px-4 py-3 bg-navy-light border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal transition-colors font-mono text-sm"
              placeholder="Write your post content here using Markdown..."
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">Publish</h3>

            <div className="flex items-center justify-between mb-4">
              <span className="text-white/80">Status</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal"></div>
              </label>
            </div>

            <p className="text-sm text-white/50 mb-4">
              {published ? 'Post will be visible to public' : 'Post is saved as draft'}
            </p>

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
                  {isEditing ? 'Update Post' : 'Create Post'}
                </>
              )}
            </button>
          </div>

          {/* Cover Image */}
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">Cover Image</h3>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full px-4 py-3 bg-navy-light border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal transition-colors text-sm"
              placeholder="https://example.com/image.jpg"
            />
            {coverImage && (
              <div className="mt-4">
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="w-full h-32 object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Preview Link */}
          {isEditing && published && (
            <a
              href={`/blog/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-4 glass-effect rounded-2xl text-teal hover:bg-white/5 transition-colors"
            >
              <Eye size={20} />
              View Live Post
            </a>
          )}
        </div>
      </div>
    </form>
  );
}
