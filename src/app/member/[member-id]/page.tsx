'use client';
import { useParams } from 'next/navigation';
import { useApplicationContext } from '@/context/ApplicationContext';
import { Member } from '@/models/osm';
import { useEffect, useState } from 'react';

const MemberPage = () => {
  const params = useParams();
  const memberId = params['member-id']; // Access the dynamic route parameter
  const { getMembers, selectedSection } = useApplicationContext();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const fetchedMembers = await getMembers();
        setMembers(fetchedMembers);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to load members.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [getMembers]);

  // Get member details (all?)
  const member = members.find((m: Member) => m.scoutid === Number(memberId))

  console.log(`Membed Section ID: ${member?.sectionid}\nSelected Section ID: ${selectedSection?.sectionid}`)
  if (member?.sectionid != selectedSection?.sectionid) {
    return <p>This member is not in the currently selected section.</p>
  }

  if (loading) {
    return <p>Loading members...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Get patrol details

  return (
    <div className="space-y-4">
      <h1 className='text-xl font-semibold text-violet-900'>{member?.firstname} {member?.lastname}</h1>
      <p>Patrol: {member?.patrol}</p>
      <p>Age: {member?.age}</p>
      <p>Secions: {member?.sectionid}</p>
    </div>
  );
};

export default MemberPage;