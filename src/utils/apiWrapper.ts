/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Member } from "@/models/Member"
import { Section } from "@/models/Section";

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