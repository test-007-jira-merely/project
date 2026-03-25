'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { PostEditor } from '@/components/admin/PostEditor';
import type { Post } from '@/types/database';

export default function EditPostPage() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error || !data) {
        setNotFoundState(true);
        setIsLoading(false);
        return;
      }

      setPost(data as Post);
      setIsLoading(false);
    }

    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-teal" />
      </div>
    );
  }

  if (notFoundState) {
    notFound();
  }

  return <PostEditor post={post!} />;
}
