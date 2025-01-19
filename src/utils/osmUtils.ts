/* eslint-disable @typescript-eslint/no-explicit-any */
import { Member } from '@/models/osm';
import axios from 'axios';

const API_BASE_URL = 'https://www.onlinescoutmanager.co.uk';

export async function fetchMemberBadges(accessToken: string, sectionId: string, termId: string, sectionType: string): Promise<Member[]> {
  try {
    // Build the request URL and parameters
    const url = `${API_BASE_URL}/ext/badges/badgesbyperson/`;
    const params = {
      action: 'loadBadgesByMember',
      section: sectionType,
      sectionid: sectionId,
      term_id: termId,
    };

    console.clear();

    // Make the API request using Axios
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // If the API requires an Authorization header
      },
      params,
    });

    // Parse and process the response
    const data = response.data;
    if (!data || !data.data) {
      return [];
    }

    const members = response.data.data as Member[];
    // Extract members using JSONPath-like logic
    return members;
  } catch (error) {
    console.error('Error fetching members:', error);
    throw new Error('Failed to fetch members');
  }
}