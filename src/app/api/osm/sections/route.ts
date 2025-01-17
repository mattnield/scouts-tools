import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;

  console.log(`Access token: ${accessToken}`);

  if (!accessToken) {
    return NextResponse.json({ error: 'Access token missing' }, { status: 401 });
  }

  try {
    const osmResponse = await axios.get('https://www.onlinescoutmanager.co.uk/ext/generic/startup/?action=getData', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const dataString = osmResponse.data;
    const unescapedDataString = decodeURIComponent(dataString);
    const jsonData = JSON.parse(unescapedDataString.replace(/^var data_holder = /, '').replace(/;$/, ''));

    const sectionNames = jsonData.globals.roles.map((role: { sectionname: string }) => role.sectionname);
    return NextResponse.json(sectionNames);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Failed to fetch sections:', error.message);
    return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 });
  }
}