import React from 'react';
import { Outlet } from '@remix-run/react';
import NavBar from '~/components/NavBar';
import Sidebar from '~/components/Sidebar';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

