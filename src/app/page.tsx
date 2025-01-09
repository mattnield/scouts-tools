/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { cookies } from 'next/headers';

async function fetchStartupData(accessToken: string) {
  try {
    const response = await axios.get('https://www.onlinescoutmanager.co.uk/ext/generic/startup/?action=getData', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Error fetching startup data:', error.response?.data || error.message);
    throw new Error('Failed to fetch startup data');
  }
}

export default async function HomePage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value || null;

  // Fetch startup data
  const data = await fetchStartupData(accessToken!);

  return (
    <div>
      <h1>Online Scout Manager - Startup Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}