import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer';
import { getPostBySlug } from '@/lib/services/posts';
import { ROUTES } from '@/lib/constants';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | SaulDesign',
    };
  }

  const description = post.content.replace(/[#*`]/g, '').substring(0, 160);

  return {
    title: `${post.title} | SaulDesign Blog`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      images: post.cover_image ? [post.cover_image] : [],
    },
  };
}

function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const { data: post, error } = await getPostBySlug(slug);

  if (error || !post) {
    notFound();
  }

  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const readTime = estimateReadTime(post.content);

  return (
    <main className="min-h-screen section-padding pt-32">
      <article className="container-custom max-w-4xl">
        {/* Back Link */}
        <Link
          href={ROUTES.BLOG}
          className="inline-flex items-center gap-2 text-white/60 hover:text-teal transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center gap-6 text-white/60">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <time dateTime={post.created_at}>{formattedDate}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{readTime} min read</span>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.cover_image && (
          <div className="rounded-2xl overflow-hidden mb-8">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Content */}
        <div className="glass-effect rounded-2xl p-8 md:p-12">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-white/10">
          <Link
            href={ROUTES.BLOG}
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white rounded-full font-medium hover:bg-teal-light transition-colors"
          >
            <ArrowLeft size={18} />
            More Articles
          </Link>
        </footer>
      </article>
    </main>
  );
}
