import { NextResponse } from 'next/server';
import { createProject } from '@/lib/services/projects';
import { getUser } from '@/lib/services/auth';
import type { ProjectInsert } from '@/lib/database.types';

export async function POST(request: Request) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body: ProjectInsert = await request.json();
    const result = await createProject(body);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result.data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
