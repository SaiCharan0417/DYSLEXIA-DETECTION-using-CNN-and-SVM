import React from 'react';
import { Search, Bell, Settings, CloudUpload } from 'iconoir-react';
import { Button } from '../ui/Button';

export function Header() {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-sm z-40 flex items-center justify-between px-8">
      <div className="flex items-center gap-2">
        <span className="text-sm text-on-surface-variant">Screening Lab</span>
        <span className="text-sm text-outline">/</span>
        <span className="text-sm font-medium text-on-surface">Active Session</span>
      </div>

      <div className="flex-1 max-w-md mx-8">
        <div className="relative flex items-center w-full">
          <Search className="absolute left-3 text-outline" size={18} />
          <input
            type="text"
            placeholder="Search by participant ID, batch, or session... [⌘K]"
            className="w-full h-10 pl-9 pr-4 rounded-lg bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-low transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface text-sm">
          <Settings className="text-secondary" size={16} />
          <span className="font-mono text-xs">Confidence: 85%</span>
        </div>

        <Button variant="accent" size="sm" icon={CloudUpload}>Quick Upload</Button>

        <button className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error"></span>
        </button>

        <div className="flex items-center gap-3 pl-2 border-l border-outline-variant/30 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-sm">EV</div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-sm font-medium leading-none">Dr. Elena Vance</span>
            <span className="text-xs text-on-surface-variant mt-0.5">Principal Researcher</span>
          </div>
        </div>
      </div>
    </header>
  );
}