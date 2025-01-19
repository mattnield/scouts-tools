/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { BadgeStructure, BadgeType, Member, Section } from "@/models/osm";

export async function GetBadgesByMember(section: Section): Promise<Member[] | undefined> {
  try {
    const requestUrl = `/api/osm/members?sectionid=${section?.sectionid}&termid=${section?.latestTerm?.termid || ''}&section=${section?.section}`;

    const response = await fetch(requestUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch sections: ${response.statusText}`);
    }
    const data: Member[] = await response.json(); //
    return data;
  } catch (err: any) {
    console.log(err.message);
  }

  return;
}

export async function GetBadgesByType(section: Section, type: BadgeType): Promise<BadgeStructure[] | undefined> {
  try {
    const requestUrl = `/api/osm/badges-by-type?sectionid=${section?.sectionid}&termid=${section?.latestTerm?.termid || ''}&section=${section?.section}&type=${type}`;

    const response = await fetch(requestUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch sections: ${response.statusText}`);
    }

    console.log('GetBadgesByType');
    const data: BadgeStructure[] = await response.json(); //
    console.log(data);
    return data;
  } catch (err: any) {
    console.log(err.message);
  }

  return;
}