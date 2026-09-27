import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Processing from "./pages/Processing";
import Result from "./pages/Result";
import History from "./pages/History";
import Report from "./pages/Report";
import Settings from "./pages/Settings";
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import AppLayout from './components/layout/AppLayout';

function AnimatedRoutes() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const easeOut = [0.23, 1, 0.32, 1];

  const isPublicAuth = ['/', '/login', '/signup'].includes(location.pathname);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isPublicAuth ? (
        <motion.div
          key={location.pathname}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, transform: "scale(0.99)" }}
          animate={{ opacity: 1, transform: "scale(1)" }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, transform: "scale(0.99)" }}
          transition={{ duration: 0.18, ease: easeOut }}
          className="w-full min-h-screen"
        >
          <Routes location={location}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </motion.div>
      ) : (
        <Routes location={location}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/processing" element={<Processing />} />
            <Route path="/result" element={<Result />} />
            <Route path="/history" element={<History />} />
            <Route path="/report" element={<Report />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <AnimatedRoutes />
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
