'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Member, Section } from '@/models/osm'; // Import Section model
import { GetBadgesByMember } from '@/utils/apiWrapper';

interface ApplicationContextType {
  sections: Section[]; // Array of Section objects
  setSections: (sections: Section[]) => void; // Setter for sections
  selectedSection: Section | null; // Currently selected section
  setSelectedSection: (section: Section | null) => void; // Setter for selected section
  getMembers: () => Promise<Member[]>; // Fetch or
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSection, setSelectedSectionState] = useState<Section | null>(null);
  const [members, setMembers] = useState<Member[]>();

  // Load selected section from cookies on mount
  useEffect(() => {
    const savedSectionId = Cookies.get('selectedSectionId');
    if (savedSectionId && sections.length > 0) {
      const savedSection = sections.find((section) => section.sectionid === savedSectionId);
      setSelectedSectionState(savedSection || null);
    }
  }, [sections]);

  // Save selected section to cookies whenever it changes
  const setSelectedSection = (section: Section | null) => {
    setSelectedSectionState(section);
    if (section) {
      Cookies.set('selectedSectionId', section.sectionid, { expires: 7 });
    } else {
      Cookies.remove('selectedSectionId');
    }
  };

  const getMembers = async (): Promise<Member[]> => {
    if (members) {
      return members; // Return cached members
    }

    if (!selectedSection) {
      throw new Error('No section selected');
    }

    try {
      const fetchedMembers = await GetBadgesByMember(selectedSection);
      setMembers(fetchedMembers); // Cache the fetched members
      if (members)
        return members;
      else
        return [];
    } catch (error) {
      console.error('Failed to fetch members:', error);
      throw error; // Pass error back to the caller
    }
  };

  return (
    <ApplicationContext.Provider value={{ sections, setSections, selectedSection, setSelectedSection, getMembers }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplicationContext must be used within an ApplicationContextProvider');
  }
  return context;
};