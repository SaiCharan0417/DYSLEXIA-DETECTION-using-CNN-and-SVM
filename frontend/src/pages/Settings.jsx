import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { NavArrowRight, CheckCircle, Shield, ControlSlider, PageEdit, WarningTriangle, ElectronicsChip, LightBulb, HalfMoon, Tv, Hammer, Lock, InfoCircle, Flash, Page, SmartphoneDevice } from 'iconoir-react';

export default function Settings() {
  return (
    <div className="flex flex-col w-full pb-12 gap-8 pt-4">
      {/* Top Command & Breadcrumb Strip */}
      <div className="px-6 py-4 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 -mx-6 lg:-mx-8 w-[calc(100%+3rem)] lg:w-[calc(100%+4rem)] flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-on-surface-variant text-xs">
            <span className="hover:text-on-surface cursor-pointer transition-colors">Settings & Governance</span>
            <span>&gt;</span>
            <span className="text-secondary font-medium">Account & Workspace</span>
          </div>
          <h1 className="text-3xl text-on-surface tracking-tight font-semibold">Account & System Settings</h1>
          <p className="text-sm text-on-surface-variant max-w-2xl mt-0.5">
            Manage your clinical researcher credentials, authentication security, notification cadences, and research data retention policies.
          </p>
        </div>
        <div className="flex items-center gap-3 self-start md:self-auto">
          <button className="px-4 py-2 rounded-lg bg-surface-container-low text-on-surface text-sm hover:bg-surface-container transition-colors shadow-sm font-medium border border-outline-variant/10">
            Discard Changes
          </button>
          <div className="relative group">
            <Button variant="accent" icon={CheckCircle}>Save Preferences</Button>
            <div className="absolute right-0 top-full mt-2 hidden group-hover:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-mono text-xs shadow-md whitespace-nowrap z-30">
              <Lock size={12} className="text-secondary-fixed" />
              <span>All changes auto-synced with HIPAA compliant vault</span>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Main Layout Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Anchor Navigation Rail */}
        <aside className="lg:col-span-3">
          <div className="sticky top-24 flex flex-col gap-1 bg-surface-container-lowest p-3 rounded-xl shadow-sm border border-outline-variant/20">
            <div className="px-3 py-2 text-outline text-xs uppercase tracking-wider font-semibold">
              Preferences Navigation
            </div>
            <a href="#profile-section" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface-container-high text-on-surface text-sm font-medium transition-colors">
              <PageEdit className="text-secondary" size={18} />
              <span>Profile Information</span>
            </a>
            <a href="#security-section" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface text-sm font-medium transition-colors">
              <Shield size={18} />
              <span>Security & Auth</span>
            </a>
            <a href="#preferences-section" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface text-sm font-medium transition-colors">
              <ControlSlider size={18} />
              <span>System Preferences</span>
            </a>
            <a href="#governance-section" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface text-sm font-medium transition-colors">
              <Page size={18} />
              <span>Privacy & Data Governance</span>
            </a>
            <a href="#danger-section" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-error hover:bg-error-container/30 text-sm font-medium transition-colors mt-2">
              <WarningTriangle size={18} />
              <span>Danger Zone</span>
            </a>

            {/* Telemetry Sync Card */}
            <div className="mt-6 p-3 rounded-lg bg-surface-container-low border border-outline-variant/10">
              <div className="flex items-center justify-between text-on-surface-variant font-mono text-xs mb-1.5">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Cloud Sync
                </span>
                <span>v2.4.12</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-tight">
                Vault latency: <span className="font-mono text-xs font-semibold text-on-surface">18ms (Boston DC-02)</span>
              </p>
            </div>
          </div>
        </aside>

        {/* Content Canvas */}
        <main className="lg:col-span-9 flex flex-col gap-10">

          {/* SECTION 1: Profile Information */}
          <section id="profile-section" className="bg-surface-container-lowest rounded-xl p-8 shadow-sm flex flex-col gap-6 border border-outline-variant/20">
            <div className="flex flex-col gap-1 border-b border-surface-container-high pb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl text-on-surface font-semibold tracking-tight">Profile Information</h2>
                <span className="px-2.5 py-1 rounded-full bg-surface-container text-secondary font-mono text-xs font-medium inline-flex items-center gap-1.5">
                  <CheckCircle size={14} />
                  Verified Investigator
                </span>
              </div>
              <p className="text-sm text-on-surface-variant">Your clinical identity and researcher credentials displayed on screening reports and cohort outputs.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-5 rounded-xl bg-surface-container-low border border-outline-variant/10">
              <div className="relative">
                <div className="w-24 h-24 rounded-full shadow-sm bg-primary-container text-on-primary flex items-center justify-center text-3xl font-bold">EV</div>
                <div className="absolute bottom-0 right-0 p-1 bg-surface-container-lowest rounded-full shadow-sm">
                  <CheckCircle size={16} className="text-secondary" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-3">
                  <button className="px-3.5 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface text-sm font-medium hover:bg-surface-container transition-colors shadow-sm border border-outline-variant/20">Change Photo</button>
                  <button className="text-on-surface-variant hover:text-error text-xs font-medium transition-colors">Remove</button>
                </div>
                <span className="text-xs text-on-surface-variant">JPG, PNG or WebP under 5MB. Recommended 400×400px.</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-on-surface font-medium">Full Name</label>
                <input type="text" defaultValue="Dr. Elena Vance" className="h-10 px-3.5 rounded-lg bg-surface-container-low text-on-surface text-sm focus:bg-surface-container-lowest focus:outline-none border border-outline-variant/20 transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-on-surface font-medium">Academic / Clinical Title</label>
                <input type="text" defaultValue="Principal Cognitive Researcher" className="h-10 px-3.5 rounded-lg bg-surface-container-low text-on-surface text-sm focus:bg-surface-container-lowest focus:outline-none border border-outline-variant/20 transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-on-surface font-medium">Institutional Email</label>
                  <span className="font-mono text-xs text-secondary font-medium flex items-center gap-1"><CheckCircle size={12} /> Verified</span>
                </div>
                <input type="email" defaultValue="e.vance@neurowrite-research.org" className="h-10 px-3.5 rounded-lg bg-surface-container-low text-on-surface text-sm focus:bg-surface-container-lowest focus:outline-none border border-outline-variant/20 transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-on-surface font-medium">ORCID iD</label>
                  <a href="#" className="text-secondary hover:underline font-mono text-xs flex items-center gap-0.5">View Record</a>
                </div>
                <input type="text" defaultValue="0000-0002-1825-0097" className="h-10 px-3.5 rounded-lg bg-surface-container-low text-on-surface font-mono text-sm focus:bg-surface-container-lowest focus:outline-none border border-outline-variant/20 transition-colors" />
              </div>
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-sm text-on-surface font-medium">Institution / Research Lab</label>
                <input type="text" defaultValue="NeuroDevelopmental Diagnostics Lab, Cambridge Institute" className="h-10 px-3.5 rounded-lg bg-surface-container-low text-on-surface text-sm focus:bg-surface-container-lowest focus:outline-none border border-outline-variant/20 transition-colors" />
              </div>
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-sm text-on-surface font-medium">Primary Research Discipline</label>
                <select className="w-full h-10 px-3.5 rounded-lg bg-surface-container-low text-on-surface text-sm border border-outline-variant/20 focus:outline-none appearance-none">
                  <option>Pediatric Dyslexia & Motor Control</option>
                  <option>Clinical Neuropsychology</option>
                </select>
              </div>
            </div>
          </section>

          {/* SECTION 2: Security & Auth */}
          <section id="security-section" className="bg-surface-container-lowest rounded-xl p-8 shadow-sm flex flex-col gap-6 border border-outline-variant/20">
            <div className="flex flex-col gap-1 border-b border-surface-container-high pb-4">
              <h2 className="text-2xl text-on-surface font-semibold tracking-tight">Security & Authentication</h2>
              <p className="text-sm text-on-surface-variant">Safeguard access to screening pipelines, clinical cohort keys, and participant telemetry.</p>
            </div>

            {/* Password Update Card */}
            <div className="p-6 rounded-xl bg-surface-container-low flex flex-col gap-4 border border-outline-variant/10">
              <div className="flex items-center gap-2 text-on-surface text-lg font-semibold">
                <Lock size={20} className="text-secondary" />
                <span>Change Password</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-on-surface-variant">Current Password</label>
                  <input type="password" defaultValue="••••••••••••••••" className="w-full h-10 px-3.5 rounded-lg bg-surface-container-lowest text-on-surface text-sm border border-outline-variant/20 focus:outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-on-surface-variant">New Password</label>
                  <input type="password" defaultValue="Neuro-98#Cambridge" className="w-full h-10 px-3.5 rounded-lg bg-surface-container-lowest text-on-surface text-sm border border-outline-variant/20 focus:outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-on-surface-variant">Confirm New Password</label>
                  <input type="password" defaultValue="Neuro-98#Cambridge" className="w-full h-10 px-3.5 rounded-lg bg-surface-container-lowest text-on-surface text-sm border border-outline-variant/20 focus:outline-none" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-secondary font-medium">Strength: Very Strong</span>
                  <span className="font-mono text-on-surface-variant">Entropy: 94.2 bits</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden flex gap-1">
                  <div className="h-full w-1/4 bg-secondary"></div><div className="h-full w-1/4 bg-secondary"></div><div className="h-full w-1/4 bg-secondary"></div><div className="h-full w-1/4 bg-secondary"></div>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button>Update Password</Button>
              </div>
            </div>

            {/* 2FA */}
            <div className="p-6 rounded-xl bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-4 border border-outline-variant/10">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-surface-container-lowest shadow-sm text-secondary">
                  <SmartphoneDevice size={24} />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-on-surface">Two-Factor Authentication (2FA)</h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-mono text-xs font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Enabled
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant">Authenticator App (TOTP) bound to hardware key. 8 emergency recovery codes remaining.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-start md:self-auto">
                <Button variant="secondary" size="sm">View Backup Codes</Button>
                <Button variant="accent" size="sm">Configure 2FA</Button>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-on-surface">Active Researcher Sessions</h3>
                  <p className="text-xs text-on-surface-variant">Devices currently authenticated to your diagnostic instance.</p>
                </div>
                <button className="px-3 py-1.5 rounded-lg text-error hover:bg-error-container/20 text-xs transition-colors">Revoke All</button>
              </div>
              <div className="flex flex-col gap-2">
                <div className="p-4 rounded-xl bg-surface-container-low flex items-center justify-between border border-outline-variant/10">
                  <div className="flex items-center gap-3.5">
                    <Tv className="text-secondary" size={24} />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-on-surface font-semibold">MacBook Pro 16 · Chrome 124</span>
                        <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-mono text-[10px] font-semibold">This Device</span>
                      </div>
                      <span className="text-xs text-on-surface-variant">Cambridge, MA, USA · IP 192.84.14.88 · Active Now</span>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-secondary font-medium">Session Live</span>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}