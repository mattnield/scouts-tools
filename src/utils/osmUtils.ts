/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadgeDetails, BadgeStructure, Member } from '@/models/osm';
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

export function deserializeBadgeStructure(jsonData: any): BadgeStructure[] {
  const structures = jsonData.structure as Record<string, { rows: any }[]>; // Explicitly typing the structure
  const details = jsonData.details as Record<string, BadgeDetails>;       // Explicitly typing the details

  const badgeStructures: BadgeStructure[] = [];

  // Loop through each key in the structure
  for (const [key, structureArray] of Object.entries(structures)) {
    // Get the second `rows` element, if it exists
    const secondRows = structureArray[1]?.rows ?? [];

    // Find the corresponding badge details
    const detail = details[key];

    if (!detail) {
      console.warn(`No details found for badge key: ${key}`);
      continue; // Skip if no details exist for this badge
    }

    // Transform the data into a `BadgeStructure`
    const badgeStructure: BadgeStructure = {
      badgeId: detail.badge_id,
      badgeVersion: detail.badge_version,
      details: {
        badge_id: detail.badge_id,
        badge_version: detail.badge_version,
        shortname: detail.shortname,
        badge_identifier: detail.badge_identifier,
        name: detail.name,
        picture: detail.picture,
        description: detail.description,
        parents_description: detail.parents_description,
        config: detail.config,
        portal_config: detail.portal_config,
        userid: detail.userid,
        sharing: detail.sharing,
        latest: detail.latest,
        badge_order: detail.badge_order,
        group_name: detail.group_name,
        created_at: detail.created_at,
        lastupdated: detail.lastupdated,
        type_id: detail.type_id,
      },
      fields: secondRows.map((row: any) => ({
        name: row.name,
        field: row.field,
        width: row.width,
        formatter: row.formatter,
        tooltip: row.tooltip,
        module: row.module,
        section_id: row.section_id,
        sameas: row.sameas,
        editable: row.editable,
      })),
    };

    badgeStructures.push(badgeStructure);
  }

  return badgeStructures;
}

export async function fetchBadgesByType(accessToken: string, sectionId: string, termId: string, sectionType: string, badgeType: number): Promise<BadgeStructure[]> {
  try {
    // Build the request URL and parameters
    const url = `${API_BASE_URL}/ext/badges/records/`;
    const params = {
      action: 'getBadgeStructureByType',
      section: sectionType,
      section_id: sectionId,
      term_id: termId,
      type_id: badgeType
    };

    // Make the API request using Axios
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // If the API requires an Authorization header
      },
      params,
    });

    // Parse and process the response
    const data = response.data;
    if (!data) {
      console.log('no badge structure data')
      return [];
    }

    const badgeStructure = deserializeBadgeStructure(data);
    return badgeStructure;
  } catch (error) {
    console.error('Error fetching badge structure:', error);
    throw new Error('Failed to fetch badge structure');
  }
}