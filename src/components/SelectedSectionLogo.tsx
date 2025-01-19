'use client';

import React from 'react';
import { Section } from '../models/Section';
import Image from 'next/image';

interface SelectedSectionLogoProps {
  section: Section;
}

const SelectedSectionLogo: React.FC<SelectedSectionLogoProps> = ({ section }) => {

  const allowedSections = ['squirrels', 'beavers', 'cubs', 'scouts', 'explorers', 'network'];
  const sectionLogoName = allowedSections.includes(section.section) ? section.section : 'tsa';
  const imageUrl = `/images/sections/${sectionLogoName}-logo.png`;

  return (
    <Image src={imageUrl} alt={section.section} width={0} height={0} sizes="100vw" style={{ width: '5rem', height: 'auto' }} />);
};

export default SelectedSectionLogo;