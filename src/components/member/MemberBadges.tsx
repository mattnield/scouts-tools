'use client';

import React, { useEffect } from 'react';
import { Badge, Member } from '@/models/osm';
import BadgeGroup from './BadgeGroup';

interface MemberBadgesProps {
  member: Member;
}

const MemberBadges: React.FC<MemberBadgesProps> = ({ member }) => {
  console.log('Member Badges');
  console.log(member.badges);

  const inProgressBadges = member.badges.filter(b => Number(b.completed) == 0 || Number(b.completed) < Number(b.awarded));
  const completeBadges = member.badges.filter(b => Number(b.completed) || Number(b.awarded) > 0);

  useEffect(() => {
    const init = async () => {
      const { Tooltip, initTWE } = await import("tw-elements");
      initTWE({ Tooltip });
    };
    init();
  }, []);


  if (!member) {
    return <p>PUnable to diaply this memebr.</p>;
  }

  return (
    <div className='grid grid-cols-2 gap-4'>
      <BadgeGroup title='In Progress' badges={inProgressBadges} />

      <BadgeGroup title='Complete' badges={completeBadges} />
    </div>
  );
};

export default MemberBadges;