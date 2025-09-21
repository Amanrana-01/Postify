"use client";

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ErrorBoundary from './ErrorBoundary';

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default ClientWrapper;
