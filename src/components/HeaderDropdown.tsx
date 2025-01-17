'use client';

import React, { useEffect, useState } from 'react';
import { useApplicationContext } from '../context/ApplicationContext';

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
        const data = await response.json();
        setSections(data); // Update sections in the global context
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (sections.length === 0) {
      fetchSections();
    }
  }, [sections, setSections]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSection(event.target.value); // Persist selection in context and cookies
  };

  if (loading) {
    return <p>Loading sections...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div>
      <label htmlFor="sectionDropdown">Choose a section:</label>
      <select
        id="sectionDropdown"
        value={selectedSection || ''}
        onChange={handleChange}
        style={{ marginLeft: '8px', padding: '4px' }}
      >
        {sections.map((section, index) => (
          <option key={index} value={section}>
            {section}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HeaderDropdown;