/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { BadgeStructure, BadgeType, Member, MemberBadgeProgress, Section } from "@/models/osm";

export async function GetBadgesByMember(section: Section): Promise<Member[] | null> {
  try {
    const requestUrl = `/api/osm/members?sectionid=${section?.sectionid}&termid=${section?.latestTerm?.termid || ''}&section=${section?.section}`;

    const response = await fetch(requestUrl);
    if (!response.ok) {
      throw new Error(`API Wrapper failed to get badges by member: ${response.statusText}`);
    }
    const data: Member[] = await response.json(); //
    return data;
  } catch (err: any) {
    console.log(err.message);
  }

  return null;
}

export async function GetMember(section: Section, memberId: string): Promise<Member> {
  try {
    const requestUrl = `/api/osm/member?sectionid=${section?.sectionid}&termid=${section?.latestTerm?.termid || ''}&section=${section?.section}&scoutid=${memberId}&context=member`;

    const response = await fetch(requestUrl);
    if (!response.ok) {
      throw new Error(`API Wrapper failed to members: ${response.statusText}`);
    }
    const data: Member = await response.json(); //
    return data;
  } catch (err: any) {
    console.log(err.message);
  }

  return { scoutid: 0 } as Member;
}

export async function GetBadges(section: Section): Promise<BadgeStructure[]> {
  let badges: BadgeStructure[] = [];
  badges = [...await GetBadgesByType(section, BadgeType.Challenge)];
  badges = [...badges, ...await GetBadgesByType(section, BadgeType.Activity)];
  badges = [...badges, ...await GetBadgesByType(section, BadgeType.Staged)];

  console.log(`Found ${badges.length} badges`);

  return badges;
}

export async function GetBadgesByType(section: Section, type: BadgeType): Promise<BadgeStructure[]> {
  try {
    const requestUrl = `/api/osm/badges-by-type?sectionid=${section?.sectionid}&termid=${section?.latestTerm?.termid || ''}&section=${section?.section}&type=${type}`;

    const response = await fetch(requestUrl);

    if (!response.ok) {
      throw new Error(`API Wrapper failed to get badges by type: ${response.statusText}`);
    }

    const data: BadgeStructure[] = await response.json(); //
    return data;
  } catch (err: any) {
    console.log(err.message);
  }

  return [];
}

/**
 * Returns the progress of all active valid members for the provided badge in the procided section.
 * 
 * @param section The currently selected section (this contains the current term)
 * @param badge The strudture of the badge in question
 * @returns 
 */
export async function GetBadgeProgress(section: Section, badge: BadgeStructure): Promise<MemberBadgeProgress[] | undefined> {
  try {
    const requestUrl = `/api/osm/badge-progress?sectionid=${section?.sectionid}&termid=${section?.latestTerm?.termid || ''}&section=${section?.section}&badgeid=${badge.badgeId}&badgeversion=${badge.badgeVersion}`;
    const response = await fetch(requestUrl);

    if (!response.ok) {
      throw new Error(`API wrapper failed to get badge progress: ${response.statusText}`);
    }

    const data: MemberBadgeProgress[] = await response.json(); //
    return data;
  } catch (err: any) {
    console.log(err.message);
  }

  return;
}