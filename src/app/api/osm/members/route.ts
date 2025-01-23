import { NextRequest, NextResponse } from 'next/server';
import { fetchMemberBadges } from '@/utils/osmApiUtils';
import { Member } from '@/models/osm';

// API Route handler
export async function GET(request: NextRequest) {
  const accessToken: string = request.cookies.get('access_token')?.value || '';
  const { searchParams }: URL = new URL(request.url);
  const sectionId: string = searchParams.get('sectionid') || '';
  const termId: string = searchParams.get('termid') || '';
  const sectionType: string = searchParams.get('section') || '';
  const memberBadges: Member[] = await fetchMemberBadges(accessToken, sectionId, termId, sectionType);

  return NextResponse.json(memberBadges);
}