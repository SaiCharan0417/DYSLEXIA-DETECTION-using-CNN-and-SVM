import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body flex">
      <Sidebar />
      <div className="pl-64 flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="relative pt-16 flex-1 w-full bg-background px-6 lg:px-8 py-8 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}