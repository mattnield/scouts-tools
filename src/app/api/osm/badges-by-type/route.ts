import { NextRequest, NextResponse } from 'next/server';
import { fetchBadgesByType } from '@/utils/osmApiUtils';
import { BadgeStructure } from '@/models/osm';

// API Route handler
export async function GET(request: NextRequest) {
  const accessToken: string = request.cookies.get('access_token')?.value || '';
  const { searchParams }: URL = new URL(request.url);
  const sectionId: string = searchParams.get('sectionid') || '';
  const termId: string = searchParams.get('termid') || '';
  const sectionType: string = searchParams.get('section') || '';
  const badgeType: number = Number.parseInt(searchParams.get('type') || '1');
  const badges: BadgeStructure[] = await fetchBadgesByType(accessToken, sectionId, termId, sectionType, badgeType);

  return NextResponse.json(badges);
}