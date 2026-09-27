import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Mail, Lock, User, City, ArrowRight } from 'iconoir-react';

export default function Signup() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', institution: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await register({ email: form.email, password: form.password, name: form.name, institution: form.institution });
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center p-6 sm:p-10 font-body text-on-surface">
      <div className="w-full max-w-md mx-auto py-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-on-primary font-bold text-xl mb-4 shadow-sm">
            N
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-on-surface">Request Cohort Access</h2>
          <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
            Register for clinical workstation credentials and research pipeline access.
          </p>
        </div>

        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-outline-variant/40 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              icon={User}
              placeholder="Dr. Elena Vance"
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              required
            />
            <Input
              label="Institution / University"
              type="text"
              icon={City}
              placeholder="Oxford Cognitive Neuroscience Lab"
              value={form.institution}
              onChange={e => setForm({...form, institution: e.target.value})}
              required
            />
            <Input
              label="Institutional Email"
              type="email"
              icon={Mail}
              placeholder="e.vance@neuro-research.org"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              required
            />
            <Input
              label="Password"
              type="password"
              icon={Lock}
              placeholder="••••••••••••"
              value={form.password}
              onChange={e => setForm({...form, password: e.target.value})}
              required
            />
            <Button type="submit" variant="primary" className="w-full py-2.5 mt-2" isLoading={loading}>
              <span>Submit Registration</span>
              <ArrowRight size={16} />
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-on-surface-variant mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-secondary font-semibold hover:underline transition-colors ml-1">
            Sign In to Workstation
          </Link>
        </p>
      </div>
    </div>
  );
}