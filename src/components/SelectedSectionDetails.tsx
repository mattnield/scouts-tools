'use client';

import React from 'react';
import { Section } from '../models/osm';
import Image from 'next/image';

interface SelectedSectionDetailsProps {
  section: Section;
}

const SelectedSectionDetails: React.FC<SelectedSectionDetailsProps> = ({ section }) => {

  const allowedSections = ['squirrels', 'beavers', 'cubs', 'scouts', 'explorers', 'network'];
  const sectionLogoName = allowedSections.includes(section.section) ? section.section : 'tsa';
  const imageUrl = `/images/sections/${sectionLogoName}-logo.png`;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-indigo-600">{section.sectionname} ({section.groupname})</h2>
      <Image src={imageUrl} alt={section.section} width={0} height={0} sizes="100vw" style={{ width: '5rem', height: 'auto' }} />
      {section.latestTerm ? (
        <p><strong>Current Term: </strong>{section.latestTerm.name}</p>
      ) : (
        <p className="text-gray-500">No terms available for this section.</p>
      )}
    </div>
  );
};

export default SelectedSectionDetails;