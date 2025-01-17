'use client';

import React from 'react';
import { useApplicationContext } from '../context/ApplicationContext';

export default function HomePage() {
  const { selectedSection } = useApplicationContext();

  if (!selectedSection) {
    return <p className="text-gray-500">No section selected. Please choose one from the dropdown above.</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-indigo-600">{selectedSection.sectionname}</h2>
      <p>
        <strong>Group Name:</strong> {selectedSection.groupname}
      </p>
      <p>
        <strong>Section Type:</strong> {selectedSection.section}
      </p>
      {selectedSection.latestTerm ? (
        <div>
          <h3 className="text-lg font-medium text-gray-700">Latest Term:</h3>
          <ul className="list-disc pl-5">
            <li>
              <strong>Name:</strong> {selectedSection.latestTerm.name}
            </li>
            <li>
              <strong>Start Date:</strong> {selectedSection.latestTerm.startdate}
            </li>
            <li>
              <strong>End Date:</strong> {selectedSection.latestTerm.enddate}
            </li>
          </ul>
        </div>
      ) : (
        <p className="text-gray-500">No terms available for this section.</p>
      )}
    </div>
  );
}