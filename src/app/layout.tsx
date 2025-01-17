'use client';

import React from 'react';
import { ApplicationContextProvider } from '../context/ApplicationContext';
import HeaderDropdown from '../components/HeaderDropdown';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <ApplicationContextProvider>
          {/* Shared Header */}
          <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-indigo-600">Scouts Tools</h1>
              <HeaderDropdown />
            </div>
          </header>

          {/* Page-Specific Content */}
          <main className="container mx-auto px-4 py-8">{children}</main>
        </ApplicationContextProvider>
      </body>
    </html>
  );
}