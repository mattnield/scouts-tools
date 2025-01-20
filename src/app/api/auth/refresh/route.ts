import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest): Promise<NextResponse> {
  console.log('Refreshing access token.');

  const refreshToken = request.cookies.get('refresh_token')?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: 'Refresh token not found' }, { status: 401 });
  }

  try {
    const response = await axios.post('https://www.onlinescoutmanager.co.uk/oauth/token', {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: process.env.CLIENT_ID,
    });

    const { access_token, refresh_token, expires_in } = response.data;

    // Update cookies with the new tokens
    const responseCookie = NextResponse.json({ success: true });
    responseCookie.cookies.set('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: expires_in,
    });

    responseCookie.cookies.set('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    return responseCookie;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return NextResponse.json({ error: 'Token refresh failed' }, { status: 500 });
  }
}