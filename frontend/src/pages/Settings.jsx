import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { NavArrowRight, CheckCircle, Shield, ControlSlider, PageEdit, WarningTriangle, ElectronicsChip, LightBulb, HalfMoon, Tv, Hammer, Lock, InfoCircle, Flash, Page, SmartphoneDevice, LogOut, Check } from 'iconoir-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const easeOut = [0.23, 1, 0.32, 1];

  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const tabs = [
    { id: 'profile', name: 'Profile Information', icon: PageEdit },
    { id: 'security', name: 'Security & Auth', icon: Shield },
    { id: 'preferences', name: 'System Preferences', icon: ControlSlider },
    { id: 'governance', name: 'Privacy & Governance', icon: Page },
    { id: 'danger', name: 'Danger Zone', icon: WarningTriangle, error: true },
  ];

  return (
    <div className="flex flex-col w-full pb-16 gap-8 pt-4 font-body text-on-surface max-w-[1400px] mx-auto">
      {/* Standard Workbench Header */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-mono text-xs mb-1">
            <Shield size={14} className="text-secondary" />
            <span>ACCOUNT & WORKSPACE</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-on-surface">Account & System Settings</h1>
          <p className="text-base text-on-surface-variant max-w-2xl">
            Manage your clinical researcher credentials, authentication security, notification cadences, and research data retention policies.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveTab('profile')}
            className="px-4 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-on-surface text-sm font-medium hover:bg-surface-container transition-colors shadow-sm cursor-pointer"
          >
            Discard Changes
          </button>
          <Button
            variant="accent"
            icon={saved ? Check : CheckCircle}
            onClick={handleSave}
          >
            {saved ? "Preferences Saved!" : "Save Preferences"}
          </Button>
        </div>
      </section>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-6 border-b border-outline-variant/30 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-3 px-1 text-sm font-semibold transition-colors cursor-pointer select-none whitespace-nowrap flex items-center gap-2 ${
                isActive
                  ? tab.error ? 'text-error' : 'text-on-surface'
                  : tab.error ? 'text-error/70 hover:text-error' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <tab.icon size={16} className={tab.error ? 'text-error' : isActive ? 'text-secondary' : 'text-on-surface-variant'} />
              <span>{tab.name}</span>
              {isActive && (
                <motion.div
                  layoutId="activeSettingsTabLine"
                  className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                    tab.error ? 'bg-error' : 'bg-secondary'
                  }`}
                  transition={shouldReduceMotion ? { duration: 0 } : {
                    type: "spring",
                    stiffness: 500,
                    damping: 35
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Tabbed Content Canvas */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(8px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(-6px)" }}
          transition={{ duration: 0.16, ease: easeOut }}
          className="flex flex-col gap-8"
        >
        {/* TAB 1: Profile Information */}
        {activeTab === 'profile' && (
          <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm flex flex-col gap-6 border border-outline-variant/30">
            <div className="flex flex-col gap-1 border-b border-outline-variant/20 pb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl text-on-surface font-semibold tracking-tight">Profile Information</h2>
                <span className="px-2.5 py-1 rounded-full bg-surface-container text-secondary font-mono text-xs font-semibold inline-flex items-center gap-1.5 border border-outline-variant/20">
                  <CheckCircle size={14} />
                  Verified Investigator
                </span>
              </div>
              <p className="text-sm text-on-surface-variant">Your clinical identity and researcher credentials displayed on screening reports and cohort outputs.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-5 rounded-xl bg-surface-container-low border border-outline-variant/20">
              <div className="relative">
                <div className="w-20 h-20 rounded-full shadow-sm bg-primary text-on-primary flex items-center justify-center text-2xl font-bold">EV</div>
                <div className="absolute bottom-0 right-0 p-1 bg-surface-container-lowest rounded-full shadow-sm border border-outline-variant/20">
                  <CheckCircle size={14} className="text-secondary" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-3">
                  <button className="px-3.5 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface text-sm font-semibold hover:bg-surface-container transition-colors shadow-sm border border-outline-variant/30">
                    Change Photo
                  </button>
                  <button className="text-on-surface-variant hover:text-error text-xs font-medium transition-colors">
                    Remove
                  </button>
                </div>
                <span className="text-xs text-on-surface-variant">JPG, PNG or WebP under 5MB. Recommended 400×400px.</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-on-surface font-semibold">Full Name</label>
                <input type="text" defaultValue="Dr. Elena Vance" className="h-10 px-3.5 rounded-lg bg-surface-container-low text-on-surface text-sm border border-outline-variant/30 focus:border-secondary focus:outline-none transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-on-surface font-semibold">Academic / Clinical Title</label>
                <input type="text" defaultValue="Principal Cognitive Researcher" className="h-10 px-3.5 rounded-lg bg-surface-container-low text-on-surface text-sm border border-outline-variant/30 focus:border-secondary focus:outline-none transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-on-surface font-semibold">Institutional Email</label>
                  <span className="font-mono text-xs text-secondary font-semibold flex items-center gap-1"><CheckCircle size={12} /> Verified</span>
                </div>
                <input type="email" defaultValue="e.vance@neurowrite-research.org" className="h-10 px-3.5 rounded-lg bg-surface-container-low text-on-surface text-sm border border-outline-variant/30 focus:border-secondary focus:outline-none transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-on-surface font-semibold">ORCID iD</label>
                  <a href="#" className="text-secondary hover:underline font-mono text-xs flex items-center gap-0.5 font-semibold">View Record</a>
                </div>
                <input type="text" defaultValue="0000-0002-1825-0097" className="h-10 px-3.5 rounded-lg bg-surface-container-low text-on-surface font-mono text-sm border border-outline-variant/30 focus:border-secondary focus:outline-none transition-colors" />
              </div>
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-sm text-on-surface font-semibold">Institution / Research Lab</label>
                <input type="text" defaultValue="NeuroDevelopmental Diagnostics Lab, Cambridge Institute" className="h-10 px-3.5 rounded-lg bg-surface-container-low text-on-surface text-sm border border-outline-variant/30 focus:border-secondary focus:outline-none transition-colors" />
              </div>
            </div>
          </section>
        )}

        {/* TAB 2: Security & Auth */}
        {activeTab === 'security' && (
          <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm flex flex-col gap-6 border border-outline-variant/30">
            <div className="flex flex-col gap-1 border-b border-outline-variant/20 pb-4">
              <h2 className="text-2xl text-on-surface font-semibold tracking-tight">Security & Authentication</h2>
              <p className="text-sm text-on-surface-variant">Safeguard access to screening pipelines, clinical cohort keys, and participant telemetry.</p>
            </div>

            {/* Password Update Card */}
            <div className="p-6 rounded-xl bg-surface-container-low flex flex-col gap-4 border border-outline-variant/20">
              <div className="flex items-center gap-2 text-on-surface text-lg font-semibold">
                <Lock size={20} className="text-secondary" />
                <span>Change Password</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-on-surface-variant font-medium">Current Password</label>
                  <input type="password" defaultValue="••••••••••••••••" className="w-full h-10 px-3.5 rounded-lg bg-surface-container-lowest text-on-surface text-sm border border-outline-variant/30 focus:outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-on-surface-variant font-medium">New Password</label>
                  <input type="password" defaultValue="Neuro-98#Cambridge" className="w-full h-10 px-3.5 rounded-lg bg-surface-container-lowest text-on-surface text-sm border border-outline-variant/30 focus:outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-on-surface-variant font-medium">Confirm New Password</label>
                  <input type="password" defaultValue="Neuro-98#Cambridge" className="w-full h-10 px-3.5 rounded-lg bg-surface-container-lowest text-on-surface text-sm border border-outline-variant/30 focus:outline-none" />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button>Update Password</Button>
              </div>
            </div>

            {/* 2FA */}
            <div className="p-6 rounded-xl bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-4 border border-outline-variant/20">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-surface-container-lowest shadow-sm text-secondary border border-outline-variant/20">
                  <SmartphoneDevice size={24} />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-on-surface">Two-Factor Authentication (2FA)</h3>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-mono text-xs font-semibold">
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

            {/* Session Sign-Out Box */}
            <div className="p-6 rounded-xl bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-4 border border-outline-variant/20">
              <div>
                <h3 className="text-base font-semibold text-on-surface">Active Clinical Session</h3>
                <p className="text-xs text-on-surface-variant mt-0.5">Signed in as <strong className="text-on-surface font-semibold">{user?.email || 'e.vance@neuro-research.org'}</strong> (Authenticated Session)</p>
              </div>
              <Button
                variant="secondary"
                icon={LogOut}
                onClick={handleLogout}
                className="text-error border-error/30 hover:bg-error-container/20 hover:border-error/40"
              >
                Sign Out of Workstation
              </Button>
            </div>
          </section>
        )}

        {/* TAB 3: System Preferences */}
        {activeTab === 'preferences' && (
          <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm flex flex-col gap-6 border border-outline-variant/30">
            <div className="flex flex-col gap-1 border-b border-outline-variant/20 pb-4">
              <h2 className="text-2xl text-on-surface font-semibold tracking-tight">System & Display Preferences</h2>
              <p className="text-sm text-on-surface-variant">Configure diagnostic rendering, threshold alerts, and workbench density.</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low border border-outline-variant/20">
                <div>
                  <h4 className="text-sm font-semibold text-on-surface">Grad-CAM Heatmap Overlay</h4>
                  <p className="text-xs text-on-surface-variant">Automatically render visual attention overlays on specimen inspection viewports.</p>
                </div>
                <input type="checkbox" defaultChecked className="h-5 w-5 accent-secondary cursor-pointer" />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low border border-outline-variant/20">
                <div>
                  <h4 className="text-sm font-semibold text-on-surface">High-Precision Telemetry Decimal Notation</h4>
                  <p className="text-xs text-on-surface-variant">Display probabilities and angles with 4 decimal places.</p>
                </div>
                <input type="checkbox" defaultChecked className="h-5 w-5 accent-secondary cursor-pointer" />
              </div>
            </div>
          </section>
        )}

        {/* TAB 4: Privacy & Governance */}
        {activeTab === 'governance' && (
          <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm flex flex-col gap-6 border border-outline-variant/30">
            <div className="flex flex-col gap-1 border-b border-outline-variant/20 pb-4">
              <h2 className="text-2xl text-on-surface font-semibold tracking-tight">Privacy & Data Governance</h2>
              <p className="text-sm text-on-surface-variant">Patient specimen anonymization, retention schedules, and HIPAA/FERPA settings.</p>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
              <h4 className="text-sm font-semibold text-on-surface">Specimen De-identification Status</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                All uploaded handwriting crops undergo client-side SHA-256 pseudonymization before transmission. Metadata containing names or dates of birth is permanently stripped.
              </p>
            </div>
          </section>
        )}

        {/* TAB 5: Danger Zone */}
        {activeTab === 'danger' && (
          <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm flex flex-col gap-6 border border-error/40">
            <div className="flex flex-col gap-1 border-b border-outline-variant/20 pb-4">
              <h2 className="text-2xl text-error font-semibold tracking-tight">Danger Zone</h2>
              <p className="text-sm text-on-surface-variant">Irreversible actions regarding cohort deletion and research workspace termination.</p>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-error-container/20 border border-error/30">
              <div>
                <h4 className="text-sm font-semibold text-error">Flush Local Specimen Cache</h4>
                <p className="text-xs text-on-surface-variant">Purges all offline cached specimens and temporary vector binarizations.</p>
              </div>
              <button className="px-3.5 py-1.5 rounded-lg bg-error text-on-error text-xs font-semibold shadow-sm hover:opacity-90 transition-opacity">
                Flush Cache
              </button>
            </div>
          </section>
        )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}