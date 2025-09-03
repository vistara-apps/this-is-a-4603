import React from 'react';
import NavBar from './NavBar';
import Sidebar from './Sidebar';

export default function Layout({ children, currentView, setCurrentView }) {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="flex">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

