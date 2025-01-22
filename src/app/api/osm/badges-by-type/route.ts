/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { fetchBadgesByType } from '@/utils/osmApiUtils';

// API Route handler
export async function GET(request: NextRequest) {
  console.log('Starting api/osm/badges-by-type');

  const accessToken = request.cookies.get('access_token')?.value || '';
  const { searchParams } = new URL(request.url);
  const sectionId = searchParams.get('sectionid') || '';
  const termId = searchParams.get('termid') || '';
  const sectionType = searchParams.get('section') || '';
  const badgeType = Number.parseInt(searchParams.get('type') || '1');

  const badges = await fetchBadgesByType(accessToken, sectionId, termId, sectionType, badgeType);
  return NextResponse.json(badges);
}