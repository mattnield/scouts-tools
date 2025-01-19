/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { fetchMemberBadges } from '@/utils/osmUtils';
import { Member } from '@/models/Member';

// API Route handler
export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value || '';
  const { searchParams } = new URL(request.url);
  const sectionId = searchParams.get('sectionid') || '';
  const termId = searchParams.get('termid') || '';
  const sectionType = searchParams.get('section') || '';


  const memberBadges = await fetchMemberBadges(accessToken, sectionId, termId, sectionType);

  return NextResponse.json(memberBadges);
}