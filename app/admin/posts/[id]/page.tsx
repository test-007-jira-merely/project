import { notFound } from 'next/navigation';
import { getPostById } from '@/lib/services/posts';
import PostForm from '@/components/admin/PostForm';

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const result = await getPostById(id);

  if (result.error || !result.data) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <PostForm post={result.data} />
    </div>
  );
}

export const metadata = {
  title: 'Edit Post | Admin Dashboard',
};
