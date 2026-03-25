import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getPosts } from '@/lib/services/posts';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Metadata } from 'next';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

// Estimate reading time
function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getPostBySlug(slug);

  if (result.error || !result.data) {
    return {
      title: 'Post Not Found | SaulDesign',
    };
  }

  const post = result.data;
  return {
    title: `${post.title} | SaulDesign Blog`,
    description: post.content.substring(0, 160).replace(/[#*`]/g, ''),
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160).replace(/[#*`]/g, ''),
      type: 'article',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      images: post.cover_image ? [post.cover_image] : [],
    },
  };
}

export async function generateStaticParams() {
  const result = await getPosts(1, 100, true);

  if (result.error || !result.data) {
    return [];
  }

  return result.data.data.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const result = await getPostBySlug(slug);

  if (result.error || !result.data) {
    notFound();
  }

  const post = result.data;

  // Check if post is published (for direct URL access)
  if (!post.published) {
    notFound();
  }

  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const readingTime = getReadingTime(post.content);

  return (
    <main className="min-h-screen section-padding pt-32">
      <article className="container-custom max-w-4xl">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-white/60 hover:text-teal transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Back to Blog
        </Link>

        {/* Cover Image */}
        {post.cover_image && (
          <div className="rounded-2xl overflow-hidden mb-8">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-white/60">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <time dateTime={post.created_at}>{formattedDate}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-white mt-8 mb-4">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-white mt-8 mb-4">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold text-white mt-6 mb-3">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-white/80 leading-relaxed mb-4">{children}</p>
              ),
              a: ({ href, children }) => (
                <a href={href} className="text-teal hover:text-teal-light underline">
                  {children}
                </a>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside text-white/80 mb-4 space-y-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside text-white/80 mb-4 space-y-2">{children}</ol>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-teal pl-4 italic text-white/60 my-4">
                  {children}
                </blockquote>
              ),
              code: ({ className, children }) => {
                const isInline = !className;
                if (isInline) {
                  return (
                    <code className="bg-navy-light px-2 py-1 rounded text-teal text-sm">
                      {children}
                    </code>
                  );
                }
                return (
                  <code className="block bg-navy-light p-4 rounded-lg overflow-x-auto text-sm">
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => (
                <pre className="bg-navy-light p-4 rounded-lg overflow-x-auto my-4">
                  {children}
                </pre>
              ),
              img: ({ src, alt }) => (
                <img
                  src={src}
                  alt={alt || ''}
                  className="rounded-lg max-w-full h-auto my-4"
                />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-white/10">
          <Link
            href="/blog"
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
