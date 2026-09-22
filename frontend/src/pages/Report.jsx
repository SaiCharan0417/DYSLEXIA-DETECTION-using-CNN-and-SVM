import React from 'react';
import { Card } from '../components/ui/Card';
import { mockPrediction } from '../utils/api';
import { Printer, Download, Brain, ShieldCheck, PageSearch, CheckCircle } from 'iconoir-react';
import { Button } from '../components/ui/Button';

export default function Report() {
  const data = mockPrediction;

  return (
    <div className="w-full bg-surface-container-low py-4 flex flex-col items-center min-h-[calc(100vh-8rem)]">

      <div className="w-full max-w-[960px] flex justify-end gap-3 mb-4">
        <Button variant="secondary" icon={Printer} onClick={() => window.print()}>Print</Button>
        <Button variant="accent" icon={Download}>Download PDF</Button>
      </div>

      <article className="relative w-full max-w-[960px] bg-surface-container-lowest shadow-md rounded-xl p-8 sm:p-12 lg:p-14 text-on-surface">
        <header className="relative pb-6 mb-8 border-b border-surface-container">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl font-bold tracking-tight">NeuroWrite AI</span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-xs font-mono uppercase">Research v2.4</span>
              </div>
              <p className="text-sm text-on-surface-variant">Clinical AI & Neurological Pattern Screening Systems</p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs uppercase tracking-widest text-secondary font-semibold">Laboratory Verification Dossier</span>
              <h1 className="text-xl font-bold tracking-tight mt-1">Handwriting Screening Report</h1>
              <p className="font-mono text-xs text-on-surface-variant mt-1">CNN-ResNet18 + SVM Linear-RBF</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-surface-container-low">
            <div className="flex flex-col">
              <span className="text-xs text-outline uppercase tracking-wider">Document ID</span>
              <span className="font-mono text-sm font-semibold mt-1">NW-2026-8841A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-outline uppercase tracking-wider">Subject ID</span>
              <span className="font-mono text-sm font-semibold mt-1">#PT-9042-C</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-outline uppercase tracking-wider">Date</span>
              <span className="text-sm font-semibold mt-1">Sep 21, 2026</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-outline uppercase tracking-wider">Clinician</span>
              <span className="text-sm font-semibold mt-1">Dr. E. Rostova</span>
            </div>
          </div>
        </header>

        <section className="mb-10">
          <div className="rounded-xl p-6 bg-surface-container relative overflow-hidden">
            <h2 className="text-lg font-bold mb-4">Executive Screening Synthesis</h2>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs uppercase tracking-wider text-outline font-semibold">Predicted Class:</span>
                  <span className="px-3 py-1 rounded bg-tertiary-container text-tertiary-fixed font-mono text-sm font-bold tracking-wide">
                    {data.category.toUpperCase()} TENDENCY
                  </span>
                </div>
                <p className="text-sm leading-relaxed">
                  Significant spatial inversion and horizontal reflection detected across bilateral lower-case ascenders and numerals. Pattern shows high correlation with phonological-orthographic orientation challenges rather than acute motor-praxis degradation.
                </p>
              </div>
              <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm min-w-[200px]">
                <span className="text-xs uppercase tracking-wider text-outline block mb-1">Confidence Score</span>
                <span className="text-3xl font-bold">{data.confidence}%</span>
                <div className="w-full bg-surface-container rounded-full h-1.5 mt-2">
                  <div className="bg-secondary h-1.5 rounded-full" style={{width: `${data.confidence}%`}}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="p-5 bg-error-container/40 rounded-xl flex items-start gap-4">
            <div>
              <h3 className="text-sm font-bold text-error uppercase tracking-wide mb-1">Research Pre-Screening Protocol — Non-Diagnostic Instrument</h3>
              <p className="text-xs text-on-surface leading-relaxed">
                This automated report contains AI-assisted screening metrics generated strictly for educational research, longitudinal cohort monitoring, and diagnostic support. <strong>It does not constitute a standalone medical diagnosis of developmental dyslexia, dysgraphia, or neurological impairment.</strong>
              </p>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}