import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { ViewGrid, PageUp, ClockRotateRight, Page, Settings, ShieldAlert } from 'iconoir-react';

export function Sidebar() {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: ViewGrid },
    { name: 'New Analysis', path: '/upload', icon: PageUp },
    { name: 'Analysis History', path: '/history', icon: ClockRotateRight },
    { name: 'Reports', path: '/report', icon: Page },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-container-lowest shadow-sm z-50 flex flex-col justify-between border-r border-outline-variant/20">
      <div className="flex flex-col flex-1 overflow-y-auto px-4 py-5">
        <div className="flex items-center gap-3 px-2 mb-4">
          <div className="w-8 h-8 bg-primary text-on-primary rounded flex items-center justify-center font-bold">N</div>
          <div className="flex flex-col min-w-0">
            <span className="text-lg font-semibold tracking-tight text-on-surface truncate leading-tight">NeuroWrite AI</span>
            <span className="text-xs text-on-surface-variant truncate">Screening & Research</span>
          </div>
        </div>

        <div className="mb-6 px-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-container text-on-surface text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span>CNN + SVM v2.4 Active</span>
          </div>
        </div>

        <div className="px-2 mb-2">
          <span className="text-[10px] uppercase tracking-wider text-outline font-semibold">Clinical Workbench</span>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-primary text-on-primary font-medium"
                  : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
              )}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-outline-variant/10">
        <div className="p-3 rounded-lg bg-surface-container-low shadow-sm">
          <div className="flex items-center gap-1.5 mb-1.5 text-secondary">
            <ShieldAlert size={16} />
            <span className="text-xs font-semibold">Screening Protocol</span>
          </div>
          <p className="text-[11px] text-on-surface-variant leading-relaxed">
            Research screening tool for handwriting studies; not a medical diagnostic device.
          </p>
        </div>
      </div>
    </aside>
  );
}