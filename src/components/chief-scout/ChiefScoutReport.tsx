'use client';

import React, { useEffect, useState } from 'react';
import { useApplicationContext } from '@/context/ApplicationContext';
import Loading from '../Loading';
import Link from 'next/link';
import { BadgeField, BadgeStructure, Member, MemberBadgeProgress } from '@/models/osm';
import { GetBadgeProgress } from '@/utils/apiWrapper';

interface LocalBadgeProgress { [badegId: string]: MemberBadgeProgress[] }

const ChiefScoutReport: React.FC = () => {
  const { selectedSection, getMembers, getBadgeStructure } = useApplicationContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [localMembers, setLocalMembers] = useState<Member[] | null>(null);
  const [localBadgeStructure, setLocalBadgeStructure] = useState<BadgeStructure[] | null>(null);
  const [localBadgeProgress, setLocalBadgeProgress] = useState<LocalBadgeProgress>({});

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedSection) {
        setLocalMembers(null);
        setLocalBadgeStructure(null);
        setError('No section selected.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const fetchedMembers = await getMembers();
        const fetchedBadgeStructure = await getBadgeStructure();

        setLocalMembers(fetchedMembers);
        setLocalBadgeStructure(fetchedBadgeStructure);

        // Get member badge progress
        if (fetchedBadgeStructure) {
          fetchedBadgeStructure.forEach(async (badge: BadgeStructure) => {
            const newBadgeProgress = await GetBadgeProgress(selectedSection, badge);
            if (newBadgeProgress) setLocalBadgeProgress((currentProgress) => ({
              ...currentProgress,
              [badge.badgeId]: newBadgeProgress,
            }));
          });
        }
      } catch (err) {
        console.error('Error loading chief scouts summary: ', err);
        setError('Failed to load Chief Scouts Summary. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedSection, getMembers, getBadgeStructure]);

  const progressDisplay = (fieldId: string, badgeId: string, memberId: string): string => {
    if (!(badgeId in localBadgeProgress)) return '';
    const memberProgress = localBadgeProgress[badgeId].find((m: MemberBadgeProgress) => m.scoutid == memberId);
    if (!memberProgress) return '';

    if (memberProgress.completed == "1") {
      console.log(`Member ${memberId} compelted badge ${badgeId}`)
      return '⬢';
    }

    if (fieldId in memberProgress) {
      if (memberProgress[fieldId].toString().toLowerCase().startsWith('x')) return '⬡';
      if (memberProgress[fieldId].toString() != '') return '⬢';
    }

    return '';
  }

  if (!selectedSection) {
    return <p>Please select a section to view its members.</p>;
  }

  if (loading) {
    return <Loading width='90%' height='300px' color='#eee' borderRadius='8px' />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h2 className='text-xl font-semibold text-violet-900'>Chief Scout Award Summary for {selectedSection.sectionname}</h2>
      <table className="table-auto w-full text-center max-w-fit">
        <thead>
          <tr className="px-2 py-2">
            <th className="sticky top-0 border border-gray-300 px-1 py-1 bg-white">Badge</th>
            <th className="sticky top-0 border border-gray-300 px-1 py-1 bg-white">Section</th>
            <th className="sticky top-0 border border-gray-300 px-1 py-1 bg-white">Requirement</th>
            {localMembers!.map((member) => (
              <th className="sticky top-0 transform -rotate-90 whitespace-nowrap px-0 py-0 border border-gray-300 align-bottom text-left bg-white" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }} key={member.scout_id}>
                <Link href={`/member/${member.scout_id}`}>{member.firstname} {member.lastname}</Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {localBadgeStructure!.map((badge) => {
            const sectionsGrouped = groupFieldsBySection(badge.fields);
            // TODO: Load the badge progress

            return (
              <React.Fragment key={badge.badgeId}>
                {Object.entries(sectionsGrouped).map(([section, fields], sectionIndex) => (
                  <React.Fragment key={`${badge.badgeId}-${section}`}>
                    {fields.map((field, fieldIndex) => (
                      <tr key={`${badge.badgeId}-${section}-${field.field}`} className="odd:bg-gray-100 even:bg-gray-200">
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

                        <td className="border border-gray-300 px-4 py-2" title={field.tooltip}>
                          {field.name}
                        </td>
                        {localMembers!.map(member => (
                          <td className="border border-gray-300 px-1 py-1 text-3xl" key={`${badge.badgeId}-${section}-${field.field}-${member.scout_id}`}>
                            {progressDisplay(field.field, badge.badgeId, member.scoutid.toString())}
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
      </table>
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