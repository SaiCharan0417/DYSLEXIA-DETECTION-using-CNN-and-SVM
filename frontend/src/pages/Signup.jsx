import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Mail, Lock, User, City } from 'iconoir-react';

export default function Signup() {
  const { login } = useAuth(); // using login mock for registration as well
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', institution: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login({ email: form.email, password: form.password });
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center p-6 sm:p-10">
      <div className="w-full max-w-md mx-auto py-8">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-on-surface">Request Cohort Access</h2>
          <p className="text-sm text-on-surface-variant mt-1.5">Register for clinical workstation access.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            icon={User}
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            required
          />
          <Input
            label="Institution"
            type="text"
            icon={City}
            value={form.institution}
            onChange={e => setForm({...form, institution: e.target.value})}
            required
          />
          <Input
            label="Institutional Email"
            type="email"
            icon={Mail}
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            required
          />
          <Input
            label="Password"
            type="password"
            icon={Lock}
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
            required
          />
          <Button type="submit" className="w-full mt-6" isLoading={loading}>Submit Registration</Button>
        </form>

        <p className="text-center text-sm text-on-surface-variant mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-secondary font-medium hover:text-on-secondary-container transition-colors ml-1">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}