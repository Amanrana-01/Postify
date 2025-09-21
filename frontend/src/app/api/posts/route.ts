import { NextResponse } from 'next/server';
import { apiClient } from '../../../lib/api';

export async function GET() {
  try {
    const data = await apiClient.fetchPosts({ limit: 12, depth: 1 });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
