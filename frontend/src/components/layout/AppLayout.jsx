import React, { useState, useEffect } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { CommandPalette } from '../domain/CommandPalette';

export default function AppLayout() {
  const location = useLocation();
  const outlet = useOutlet();
  const shouldReduceMotion = useReducedMotion();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const easeOut = [0.23, 1, 0.32, 1];

  // Cmd+K / Ctrl+K keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleScroll = (e) => {
    const top = e.currentTarget.scrollTop;
    if (top > 12 && !isScrolled) {
      setIsScrolled(true);
    } else if (top <= 12 && isScrolled) {
      setIsScrolled(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body flex">
      {/* Sidebar with Mobile Drawer capability */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-h-screen w-full lg:pl-64">
        {/* Header with hamburger and Command trigger */}
        <Header
          isScrolled={isScrolled}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
        />

        <main
          onScroll={handleScroll}
          className="relative pt-20 flex-1 w-full bg-surface px-4 sm:px-6 lg:px-8 pb-12 overflow-y-auto"
        >
          <div className="max-w-[1600px] mx-auto w-full">
            <motion.div
              key={location.pathname}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(4px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.14, ease: easeOut }}
            >
              {outlet}
            </motion.div>
          </div>
        </main>
      </div>

      {/* Global Command Palette Spotlight Dialog */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </div>
  );
}
