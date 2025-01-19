'use client';

import React, { useEffect, useState } from 'react';
import { GetBadgesByMember } from '@/utils/apiWrapper';
import { useApplicationContext } from '@/context/ApplicationContext';
import { Member } from '@/models/Member';
import { Section } from '@/models/Section';

const ChiefScoutSummary: React.FC = () => {
  const { selectedSection } = useApplicationContext();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log('Chief Scout Summary');

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

  console.log(members);

  return (
    <div>
      <h2 className="text-xl font-semibold">Members of {selectedSection.sectionname}</h2>
      <p>{selectedSection.sectionname}</p>
      <ul className="list-disc pl-5">
        {members.map((member) => (
          <li key={member.scout_id}>
            {member.firstname} {member.lastname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChiefScoutSummary;