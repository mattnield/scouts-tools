'use client';

import React from 'react';
import BadgeGroup from './BadgeGroup';
import { Member } from '@/models/osm';

interface MemberBadgesProps {
  member: Member;
}

const MemberBadges: React.FC<MemberBadgesProps> = ({ member }) => {

  const inProgressBadges = member.badges.filter(b => Number(b.completed) == 0 || Number(b.completed) < Number(b.awarded));
  const completeBadges = member.badges.filter(b => Number(b.completed) || Number(b.awarded) > 0);

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