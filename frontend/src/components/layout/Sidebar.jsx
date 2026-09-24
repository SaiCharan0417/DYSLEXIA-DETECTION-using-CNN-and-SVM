import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../utils/cn';
import { ViewGrid, PageUp, ClockRotateRight, Page, Settings, LogOut, Xmark } from 'iconoir-react';
import { useAuth } from '../../context/AuthContext';

export function Sidebar({ isMobileOpen = false, onCloseMobile }) {
  const shouldReduceMotion = useReducedMotion();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onCloseMobile) onCloseMobile();
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: ViewGrid },
    { name: 'New Analysis', path: '/upload', icon: PageUp },
    { name: 'Analysis History', path: '/history', icon: ClockRotateRight },
    { name: 'Reports', path: '/report', icon: Page },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 lg:hidden animate-in fade-in duration-150"
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-64 bg-surface-container-lowest shadow-lg lg:shadow-sm z-50 flex flex-col justify-between border-r border-outline-variant/30 font-body transition-transform duration-200 ease-out",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col flex-1 overflow-y-auto px-4 py-5">
          <div className="flex items-center justify-between px-2 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary text-on-primary rounded-lg flex items-center justify-center font-bold text-sm shadow-sm">N</div>
              <div className="flex flex-col min-w-0">
                <span className="text-lg font-semibold tracking-tight text-on-surface truncate leading-tight">NeuroWrite AI</span>
                <span className="text-xs text-on-surface-variant truncate">Screening & Research</span>
              </div>
            </div>
            {/* Close Button on Mobile Drawer */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
            >
              <Xmark size={18} />
            </button>
          </div>

          <div className="mb-6 px-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-container text-on-surface text-xs font-mono border border-outline-variant/20">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="font-semibold">CNN + SVM v2.4 Active</span>
            </div>
          </div>

          <div className="px-2 mb-2">
            <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">Clinical Workbench</span>
          </div>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                className={({ isActive }) => cn(
                  "relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-150",
                  isActive
                    ? "text-on-primary font-semibold"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                )}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="activeSidebarNav"
                        className="absolute inset-0 bg-primary rounded-lg -z-10 shadow-sm"
                        transition={shouldReduceMotion ? { duration: 0 } : {
                          type: "spring",
                          stiffness: 380,
                          damping: 32
                        }}
                      />
                    )}
                    <item.icon size={18} className="relative z-10" />
                    <span className="relative z-10">{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User Profile Footer Strip with Settings and Logout */}
        <div className="p-3 border-t border-outline-variant/20 flex items-center gap-1.5">
          <NavLink
            to="/settings"
            onClick={onCloseMobile}
            className={({ isActive }) => cn(
              "relative flex-1 flex items-center justify-between p-2 rounded-xl transition-all duration-200 group cursor-pointer border min-w-0",
              isActive
                ? "bg-surface-container-high border-secondary/40 text-on-surface shadow-sm ring-1 ring-secondary/30"
                : "hover:bg-surface-container-low text-on-surface-variant hover:text-on-surface border-transparent"
            )}
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all shadow-sm shrink-0",
                    isActive
                      ? "bg-primary text-on-primary ring-2 ring-secondary"
                      : "bg-surface-container text-on-surface border border-outline-variant/30"
                  )}>
                    {user?.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'EV'}
                  </div>
                  <div className="flex flex-col min-w-0 text-left">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-on-surface truncate">{user?.name || 'Dr. Elena Vance'}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 animate-pulse" />
                      )}
                    </div>
                    <span className="text-[10px] text-on-surface-variant font-medium truncate">Account & Settings</span>
                  </div>
                </div>
                <div className={cn(
                  "p-1 rounded-md transition-colors shrink-0",
                  isActive ? "text-secondary bg-surface-container-lowest shadow-xs" : "text-outline group-hover:text-on-surface"
                )}>
                  <Settings size={15} />
                </div>
              </>
            )}
          </NavLink>

          {/* Dedicated Logout Action */}
          <button
            onClick={handleLogout}
            title="Sign Out of Workstation"
            className="p-2 rounded-xl text-on-surface-variant hover:text-error hover:bg-error-container/20 transition-all border border-transparent hover:border-error/20 cursor-pointer shrink-0"
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>
    </>
  );
}
