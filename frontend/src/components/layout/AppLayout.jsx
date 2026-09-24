import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Upload', path: '/upload' },
    { name: 'History', path: '/history' },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-xs sticky top-0 z-30">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-lg font-bold text-blue-600 hover:text-blue-700">
            NeuroWrite AI <span className="text-xs font-normal text-gray-500 border border-gray-300 rounded px-1.5 py-0.5 ml-1">Prototype</span>
          </Link>
          <nav className="flex gap-4 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  location.pathname === link.path
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4 text-sm">
          {user ? (
            <>
              <span className="text-gray-600 font-medium">{user.email || 'Researcher'}</span>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 text-xs font-semibold px-2.5 py-1 rounded border border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-blue-600 hover:underline font-medium">Login</Link>
          )}
        </div>
      </header>
      <main className="flex-1 max-w-4xl w-full mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
