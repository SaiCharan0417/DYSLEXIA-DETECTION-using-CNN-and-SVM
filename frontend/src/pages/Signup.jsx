import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export default function Signup() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', institution: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
      <Card className="w-full max-w-sm">
        <h2 className="text-xl font-bold mb-1 text-gray-900">Create Account</h2>
        <p className="text-xs text-gray-500 mb-4">Register for research screening access.</p>

        {error && <div className="p-2 mb-4 bg-red-50 text-red-600 text-sm rounded border border-red-200">{error}</div>}

        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            type="text"
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            required
            placeholder="Dr. Elena Vance"
          />
          <Input
            label="Institution"
            type="text"
            value={form.institution}
            onChange={e => setForm({...form, institution: e.target.value})}
            required
            placeholder="Cognitive Research Lab"
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            required
            placeholder="researcher@lab.org"
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
            required
            placeholder="••••••••"
          />
          <Button type="submit" className="w-full mt-2" disabled={loading}>
            {loading ? "Registering..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-4">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
        </p>
      </Card>
    </div>
  );
}
