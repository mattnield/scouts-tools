import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

/**
 * Exchanges the authorization code for tokens.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Authorization code not found' }, { status: 400 });
  }

  // Retrieve the code_verifier from the cookie
  const codeVerifier = request.cookies.get('code_verifier')?.value;

  if (!codeVerifier) {
    return NextResponse.json({ error: 'Code verifier not found' }, { status: 400 });
  }

  try {
    const response = await axios.post('https://www.onlinescoutmanager.co.uk/oauth/token', {
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.REDIRECT_URI,
      client_id: process.env.CLIENT_ID,
      code_verifier: codeVerifier, // Include the PKCE code_verifier
    });

    console.log(response.data);
    const { access_token, refresh_token, expires_in } = response.data;

    // Optionally save tokens securely (e.g., database or session)
    const responseCookie = NextResponse.json({ success: true });
    responseCookie.cookies.set('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: expires_in, // Lifetime of the token
    });

    responseCookie.cookies.set('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    return responseCookie;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error exchanging code for token:', error.response?.data || error.message);
      return NextResponse.json({ error: 'Token exchange failed' }, { status: 500 });
    } else {
      // Handle other types of errors
      console.error('Unexpected error:', error);
      return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
    }
  }
}