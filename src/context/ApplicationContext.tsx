'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Section } from '../models/Section'; // Import Section model

interface ApplicationContextType {
  sections: Section[]; // Array of Section objects
  setSections: (sections: Section[]) => void; // Setter for sections
  selectedSection: Section | null; // Currently selected section
  setSelectedSection: (section: Section | null) => void; // Setter for selected section
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSection, setSelectedSectionState] = useState<Section | null>(null);

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

  return (
    <ApplicationContext.Provider value={{ sections, setSections, selectedSection, setSelectedSection }}>
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