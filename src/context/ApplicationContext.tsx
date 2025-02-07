'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { BadgeStructure, Member, MemberBadgeProgress, Section } from '@/models/osm'; // Import Section model
import { GetBadges, GetBadgesByMember } from '@/utils/apiWrapper';

interface ApplicationContextType {
  sections: Section[]; // Array of Section objects
  setSections: (sections: Section[]) => void; // Setter for sections
  selectedSection: Section | null; // Currently selected section
  setSelectedSection: (section: Section | null) => void; // Setter for selected section
  badgeProgress: Record<string, MemberBadgeProgress[]> | null;
  getBadgeProgress: () => Promise<Record<string, MemberBadgeProgress[]> | null>;
  badgeStructure: BadgeStructure[] | null;
  getBadgeStructure: () => Promise<BadgeStructure[] | null>;
  members: Member[] | null;
  getMembers: () => Promise<Member[]>; // Fetch all members in section
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSection, setSelectedSectionState] = useState<Section | null>(null);
  const [members, setMembers] = useState<Member[] | null>(null);
  const [badgeStructure, setBadgeStructure] = useState<BadgeStructure[]>([]);
  const [badgeProgress, setBadgeProgress] = useState<Record<string, MemberBadgeProgress[]> | null>(null);

  // Load selected section from cookies on mount
  useEffect(() => {
    const savedSectionId = Cookies.get('selectedSectionId');
    if (savedSectionId && sections.length > 0) {
      const savedSection = sections.find((section) => section.sectionid === savedSectionId);
      setSelectedSectionState(savedSection || null);
    }
  }, [sections]);

  // Clear section-specific data when section changes
  useEffect(() => {
    setMembers(null);
    setBadgeStructure([]);
    setBadgeProgress(null);
  }, [selectedSection]);

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
    if (members) return members;
    if (!selectedSection) throw new Error('No section selected');

    try {
      setMembers(await GetBadgesByMember(selectedSection)); // Cache the fetched members
      if (members)
        return members;
      else
        return [];
    } catch (error) {
      console.error('Failed to fetch members:', error);
      throw error; // Pass error back to the caller
    }


  };

  const getBadgeStructure = async (): Promise<BadgeStructure[]> => {
    if (badgeStructure.length > 0) return badgeStructure;
    if (!selectedSection) throw new Error('No section selected');

    try {
      setBadgeStructure(await GetBadges(selectedSection));
      if (badgeStructure)
        return badgeStructure;
      else
        return [];
    } catch (error) {
      console.error('Failed to fetch badge structure:', error);
      throw error; // Pass error back to the caller
    }
  };

  const getBadgeProgress = async (): Promise<Record<string, MemberBadgeProgress[]> | null> => {
    if (badgeProgress) { return badgeProgress; }
    if (!badgeStructure) throw new Error('No badge structure loaded');
    if (!selectedSection) throw new Error('No section selectedSection');

    return null;

    // try {
    //   const progressData: Record<string, MemberBadgeProgress[]> = {};
    //   for (const badge of badgeStructure!) {
    //     const progress = await GetBadgeProgress(selectedSection!, badge);
    //     progressData[badge.badgeId] = progress!;
    //   }
    //   setBadgeProgress(progressData);
    //   if (badgeProgress) return badgeProgress;
    //   else return null;
    // } catch (error) {
    //   console.error('Failed to load badge progress:', error);
    //   throw error;
    // }
  };

  return (
    <ApplicationContext.Provider value={{
      sections,
      setSections,
      selectedSection,
      setSelectedSection,
      members,
      getMembers,
      badgeStructure,
      getBadgeStructure,
      badgeProgress,
      getBadgeProgress
    }}>
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