import { NextRequest, NextResponse } from 'next/server';
import { fetchBadgeProgress } from '@/utils/osmApiUtils';
import { MemberBadgeProgress } from '@/models/osm';

// API Route handler
export async function GET(request: NextRequest) {
  const accessToken: string = request.cookies.get('access_token')?.value || '';
  const { searchParams }: URL = new URL(request.url);
  const sectionId: string = searchParams.get('sectionid') || '';
  const termId: string = searchParams.get('termid') || '';
  const sectionType: string = searchParams.get('section') || '';
  const badgeId: string = searchParams.get('badgeid') || '';
  const badgeVersion: string = searchParams.get('badgeversion') || '';
  const progress: MemberBadgeProgress[] = await fetchBadgeProgress(accessToken, sectionId, termId, sectionType, badgeId, badgeVersion);

  return NextResponse.json(progress);
}