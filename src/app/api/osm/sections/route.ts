/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { Section, Term } from '@/models/osm';

function processSectionsAndTerms(apiResponse: any): Section[] {
  // Extract section information
  const allowedSections = ['squirrels', 'beavers', 'cubs', 'scouts', 'explorers', 'network']; // for filtering out unwanted sections
  const sections: Section[] = apiResponse.globals.roles
    .filter((role: any) => allowedSections.includes(role.section))
    .map((role: any) => ({
      groupname: role.groupname,
      groupid: role.groupid,
      sectionname: role.sectionname,
      sectionid: role.sectionid,
      section: role.section,
    }));


  // Extract terms
  const terms: Record<string, Term[]> = apiResponse.globals.terms;

  // Add the latest term for each section
  sections.forEach((section) => {
    const sectionTerms = terms[section.sectionid];
    if (sectionTerms && sectionTerms.length > 0) {
      section.latestTerm = sectionTerms.reduce((latest, current) =>
        new Date(current.enddate) > new Date(latest.enddate) ? current : latest
      );
    }
  });

  return sections;
}

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
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

    const sectionsWithTerms = processSectionsAndTerms(jsonData);
    return NextResponse.json(sectionsWithTerms);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Failed to fetch sections:', error.message);
    return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 });
  }
}