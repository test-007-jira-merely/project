import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPosts } from '@/lib/db/posts';
import BlogPostClient from './BlogPostClient';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getPostBySlug(slug);

  if (!result.data) {
    return {
      title: 'Post Not Found',
    };
  }

  const post = result.data;
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

export async function generateStaticParams() {
  const result = await getPosts(1, 100, true);

  if (!result.data) return [];

  return result.data.data.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const result = await getPostBySlug(slug);

  if (result.error || !result.data) {
    notFound();
  }

  // Don't show unpublished posts publicly
  if (!result.data.published) {
    notFound();
  }

  return <BlogPostClient post={result.data} />;
}
