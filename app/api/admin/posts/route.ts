import { NextResponse } from 'next/server';
import { createPost } from '@/lib/services/posts';
import { getUser } from '@/lib/services/auth';
import type { PostInsert } from '@/lib/database.types';

export async function POST(request: Request) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body: PostInsert = await request.json();
    const result = await createPost(body);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result.data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
