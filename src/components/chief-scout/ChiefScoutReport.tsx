'use client';

import React, { useEffect, useState } from 'react';
import { GetBadgesByMember, GetBadgesByType, GetBadgeProgress } from '@/utils/apiWrapper';
import { ApplicationContextProvider, useApplicationContext } from '@/context/ApplicationContext';
import { BadgeField, BadgeStructure, BadgeType, Member, MemberBadgeProgress, Section } from '@/models/osm';
import Loading from '../Loading';
import Link from 'next/link';

const ChiefScoutReport: React.FC = () => {
  // const context = ApplicationContextProvider();
  // const {members, getMembers} = context;
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   if (!selectedSection) {
  //     return;
  //   }

  //   getMembers();

  //   const fetchMembers = async (section: Section) => {
  //     setLoading(true);
  //     setError(null);

  //     try {
  //       getMembers();
  //       const fetchedBadgeStructure = await GetBadgesByType(selectedSection, BadgeType.Challenge);
  //       console.log(`Found ${fetchedBadgeStructure?.length} badges`);
  //       const sortedBadges = fetchedBadgeStructure!.sort((a, b) => { if ((a.details.badge_order || 1) < (b.details.badge_order || 1)) { return -1; } else { return 1; } return 0; });
  //       setBadgeStructure(sortedBadges);
  //       badgeStructure.forEach(async (badge: BadgeStructure) => {
  //         // Get progress
  //         console.log(badge);
  //         const nextBadge = await GetBadgeProgress(selectedSection, badge);
  //       });
  //     } catch (err) {
  //       console.error('Error fetching members:', err);
  //       setError('Failed to load members. Please try again later.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchMembers(selectedSection);
  // }, [selectedSection], [getMembers]);

  // if (!selectedSection) {
  //   return <p>Please select a section to view its members.</p>;
  // }

  // if (loading) {
  //   return <Loading width='90%' height='300px' color='#eee' borderRadius='8px' />;
  // }

  // if (error) {
  //   return <p className="text-red-500">{error}</p>;
  // }

  return (
    <div>
      <h2 className='text-xl font-semibold text-violet-900'>Chief Scout Award Summary for {selectedSection.sectionname}</h2>
      {/* <table className="table-auto w-full text-center max-w-fit">
        <thead>
          <tr className="px-2 py-2">
            <th className="px-1 py-1 bg-inherit">Badge</th>
            <th className="px-1 py-1 bg-inherit">Section</th>
            <th className="px-1 py-1 bg-inherit">Requirement</th>
            {members.map((member) => (
              <th className="transform -rotate-90 whitespace-nowrap px-0 py-0 border border-gray-300 align-bottom text-left" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }} key={member.scout_id}>
                <Link href={`/member/${member.scout_id}`}>{member.firstname} {member.lastname}</Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {badgeStructure.map((badge) => {
            const sectionsGrouped = groupFieldsBySection(badge.fields);
            // TODO: Load the badge progress

            return (
              <React.Fragment key={badge.badgeId}>
                {Object.entries(sectionsGrouped).map(([section, fields], sectionIndex) => (
                  <React.Fragment key={`${badge.badgeId}-${section}`}>
                    {fields.map((field, fieldIndex) => (
                      <tr key={`${badge.badgeId}-${section}-${field.field}`}>
                        {sectionIndex === 0 && fieldIndex === 0 && (
                          <td
                            className="border border-gray-300 px-4 py-2"
                            rowSpan={Object.values(sectionsGrouped).flat().length}
                          >
                            {badge.details.name}
                          </td>
                        )}
                        {fieldIndex === 0 && (
                          <td
                            className="border border-gray-300 px-4 py-2"
                            rowSpan={fields.length}
                          >
                            {section}
                          </td>
                        )}
                        {console.log(field)}
                        <td className="border border-gray-300 px-4 py-2" title={field.tooltip}>
                          {field.name}<br />{field.field}
                        </td>
                        {members.map(member => (
                          <td key={`${badge.badgeId}-${section}-${field.field}-${member.scout_id}`}>
                            ●
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </React.Fragment>
            );
          })}
        </tbody>
      </table> */}
    </div>
  );
};

const groupFieldsBySection = (fields: BadgeField[]) => {
  return fields.reduce<Record<string, BadgeField[]>>((acc, field) => {
    const section = field.module || 'Unknown Section'; // Use 'module' or default to 'Unknown Section'
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(field);
    return acc;
  }, {});
};

export default ChiefScoutReport;