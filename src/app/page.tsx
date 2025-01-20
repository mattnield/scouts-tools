'use client';

import React from 'react';
import { useApplicationContext } from '../context/ApplicationContext';
import ChiefScoutSummary from '@/components/chief-scout/ChiefScoutSummary';

export default function HomePage() {
  const { selectedSection } = useApplicationContext();

  if (!selectedSection) {
    return <p className="text-gray-500">No section selected. Please choose one from the dropdown above.</p>;
  }

  return (
    <div className="space-y-4">
      <ChiefScoutSummary />
    </div>
  );
}