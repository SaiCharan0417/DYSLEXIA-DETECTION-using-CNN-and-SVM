import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Mail, Lock, InfoCircle, ArrowUpRight, CheckCircle, ShieldCheck } from 'iconoir-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
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

      {/* LEFT PANEL: Dark Slate/Navy Research Intelligence Visualization */}
      <div className="relative w-full lg:w-[54%] bg-primary-container text-inverse-on-surface p-8 lg:p-14 flex flex-col justify-between overflow-hidden">
        {/* Ambient Radial Gradients & Subtle Grid Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 18% 24%, #6bd8cb 0%, transparent 42%), radial-gradient(circle at 82% 76%, #7073ff 0%, transparent 48%)' }}></div>
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        {/* Top Branding Rail */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container-lowest/10 p-1 flex items-center justify-center backdrop-blur-md shadow-md text-on-primary font-bold text-lg">
              N
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline text-xl tracking-tight font-semibold text-inverse-on-surface">NeuroWrite AI</span>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary-fixed text-xs font-mono uppercase tracking-wider">v2.4-active</span>
              </div>
              <p className="text-on-primary-container text-sm font-body">Clinical Handwriting Screening & Precision Feature Lab</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-ping absolute"></span>
            <span className="w-2 h-2 rounded-full bg-secondary-fixed relative"></span>
            <span className="text-xs font-mono text-secondary-fixed">CNN + SVM Pipeline Synced</span>
          </div>
        </div>

        {/* Center Hero Message & Kinetic Handwriting Telemetry Stage */}
        <div className="relative z-10 my-10 lg:my-0 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest/15 text-tertiary-fixed text-xs font-medium mb-4">
            <ShieldCheck size={16} />
            Cognitive Fine-Motor Biometrics
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight text-surface-container-lowest mb-4">
            AI-powered handwriting screening
          </h1>
          <p className="text-lg text-surface-variant/80 mb-8 max-w-lg leading-relaxed">
            Quantifying fine-motor grapheme orientation and stroke velocity through dual-stage CNN + SVM feature inference.
          </p>

          {/* Abstract Kinetic Specimen Analysis Canvas Card */}
          <div className="relative p-6 rounded-xl bg-surface-container-lowest/5 backdrop-blur-xl shadow-xl overflow-hidden">
            <div className="flex justify-between items-center text-xs font-mono text-on-primary-container mb-3">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                SPECIMEN #NX-8834_CURSIVE
              </span>
              <span className="text-surface-container-highest">T = 142ms • θ = 41.8°</span>
            </div>

            {/* Stylized Handwriting Stroke + Neural Vector Bounding SVG */}
            <div className="relative w-full h-40 bg-surface-container-lowest/5 rounded-lg flex items-center justify-center p-2 overflow-hidden">
              <svg className="w-full h-full" fill="none" viewBox="0 0 420 130" xmlns="http://www.w3.org/2000/svg">
                <line opacity="0.6" stroke="#3f465c" strokeDasharray="3 3" x1="20" x2="400" y1="95" y2="95"></line>
                <line opacity="0.4" stroke="#3f465c" strokeDasharray="2 4" x1="20" x2="400" y1="45" y2="45"></line>
                <defs>
                  <linearGradient id="strokeGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#6bd8cb"></stop>
                    <stop offset="45%" stopColor="#86f2e4"></stop>
                    <stop offset="80%" stopColor="#c0c1ff"></stop>
                    <stop offset="100%" stopColor="#006a61"></stop>
                  </linearGradient>
                </defs>
                <path d="M 40 92 C 75 90, 85 28, 120 28 C 150 28, 138 98, 185 92 C 220 88, 230 40, 260 40 C 295 40, 290 102, 330 92 C 360 85, 385 68, 395 72" stroke="url(#strokeGrad)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5"></path>
                <line stroke="#7073ff" strokeDasharray="2 2" strokeWidth="1.2" x1="110" x2="170" y1="20" y2="100"></line>
                <line stroke="#7073ff" strokeDasharray="2 2" strokeWidth="1.2" x1="245" x2="310" y1="30" y2="105"></line>
                <circle cx="120" cy="28" fill="#86f2e4" r="4"></circle>
                <circle cx="120" cy="28" opacity="0.5" r="9" stroke="#86f2e4" strokeWidth="1"></circle>
                <text className="font-mono" fill="#86f2e4" fontSize="8" x="132" y="26">Apex [x:120, y:28]</text>
                <circle cx="185" cy="92" fill="#c0c1ff" r="3.5"></circle>
                <circle cx="260" cy="40" fill="#6bd8cb" r="4.5"></circle>
                <circle cx="330" cy="92" fill="#89f5e7" r="3"></circle>
                <rect fill="none" height="84" opacity="0.6" rx="4" stroke="#6bd8cb" strokeDasharray="4 3" strokeWidth="1" width="85" x="100" y="18"></rect>
                <rect fill="none" height="74" opacity="0.5" rx="4" stroke="#7073ff" strokeDasharray="4 3" strokeWidth="1" width="95" x="240" y="28"></rect>
              </svg>
              {/* Floating Scan Overlay Indicator */}
              <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 bg-primary-container/80 rounded backdrop-blur-sm text-xs font-mono text-secondary-fixed">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-pulse"></span>
                SVM Separation Active
              </div>
            </div>

            {/* Feature Extraction & Latent Telemetry Badges */}
            <div className="mt-4 grid grid-cols-3 gap-2.5">
              <div className="p-2.5 rounded-lg bg-surface-container-lowest/5">
                <span className="block text-xs font-mono text-on-primary-container truncate">Bottleneck</span>
                <span className="block text-sm font-medium text-surface-container-lowest mt-0.5">512-D Latent</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-lowest/5">
                <span className="block text-xs font-mono text-on-primary-container truncate">Hyperplane σ</span>
                <span className="block text-sm font-medium text-secondary-fixed mt-0.5">+2.18σ Normal</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-lowest/5">
                <span className="block text-xs font-mono text-on-primary-container truncate">Confidence</span>
                <span className="block text-sm font-medium text-surface-container-lowest mt-0.5">94.6% AUC</span>
              </div>
            </div>

            {/* Classification Output Pills Row */}
            <div className="mt-4 pt-3 flex items-center justify-between text-xs font-mono">
              <span className="text-on-primary-container">Class Tagging:</span>
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full bg-secondary/30 text-secondary-fixed flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed"></span> Normal 92%
                </span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-highest/20 text-surface-variant flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span> Corrected 6%
                </span>
                <span className="px-2 py-0.5 rounded-full bg-error-container/20 text-error-container flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-error"></span> Reversal 2%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Institutional Trust Bottom Line */}
        <div className="relative z-10 pt-4 flex flex-col sm:flex-row sm:items-center justify-between text-on-primary-container text-sm gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-secondary-fixed" size={18} />
            <span>Compliant with ISO/TR 24291 research protocols</span>
          </div>
          <span className="text-xs font-mono text-surface-variant/60">Investigational cohort analysis</span>
        </div>
      </div>

      {/* RIGHT PANEL: Authentication Form & Interactive Controls */}
      <div className="w-full lg:w-[46%] bg-surface flex flex-col justify-between p-6 sm:p-10 lg:p-14">
        {/* Top Utility Header */}
        <div className="flex items-center justify-between w-full max-w-md mx-auto">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            <span>Gateway: US-East Medical Cloud</span>
          </div>
          <a href="#" className="text-secondary hover:text-on-secondary-container transition-colors text-xs font-medium flex items-center gap-1">
            <span>Research Support</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Centered Sign-In Workbench Form Area */}
        <div className="w-full max-w-md mx-auto my-auto py-8">
          <div className="mb-6">
            <h2 className="text-3xl font-semibold tracking-tight text-on-surface">Welcome back</h2>
            <p className="text-sm text-on-surface-variant mt-1.5">Sign in to access validated cohorts and handwriting stroke telemetry.</p>
          </div>

          {showBanner && (
            <div className="mb-6 p-3.5 rounded-lg bg-error-container text-on-error-container flex items-start justify-between shadow-sm transition-all duration-300">
              <div className="flex items-start gap-2.5">
                <InfoCircle className="text-error mt-0.5" size={18} />
                <div>
                  <p className="text-xs font-medium">Session token notice</p>
                  <p className="text-xs opacity-90 mt-0.5">Dual-factor token active. Institutional domain validation applied automatically.</p>
                </div>
              </div>
              <button onClick={() => setShowBanner(false)} className="text-on-error-container hover:opacity-75 transition-opacity" type="button">
                &times;
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-on-surface">Institutional Email</label>
                <span className="text-xs font-mono text-secondary flex items-center gap-1">
                  <CheckCircle size={14} />
                  Domain verified
                </span>
              </div>
              <Input
                type="email"
                icon={Mail}
                placeholder="e.g. e.vance@neuro-research.org"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-on-surface">Password</label>
                <a href="#forgot" className="text-xs text-secondary hover:text-on-secondary-container transition-colors">Forgot password?</a>
              </div>
              <Input
                type="password"
                icon={Lock}
                placeholder="Enter your security token"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-secondary accent-secondary focus:ring-0 cursor-pointer" />
                <span className="text-sm text-on-surface-variant">Remember clinical workstation</span>
              </label>
              <span className="text-xs font-mono text-outline">12h session</span>
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full h-11" isLoading={loading}>
                Sign In to Workspace
              </Button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full bg-surface-container-high h-[1px]"></div>
            </div>
            <span className="relative px-3 bg-surface text-xs font-mono uppercase tracking-wider text-outline">
              or continue with
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="h-10 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low text-on-surface text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-sm border border-outline-variant/30" type="button">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"></path>
              </svg>
              <span>Google Workspace</span>
            </button>
            <button className="h-10 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low text-on-surface text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-sm border border-outline-variant/30" type="button">
              <ShieldCheck className="text-secondary" size={16} />
              <span>EduID / SAML SSO</span>
            </button>
          </div>

          <p className="text-center text-sm text-on-surface-variant mt-6">
            Institutional investigator without credentials?
            <Link to="/signup" className="text-secondary font-medium hover:text-on-secondary-container transition-colors ml-1">
              Request Cohort Access
            </Link>
          </p>
        </div>

        {/* Regulatory & Ethical Micro-Copy Footer */}
        <div className="w-full max-w-md mx-auto pt-6 text-center text-outline text-xs font-mono flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-1.5 text-on-surface-variant">
            <Lock size={14} />
            <span>AES-256 GCM encrypted • HIPAA / GDPR research compliant</span>
          </div>
          <p className="text-xs text-outline font-body">
            NeuroWrite AI operates strictly under investigational screening protocols.
          </p>
        </div>
      </div>
    </div>
  );
}