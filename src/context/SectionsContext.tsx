'use client';

import React, { createContext, useContext, useState} from 'react';

interface SectionsContextType {
    sections: string[];
    selectedSection: string;
    setSections: (sections: string[]) => void;
    setSelectedSection: (section: string) => void;
}

// Create the context
const SectionsContext = createContext<SectionsContextType | undefined>(undefined);

// Provide the context to the application
export const SectionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sections, setSections] = useState<string[]>([]);
    const [selectedSection, setSelectedSection] = useState<string>('');

    return (
        <SectionsContext.Provider
            value={{ sections, selectedSection, setSections, setSelectedSection }}
        >
            {children}
        </SectionsContext.Provider>
    );
};

// Custom hook to use the context
export const useSections = () => {
    const context = useContext(SectionsContext);
    if (!context) {
        throw new Error('useSections must be used within a SectionsProvider');
    }
    return context;
};