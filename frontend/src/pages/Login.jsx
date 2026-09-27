import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Mail, Lock, InfoCircle, ArrowUpRight, CheckCircle, ShieldCheck } from 'iconoir-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const easeOut = [0.23, 1, 0.32, 1];

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('e.vance@neuro-research.org');
  const [password, setPassword] = useState('NeuroClinical2025!');
  const [showBanner, setShowBanner] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login({ email, password });
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-surface text-on-surface font-body antialiased selection:bg-secondary-container selection:text-on-secondary-container">

      {/* LEFT PANEL: Research Intelligence & Neural Kinetic Stage */}
      <div className="relative w-full lg:w-[54%] bg-surface-container-low border-r border-outline-variant/30 text-on-surface p-8 lg:p-14 flex flex-col justify-between overflow-hidden">
        {/* Subtle Ambient Depth Gradients */}
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 18% 24%, var(--color-secondary) 0%, transparent 45%), radial-gradient(circle at 82% 76%, var(--color-tertiary) 0%, transparent 50%)' }}></div>
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        {/* Top Branding Rail */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-on-primary p-1 flex items-center justify-center font-bold text-lg shadow-sm">
              N
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline text-xl tracking-tight font-semibold text-on-surface">NeuroWrite AI</span>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-mono uppercase tracking-wider font-semibold">v2.4-active</span>
              </div>
              <p className="text-on-surface-variant text-sm font-body">Clinical Handwriting Screening & Precision Feature Lab</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant/30 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-secondary animate-ping absolute"></span>
            <span className="w-2 h-2 rounded-full bg-secondary relative"></span>
            <span className="text-xs font-mono text-on-surface font-semibold">CNN + SVM Pipeline Synced</span>
          </div>
        </div>

        {/* Center Hero Message & Kinetic Handwriting Telemetry Stage */}
        <div className="relative z-10 my-10 lg:my-0 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-outline-variant/20 text-on-surface-variant text-xs font-semibold mb-4">
            <ShieldCheck size={16} className="text-secondary" />
            <span>Cognitive Fine-Motor Biometrics</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight text-on-surface mb-4">
            AI-powered handwriting screening
          </h1>
          <p className="text-base sm:text-lg text-on-surface-variant mb-8 max-w-lg leading-relaxed">
            Quantifying fine-motor grapheme orientation and stroke velocity through dual-stage CNN + SVM feature inference.
          </p>

          {/* Abstract Kinetic Specimen Analysis Canvas Card */}
          <div className="relative p-6 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-md overflow-hidden">
            <div className="flex justify-between items-center text-xs font-mono text-on-surface-variant mb-3">
              <span className="flex items-center gap-1.5 font-semibold text-on-surface">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                SPECIMEN #NX-8834_CURSIVE
              </span>
              <span className="text-on-surface-variant font-mono">T = 142ms • θ = 41.8°</span>
            </div>

            {/* Stylized Handwriting Stroke + Neural Vector Bounding SVG */}
            <div className="relative w-full h-40 bg-surface-container-low border border-outline-variant/20 rounded-lg flex items-center justify-center p-2 overflow-hidden">
              <svg className="w-full h-full" fill="none" viewBox="0 0 420 130" xmlns="http://www.w3.org/2000/svg">
                <line opacity="0.3" stroke="currentColor" strokeDasharray="3 3" x1="20" x2="400" y1="95" y2="95"></line>
                <line opacity="0.2" stroke="currentColor" strokeDasharray="2 4" x1="20" x2="400" y1="45" y2="45"></line>
                <defs>
                  <linearGradient id="strokeGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#2dd4bf"></stop>
                    <stop offset="45%" stopColor="#38bdf8"></stop>
                    <stop offset="80%" stopColor="#818cf8"></stop>
                    <stop offset="100%" stopColor="#14b8a6"></stop>
                  </linearGradient>
                </defs>
                <motion.path
                  initial={shouldReduceMotion ? {} : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, ease: easeOut }}
                  d="M 40 92 C 75 90, 85 28, 120 28 C 150 28, 138 98, 185 92 C 220 88, 230 40, 260 40 C 295 40, 290 102, 330 92 C 360 85, 385 68, 395 72"
                  stroke="url(#strokeGrad)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3.5"
                />
                <line stroke="#818cf8" strokeDasharray="2 2" strokeWidth="1.2" x1="110" x2="170" y1="20" y2="100"></line>
                <line stroke="#818cf8" strokeDasharray="2 2" strokeWidth="1.2" x1="245" x2="310" y1="30" y2="105"></line>
                <circle cx="120" cy="28" fill="#2dd4bf" r="4"></circle>
                <circle cx="120" cy="28" opacity="0.4" r="9" stroke="#2dd4bf" strokeWidth="1"></circle>
                <text className="font-mono font-bold" fill="#2dd4bf" fontSize="9" x="132" y="26">Apex [x:120, y:28]</text>
                <circle cx="185" cy="92" fill="#818cf8" r="3.5"></circle>
                <circle cx="260" cy="40" fill="#38bdf8" r="4.5"></circle>
                <circle cx="330" cy="92" fill="#2dd4bf" r="3"></circle>
                <rect fill="rgba(45, 212, 191, 0.05)" height="84" rx="4" stroke="#2dd4bf" strokeDasharray="4 3" strokeWidth="1.2" width="85" x="100" y="18"></rect>
                <rect fill="rgba(129, 140, 248, 0.05)" height="74" rx="4" stroke="#818cf8" strokeDasharray="4 3" strokeWidth="1.2" width="95" x="240" y="28"></rect>
              </svg>
              {/* Floating Scan Overlay Indicator */}
              <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-lowest/90 border border-outline-variant/30 rounded backdrop-blur-sm text-xs font-mono text-on-surface font-semibold shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                SVM Separation Active
              </div>
            </div>

            {/* Feature Extraction & Latent Telemetry Badges */}
            <div className="mt-4 grid grid-cols-3 gap-2.5">
              <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/20">
                <span className="block text-xs font-mono text-on-surface-variant truncate font-medium">Bottleneck</span>
                <span className="block text-sm font-semibold text-on-surface mt-0.5">512-D Latent</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/20">
                <span className="block text-xs font-mono text-on-surface-variant truncate font-medium">Hyperplane σ</span>
                <span className="block text-sm font-semibold text-secondary mt-0.5">+2.18σ Normal</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/20">
                <span className="block text-xs font-mono text-on-surface-variant truncate font-medium">Confidence</span>
                <span className="block text-sm font-semibold text-on-surface mt-0.5">94.6% AUC</span>
              </div>
            </div>

            {/* Classification Output Pills Row */}
            <div className="mt-4 pt-3 flex items-center justify-between text-xs font-mono border-t border-outline-variant/20">
              <span className="text-on-surface-variant font-medium">Class Tagging:</span>
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Normal 92%
                </span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-outline"></span> Corrected 6%
                </span>
                <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-error"></span> Reversal 2%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Institutional Trust Bottom Line */}
        <div className="relative z-10 pt-4 flex flex-col sm:flex-row sm:items-center justify-between text-on-surface-variant text-sm gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-secondary" size={18} />
            <span className="font-medium text-on-surface">Compliant with ISO/TR 24291 research protocols</span>
          </div>
          <span className="text-xs font-mono text-on-surface-variant">Investigational cohort analysis</span>
        </div>
      </div>

      {/* RIGHT PANEL: Authentication Form & Interactive Controls */}
      <div className="w-full lg:w-[46%] bg-surface flex flex-col justify-between p-6 sm:p-10 lg:p-14">
        {/* Top Utility Header */}
        <div className="flex items-center justify-between w-full max-w-md mx-auto">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs font-medium border border-outline-variant/20">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            <span>Gateway: US-East Medical Cloud</span>
          </div>
          <a href="#" className="text-secondary hover:underline transition-colors text-xs font-semibold flex items-center gap-1">
            <span>Research Support</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Centered Sign-In Workbench Form Area */}
        <div className="w-full max-w-md mx-auto my-auto py-8">
          <div className="mb-6">
            <h2 className="text-3xl font-semibold tracking-tight text-on-surface">Researcher Sign In</h2>
            <p className="text-sm text-on-surface-variant mt-1.5">Enter institutional credentials to access screening pipelines.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Institutional Email"
              type="email"
              icon={Mail}
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              icon={Lock}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="primary"
              className="w-full py-2.5 mt-2"
              isLoading={loading}
            >
              Sign In to Workstation
            </Button>
          </form>

          <p className="text-center text-xs text-on-surface-variant mt-6">
            Need cohort credentials?{' '}
            <Link to="/signup" className="text-secondary font-semibold hover:underline">
              Request Research Access
            </Link>
          </p>
        </div>

        {/* Bottom Security Assurance Footnote */}
        <div className="w-full max-w-md mx-auto pt-6 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-secondary" />
            <span>FIPS 140-3 Hardware Token Compatible</span>
          </div>
          <span>v2.4.0</span>
        </div>
      </div>
    </div>
  );
}