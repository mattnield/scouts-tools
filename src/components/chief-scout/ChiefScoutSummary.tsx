'use client';

import React, { useEffect, useState } from 'react';
import { useApplicationContext } from '@/context/ApplicationContext';
import Image from 'next/image';
import Loading from '../Loading';
import Link from 'next/link';
import { Badge, BadgeStructure, Member } from '@/models/osm';

const ChiefScoutSummary: React.FC = () => {
  const { selectedSection, getMembers, getBadgeStructure } = useApplicationContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [localMembers, setLocalMembers] = useState<Member[] | null>(null);
  const [localBadgeStructure, setLocalBadgeStructure] = useState<BadgeStructure[] | null>(null);

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
      } catch (err) {
        console.error('Error loading chief scouts summary: ', err);
        setError('Failed to load Chief Scouts Summary. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedSection, getMembers, getBadgeStructure]);

  if (loading) {
    return <Loading width='90%' height='300px' color='#eee' borderRadius='8px' />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h2 className='text-xl font-semibold text-violet-900'>Chief Scout Award Summary for {selectedSection!.sectionname}</h2>
      <table className="table-auto w-full text-center max-w-fit bg-white">
        <thead>
          <tr className="px-2 py-2">
            <th className="sticky top-0 px-1 py-1 bg-white"></th>
            {localBadgeStructure!.map((badge) => (
              <th className="sticky top-0 px-1 py-1 text-center bg-white" key={badge.badgeId}>
                <Image src={`https://www.onlinescoutmanager.co.uk/${badge.details.picture}`} alt={badge.details.name} width={48} height={48} title={badge.details.name} ></Image>
              </th>
            ))}
          </tr>
          {localMembers!.map((member) => (
            <tr key={member.scout_id} className="odd:bg-gray-100 even:bg-gray-200">
              <td className="px-1 py-1 text-left text-violet-600"><Link href={`/member/${member.scout_id}`}>{member.firstname} {member.lastname}</Link></td>
              {localBadgeStructure!.map((badge, index) => {
                const completed = member.badges.find((b: Badge) => b.badge_id === badge!.badgeId)?.completed;
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