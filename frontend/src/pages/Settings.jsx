import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState(user?.name || 'Dr. Elena Vance');
  const [email, setEmail] = useState(user?.email || 'e.vance@neuro-research.org');
  const [institution, setInstitution] = useState('Cambridge Cognitive Institute');

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account & Settings</h1>
        <p className="text-sm text-gray-500">Manage researcher profile and session controls.</p>
      </div>

      {saved && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded font-medium">
          Preferences saved successfully.
        </div>
      )}

      {/* Profile Details Card */}
      <Card className="space-y-4">
        <h2 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-2">Profile Information</h2>
        <form onSubmit={handleSave} className="space-y-3">
          <Input
            label="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <Input
            label="Institutional Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            label="Institution / Lab"
            value={institution}
            onChange={e => setInstitution(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            Save Profile Changes
          </Button>
        </form>
      </Card>

      {/* Security & Authentication */}
      <Card className="space-y-4">
        <h2 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-2">Security & Password</h2>
        <div className="space-y-3">
          <Input label="Current Password" type="password" placeholder="••••••••••••" />
          <Input label="New Password" type="password" placeholder="••••••••••••" />
          <Button className="bg-gray-800 hover:bg-gray-900 text-white">
            Update Password
          </Button>
        </div>
      </Card>

      {/* Session Management */}
      <Card className="space-y-3 border-l-4 border-l-red-500">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-bold text-gray-800">Active Workstation Session</h2>
            <p className="text-xs text-gray-500">Signed in as <span className="font-semibold text-gray-700">{user?.email || 'e.vance@neuro-research.org'}</span></p>
          </div>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded text-xs font-semibold transition-colors cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </Card>
    </div>
  );
}
