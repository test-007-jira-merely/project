import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/services/projects';

export async function GET() {
  const result = await getProjects();

  if (result.error) {
    return NextResponse.json(
      { error: result.error },
      { status: 500 }
    );
  }

  return NextResponse.json(result.data);
}
