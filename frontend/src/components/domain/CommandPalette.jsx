import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Search, ViewGrid, PageUp, ClockRotateRight, Page, Settings, HalfMoon, SunLight, LogOut, ArrowRight, ScanBarcode } from 'iconoir-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { mockHistory } from '../../utils/api';

export function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const shouldReduceMotion = useReducedMotion();

  const easeOut = [0.23, 1, 0.32, 1];

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // All actionable items
  const actions = [
    { id: 'nav-dash', title: 'Dashboard Overview', category: 'Navigation', icon: ViewGrid, run: () => navigate('/dashboard') },
    { id: 'nav-upload', title: 'Start New Handwriting Screening', category: 'Navigation', icon: PageUp, run: () => navigate('/upload') },
    { id: 'nav-history', title: 'Browse Analysis History & Database', category: 'Navigation', icon: ClockRotateRight, run: () => navigate('/history') },
    { id: 'nav-reports', title: 'Generate & View Dossier Report', category: 'Navigation', icon: Page, run: () => navigate('/report') },
    { id: 'nav-settings', title: 'Researcher Settings & Security', category: 'Navigation', icon: Settings, run: () => navigate('/settings') },
    { id: 'act-theme', title: `Switch Theme to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`, category: 'Actions', icon: theme === 'dark' ? SunLight : HalfMoon, run: () => toggleTheme() },
    { id: 'demo-reversal', title: 'Demo: Simulate Reversal Pattern (97.2%)', category: 'Simulations', icon: ScanBarcode, run: () => navigate('/result', { state: { prediction: { id: 'DEMO-REV', category: 'Reversal', confidence: 97.2, filename: 'demo_reversal_sample.png' } } }) },
    { id: 'demo-normal', title: 'Demo: Simulate Normal Fluid Baseline (98.4%)', category: 'Simulations', icon: ScanBarcode, run: () => navigate('/result', { state: { prediction: { id: 'DEMO-NORM', category: 'Normal', confidence: 98.4, filename: 'demo_normal_sample.png' } } }) },
    { id: 'demo-corrected', title: 'Demo: Simulate Corrected Hesitation (91.5%)', category: 'Simulations', icon: ScanBarcode, run: () => navigate('/result', { state: { prediction: { id: 'DEMO-CORR', category: 'Corrected', confidence: 91.5, filename: 'demo_corrected_sample.png' } } }) },
    { id: 'act-logout', title: 'Sign Out of Workstation Session', category: 'Account', icon: LogOut, run: () => { logout(); navigate('/login'); } },
  ];

  // Also include historical specimen records matching query
  const historyItems = mockHistory.map(h => ({
    id: `specimen-${h.id}`,
    title: `Specimen ${h.id} (${h.category} • ${h.confidence}%)`,
    category: 'Historical Records',
    icon: ScanBarcode,
    run: () => navigate('/result', { state: { record: h } })
  }));

  const allItems = [...actions, ...historyItems];

  const filtered = allItems.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].run();
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
        >
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18, ease: easeOut }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-xl rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-2xl overflow-hidden font-body text-on-surface"
          >
            {/* Command Search Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-outline-variant/20 bg-surface-container-low">
              <Search size={20} className="text-on-surface-variant shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command, specimen ID, or search..."
                className="flex-1 bg-transparent border-none text-base text-on-surface placeholder:text-outline focus:outline-none"
              />
              <kbd className="px-2 py-0.5 rounded bg-surface-container text-xs font-mono text-on-surface-variant border border-outline-variant/20">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-outline-variant/10">
              {filtered.map((item, index) => {
                const isSelected = index === selectedIndex;
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => { item.run(); onClose(); }}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                      isSelected ? 'bg-surface-container-high text-on-surface' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-1.5 rounded-lg shrink-0 ${isSelected ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container text-on-surface-variant'}`}>
                        <Icon size={16} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold truncate text-on-surface">{item.title}</span>
                        <span className="text-[10px] text-on-surface-variant font-medium">{item.category}</span>
                      </div>
                    </div>
                    {isSelected && (
                      <ArrowRight size={14} className="text-secondary shrink-0" />
                    )}
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <div className="py-12 text-center text-sm text-on-surface-variant">
                  No matching commands or specimens found.
                </div>
              )}
            </div>

            {/* Footer shortcuts */}
            <div className="px-4 py-2 bg-surface-container-low border-t border-outline-variant/20 flex items-center justify-between text-[11px] text-on-surface-variant font-mono">
              <span>Navigate: <kbd className="px-1 py-0.5 rounded bg-surface-container">↑</kbd> <kbd className="px-1 py-0.5 rounded bg-surface-container">↓</kbd></span>
              <span>Select: <kbd className="px-1.5 py-0.5 rounded bg-surface-container">ENTER</kbd></span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
