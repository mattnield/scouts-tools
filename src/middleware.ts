import { NextRequest, NextResponse } from 'next/server';
import { validateAndRefreshToken } from './lib/auth'

export async function middleware(request: NextRequest) {
  console.log('Middleware is running for:', request.url);

  const { response, accessToken } = await validateAndRefreshToken(request);

  console.log('Running middleware');

  if (response) {
    // Either redirect to login or update cookies after refresh
    return response;
  }

  // Token is valid; proceed with the request
  console.log('Valid access token:', accessToken);
  return NextResponse.next();
}

export const config = {
  matcher: ['/'], // Apply to all routes
};