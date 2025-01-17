'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface ApplicationContextType {
  sections: string[];
  setSections: (sections: string[]) => void;
  selectedSection: string | null;
  setSelectedSection: (section: string | null) => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sections, setSections] = useState<string[]>([]);
  const [selectedSection, setSelectedSectionState] = useState<string | null>(null);

  // Load selected section only on the client
  useEffect(() => {
    const savedSection = Cookies.get('selectedSection');
    setSelectedSectionState(savedSection || null);
  }, []);

  // Save selected section to cookies
  const setSelectedSection = (section: string | null) => {
    setSelectedSectionState(section);
    if (section) {
      Cookies.set('selectedSection', section, { expires: 7 });
    } else {
      Cookies.remove('selectedSection');
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