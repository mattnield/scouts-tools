import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

/**
 * Validates and refreshes tokens if necessary.
 * @param request - The incoming NextRequest object
 * @returns An object containing the access token or a redirect response
 */
export async function validateAndRefreshToken(request: NextRequest): Promise<{ accessToken?: string; response?: NextResponse }> {
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  const host = request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto') === 'https' ? 'https' : 'http';

  if (!accessToken) {
    if (!refreshToken) {
      // No tokens available, redirect to login
      const response = NextResponse.redirect(`${protocol}://${host}/api/auth/authorize`);
      return { response };
    }

    // Try to refresh the access token
    try {
      const tokenResponse = await axios.post('https://www.onlinescoutmanager.co.uk/oauth/token', {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: process.env.CLIENT_ID,
      });

      const { access_token, refresh_token, expires_in } = tokenResponse.data;

      // Update cookies with the new tokens
      const response = NextResponse.next();
      response.cookies.set('access_token', access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: expires_in,
      });

      response.cookies.set('refresh_token', refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
      });

      return { accessToken: access_token, response };
    } catch (error: unknown) {
      console.error('Error refreshing token:', error);
      // TODO : Handle this error properly
      const response = NextResponse.redirect('/login');
      return { response };
    }
  }

  // Access token exists and is valid
  return { accessToken };
}