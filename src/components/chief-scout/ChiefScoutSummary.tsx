'use client';

import React, { useEffect, useState } from 'react';
import { GetBadgesByMember, GetBadgesByType } from '@/utils/apiWrapper';
import { useApplicationContext } from '@/context/ApplicationContext';
import { BadgeStructure, BadgeType, Member, Section } from '@/models/osm';
import Image from 'next/image';
import Loading from '../Loading';
import Link from 'next/link';

const ChiefScoutSummary: React.FC = () => {
  const { selectedSection } = useApplicationContext();
  const [members, setMembers] = useState<Member[]>([]);
  const [badgeStructure, setBadgeStructure] = useState<BadgeStructure[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedSection) {
      return;
    }

    const fetchMembers = async (section: Section) => {
      setLoading(true);
      setError(null);

      try {
        const fetchedMembers = await GetBadgesByMember(section);
        setMembers(fetchedMembers!);
        const fetchedBadgeStructure = await GetBadgesByType(selectedSection, BadgeType.Challenge);
        console.log(`Found ${fetchedBadgeStructure?.length} badges`);
        const sortedBadges = fetchedBadgeStructure!.sort((a, b) => { if ((a.details.badge_order || 1) < (b.details.badge_order || 1)) { return -1; } else { return 1; } return 0; });
        setBadgeStructure(sortedBadges);
      } catch (err) {
        console.error('Error fetching members:', err);
        setError('Failed to load members. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers(selectedSection);
  }, [selectedSection]);

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
            <th className="sticky top-0 px-1 py-1 bg-inherit"></th>
            {badgeStructure.map((badge) => (
              <th className="sticky top-0 px-1 py-1 text-center bg-inherit" key={badge.badgeId}>
                <Image src={`https://www.onlinescoutmanager.co.uk/${badge.details.picture}`} alt={badge.details.name} width={48} height={48} title={badge.details.name} ></Image>
              </th>
            ))}
          </tr>
          {members.map((member) => (
            <tr key={member.scout_id} className="odd:bg-gray-100 even:bg-gray-200">
              <td className="px-1 py-1 text-left"><Link href={`/member/${member.scout_id}`}>{member.firstname} {member.lastname}</Link></td>
              {badgeStructure.map((badge, index) => {
                const completed = member.badges.find(b => b.badge_id === badge!.badgeId)?.completed;
                return (
                  <td key={index} className="px-1 py-1 text-3xl" title={completed === '1' ? 'Complete' : completed === '0' ? 'Started' : 'Not Started'}>
                    {completed === '1' ? '●' : completed === '0' ? '○' : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </thead>
      </table>
    </div>
  );
};

export default ChiefScoutSummary;