import { NextRequest, NextResponse } from 'next/server';
import { validateAndRefreshToken } from './lib/auth'
import {fetchSectionNames} from "@/utils/osmUtils";

export async function middleware(request: NextRequest) {
  const { response, accessToken } = await validateAndRefreshToken(request);

  if (response) {
    // Either redirect to login or update cookies after refresh
    return response;
  }

  // Token is valid; proceed with the request
  const sectionNames = await fetchSectionNames(accessToken!);
  request.headers.set('section-names', JSON.stringify(sectionNames));
  return NextResponse.next();
}

export const config = {
  matcher: ['/'], // Apply to all routes
};