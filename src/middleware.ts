import { NextRequest, NextResponse } from 'next/server';
import { validateAndRefreshToken } from './lib/auth'
// import { fetchSectionNames } from "@/utils/osmUtils";

export async function middleware(request: NextRequest) {
  const { response } = await validateAndRefreshToken(request);

  if (response) {
    // Either redirect to login or update cookies after refresh
    return response;
  }

  // Token is valid; proceed with the request
  // const sectionNames = await fetchSectionNames(accessToken!);
  // request.headers.set('section-names', JSON.stringify(sectionNames));
  return NextResponse.next();
}

export const config = {
  matcher: [    /*
    Match all routes excluding:
    - `_next/static/*` (Next.js static files)
    - `_next/image/*` (Next.js optimized images)
    - `/favicon.ico` (Default favicon)
    - `/public/*` (Static assets in the public folder)
    - `/api/auth/*` (Authentication API routes)
  */
    '/((?!_next/static|_next/image|favicon.ico|public|api/auth).*)',], // Apply to all routes (Excluding Static Assets)
};