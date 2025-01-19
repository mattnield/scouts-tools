'use client';

import React, { useEffect, useState } from 'react';
import { GetBadgesByMember, GetBadgesByType } from '@/utils/apiWrapper';
import { useApplicationContext } from '@/context/ApplicationContext';
import { BadgeStructure, BadgeType, Member, Section } from '@/models/osm';
import Image from 'next/image';

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
    return <p>Loading members...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <table className="table-auto border-collapse border border-gray-300 w-full text-center">
        <thead>
          <tr className="border border-gray-300 px-2 py-2">
            <td className="border border-gray-300 px-2 py-2"></td>
            {badgeStructure.map((badge) => (
              <td className="border border-gray-300 px-2 py-2 text-center" key={badge.badgeId}><Image src={`https://www.onlinescoutmanager.co.uk/${badge.details.picture}`} alt={badge.details.name} width={32} height={32} title={badge.details.name} ></Image></td>
            ))}
          </tr>
          {members.map((member) => (
            <tr key={member.scout_id} className="odd:bg-gray-100 even:bg-gray-200">
              <td className="border border-gray-300 px-2 py-2">{member.firstname} {member.lastname}</td>
              {badgeStructure.map((badge, index) => {
                const completed = member.badges.find(b => b.badge_id === badge!.badgeId)?.completed;
                return (
                  <td key={index} className="border border-gray-300 px-2 py-2" title={completed === '1' ? 'Complete' : completed === '0' ? 'Started' : 'Not Started'}>
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