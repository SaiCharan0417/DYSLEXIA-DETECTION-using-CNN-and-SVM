import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Search, Bell, Settings, CloudUpload, HalfMoon, SunLight, Menu, Check, CheckCircle, WarningTriangle, NavArrowRight } from 'iconoir-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

export function Header({ isScrolled = false, onOpenCommandPalette, onToggleMobileSidebar }) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const easeOut = [0.23, 1, 0.32, 1];

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const popoverRef = useRef(null);

  const notifications = [
    { id: 1, title: 'Inference Completed', desc: 'Specimen #NW-84920 classified with 97.2% confidence.', time: '2m ago', type: 'reversal', read: false },
    { id: 2, title: 'Model Checkpoint Synced', desc: 'neuro-resnet34-svm-v2.4.2 validated on 1,420 specimens.', time: '1h ago', type: 'info', read: false },
    { id: 3, title: 'Cohort Data Synced', desc: '18 archival specimens encrypted & backed up to HIPAA vault.', time: '3h ago', type: 'success', read: false },
  ];

  // Close popover on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
    }
    if (notificationsOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [notificationsOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 lg:left-64 right-0 h-16 z-40 flex items-center justify-between px-4 sm:px-8 bg-surface-container-lowest border-b transition-shadow duration-200 ease-out font-body",
        isScrolled
          ? "border-outline-variant/40 shadow-md"
          : "border-outline-variant/20 shadow-none"
      )}
    >
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Drawer Toggle */}
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
          title="Open Navigation"
        >
          <Menu size={20} />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <span className="text-sm text-on-surface-variant font-medium">Screening Lab</span>
          <span className="text-sm text-outline-variant">/</span>
          <span className="text-sm font-semibold text-on-surface">Active Session</span>
        </div>
      </div>

      {/* Global Command / Search Trigger */}
      <div className="flex-1 max-w-md mx-4 sm:mx-8">
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="relative flex items-center w-full h-10 pl-9 pr-3 rounded-lg text-sm text-on-surface-variant bg-surface border border-outline-variant/25 hover:border-outline-variant hover:bg-surface-container-low focus:outline-none transition-all cursor-pointer text-left shadow-xs"
        >
          <Search className="absolute left-3 text-on-surface-variant" size={17} />
          <span className="truncate">Search specimens, cohorts, or type a command...</span>
          <kbd className="hidden sm:inline-block ml-auto px-1.5 py-0.5 rounded bg-surface-container text-[10px] font-mono text-on-surface font-semibold border border-outline-variant/20">
            ⌘K
          </kbd>
        </button>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Dark/Light Mode Switcher */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
        >
          {theme === 'dark' ? <SunLight size={19} className="text-amber-400" /> : <HalfMoon size={19} />}
        </button>

        {/* Confidence Tier Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface text-sm border border-outline-variant/15">
          <Settings className="text-secondary" size={15} />
          <span className="font-mono text-xs font-semibold">Confidence: 97.2%</span>
        </div>

        {/* Quick Upload Action */}
        <Button
          variant="accent"
          size="sm"
          icon={CloudUpload}
          onClick={() => navigate('/upload')}
          className="hidden sm:inline-flex cursor-pointer text-xs"
        >
          Quick Ingest
        </Button>

        {/* Notification Bell with Dropdown */}
        <div className="relative" ref={popoverRef}>
          <button
            onClick={() => setNotificationsOpen(prev => !prev)}
            title="Clinical Notifications & Pipeline Alerts"
            className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-2 ring-surface-container-lowest animate-pulse"></span>
            )}
          </button>

          <AnimatePresence>
            {notificationsOpen && (
              <>
                {/* Backdrop Click Catcher */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setNotificationsOpen(false)}
                />

                <motion.div
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, transform: "scale(0.96) translateY(-6px)" }}
                  animate={{ opacity: 1, transform: "scale(1) translateY(0px)" }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, transform: "scale(0.96) translateY(-6px)" }}
                  transition={{ duration: 0.15, ease: easeOut }}
                  style={{ transformOrigin: 'top right' }}
                  className="absolute top-14 right-0 w-80 sm:w-96 max-w-[calc(100vw-2rem)] rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-2xl overflow-hidden font-body text-on-surface z-50"
                >
                  <div className="p-4 border-b border-outline-variant/20 bg-surface-container-low flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-on-surface">Screening Alerts</span>
                      {unreadCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-mono font-bold">
                          {unreadCount} New
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={() => setUnreadCount(0)}
                        className="text-xs text-secondary hover:underline font-semibold cursor-pointer"
                      >
                        Mark read
                      </button>
                    )}
                  </div>

                  <div className="divide-y divide-outline-variant/10 max-h-72 overflow-y-auto">
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => {
                          setNotificationsOpen(false);
                          navigate('/result');
                        }}
                        className="p-3.5 hover:bg-surface-container-low transition-colors cursor-pointer flex items-start gap-3"
                      >
                        <div className="p-1.5 rounded-lg bg-surface-container text-secondary shrink-0 mt-0.5">
                          {n.type === 'reversal' && <WarningTriangle size={16} className="text-error" />}
                          {n.type === 'info' && <Settings size={16} className="text-secondary" />}
                          {n.type === 'success' && <CheckCircle size={16} className="text-secondary" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-xs font-bold text-on-surface">{n.title}</span>
                            <span className="text-[10px] font-mono text-on-surface-variant">{n.time}</span>
                          </div>
                          <p className="text-xs text-on-surface-variant leading-relaxed truncate">{n.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-2.5 bg-surface-container-low border-t border-outline-variant/20 text-center">
                    <button
                      onClick={() => {
                        setNotificationsOpen(false);
                        navigate('/history');
                      }}
                      className="text-xs font-semibold text-secondary hover:underline cursor-pointer"
                    >
                      View All Archival Logs →
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
