'use client';

import React from 'react';
import { Badge } from '@/models/osm';
import Image from 'next/image';

interface BadgeGroupProps {
  badges: Badge[];
  title: string;
}

const BadgeGroup: React.FC<BadgeGroupProps> = ({ badges, title }) => {
  console.log(`Badges: ${title}`);
  console.log(badges);

  return (
    <div className='rounded-md background-blue-900'>
      <h2 className='text-l font-semibold text-violet-900 pb-4'>{title}</h2>
      <ul className='flex flex-wrap'>
        {badges.filter(b => b.badge_group != '4').map((badge: Badge) => (
          <li key={badge.badge_identifier} className='p-2 pr-4 mr-2 mb-2 bg-gray-100 shadow rounded-full'><Image className='inline-flex px-1' src={`https://www.onlinescoutmanager.co.uk/${badge.picture}`} alt={badge.badge} width={32} height={32} title={`${Math.round(badge.status * 100)}%`} ></Image>{badge.badge} {badge.level} </li>

        ))}
      </ul>
    </div>
  );
};

export default BadgeGroup;