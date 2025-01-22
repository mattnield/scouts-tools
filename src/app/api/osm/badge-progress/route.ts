/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { fetchBadgeProgress } from '@/utils/osmApiUtils';

// API Route handler
export async function GET(request: NextRequest) {
  console.log('Starting api/osm/badge-progress');

  const accessToken = request.cookies.get('access_token')?.value || '';
  const { searchParams } = new URL(request.url);
  const sectionId = searchParams.get('sectionid') || '';
  const termId = searchParams.get('termid') || '';
  const sectionType = searchParams.get('section') || '';
  const badgeId = searchParams.get('badgeid') || '';
  const badgeVersion = searchParams.get('badgeversion') || '';

  // console.log(`Badge Type: ${badgeType}`);
  const progress = await fetchBadgeProgress(accessToken, sectionId, termId, sectionType, badgeId, badgeVersion);
  return NextResponse.json(progress);
}