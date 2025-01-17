/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import { useApplicationContext } from '../context/ApplicationContext';
import { Section } from '../models/Section'; // Import the model

const HeaderDropdown: React.FC = () => {
  const { sections, setSections, selectedSection, setSelectedSection } = useApplicationContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSections() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/osm/sections');
        if (!response.ok) {
          throw new Error(`Failed to fetch sections: ${response.statusText}`);
        }
        const data: Section[] = await response.json(); // Ensure API returns Section[]
        setSections(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    // Fetch sections only if not already loaded
    if (sections.length === 0) {
      fetchSections();
    }
  }, [sections, setSections]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selected = sections.find((section) => section.sectionid === selectedId);
    setSelectedSection(selected || null); // Update the context with the selected Section object
  };

  if (loading) {
    return <p className="text-gray-500">Loading sections...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="flex items-center space-x-2">
      <select
        id="sectionDropdown"
        value={selectedSection?.sectionid || ''}
        onChange={handleChange}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {sections.map((section, index) => (
          <option key={section.sectionid || index} value={section.sectionid}>
            {section.sectionname}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HeaderDropdown;