import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Generates PKCE values and redirects to the OAuth provider.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest): Promise<NextResponse> {
  const baseUrl = 'https://www.onlinescoutmanager.co.uk/oauth/authorize';

  // Generate PKCE values
  const codeVerifier = crypto.randomBytes(32).toString('hex'); // Generate code_verifier
  const codeChallenge = crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, ''); // Generate code_challenge

  // Store the code_verifier securely (e.g., in a session or cookie)
  const url = `${baseUrl}?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=${process.env.SCOPE}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
  console.log(url);
  const response = NextResponse.redirect(url);
  response.cookies.set('code_verifier', codeVerifier, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  });

  return response;
}